// eslint-disable
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderContactEmail } from './renderContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const MIN_SECONDS_TO_SUBMIT = Number(process.env.CONTACT_MIN_SECONDS ?? 3);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const SHOW_CONTACT_DEBUG =
  process.env.NODE_ENV !== 'production' || process.env.CONTACT_DEBUG === 'true';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  bot_check?: unknown;
  sentAt?: unknown;
};

type Bucket = { count: number; resetAt: number };
const requestBuckets = new Map<string, Bucket>();
let hasLoggedMailHealth = false;

function getClientIp(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = req.headers.get('x-real-ip');
  return realIp?.trim() || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();

  for (const [key, value] of requestBuckets.entries()) {
    if (value.resetAt <= now) {
      requestBuckets.delete(key);
    }
  }

  const existing = requestBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    requestBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  requestBuckets.set(ip, existing);
  return existing.count > RATE_LIMIT_MAX;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hasTooManyLinks(message: string) {
  const links = message.match(/https?:\/\//gi) ?? [];
  return links.length > 2;
}

function extractEmailAddress(input: string) {
  const bracketMatch = input.match(/<([^>]+)>/);
  const value = bracketMatch?.[1] ?? input;
  return value.trim();
}

function getEmailDomain(input: string) {
  const email = extractEmailAddress(input);
  const atIndex = email.lastIndexOf('@');
  if (atIndex === -1) return null;
  return email.slice(atIndex + 1).toLowerCase();
}

function buildProviderDebug(error: unknown) {
  if (!SHOW_CONTACT_DEBUG || !error || typeof error !== 'object') {
    return undefined;
  }

  const candidate = error as { name?: unknown; message?: unknown; statusCode?: unknown; code?: unknown };
  return {
    name: typeof candidate.name === 'string' ? candidate.name : 'UnknownError',
    message: typeof candidate.message === 'string' ? candidate.message : 'No provider message',
    statusCode: typeof candidate.statusCode === 'number' ? candidate.statusCode : undefined,
    code: typeof candidate.code === 'string' ? candidate.code : undefined,
  };
}

function logMailHealthOnce() {
  if (hasLoggedMailHealth) {
    return;
  }

  hasLoggedMailHealth = true;

  const fromValue = process.env.FROM_EMAIL;
  const toValue = process.env.TO_EMAIL;
  const fromAddress = fromValue ? extractEmailAddress(fromValue) : null;
  const fromDomain = fromValue ? getEmailDomain(fromValue) : null;
  const toDomain = toValue ? getEmailDomain(toValue) : null;

  console.info('[contact:config] mail health', {
    hasApiKey: Boolean(process.env.RESEND_API_KEY),
    fromConfigured: Boolean(fromValue),
    fromAddress,
    fromDomain,
    toConfigured: Boolean(toValue),
    toDomain,
    debug: SHOW_CONTACT_DEBUG,
  });
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  try {
    logMailHealthOnce();

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      console.warn(`[contact:${requestId}] rate limited`, { ip });
      return NextResponse.json({ error: 'Too many requests. Please try again later.', requestId }, { status: 429 });
    }

    const body = (await req.json()) as ContactPayload;

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const bot_check = typeof body.bot_check === 'string' ? body.bot_check.trim() : '';
    const sentAt = Number(body.sentAt);

    if (bot_check) {
      console.warn(`[contact:${requestId}] rejected: honeypot filled`, { ip, bot_check });
      return NextResponse.json({ success: true, ignored: true, requestId });
    }

    const submittedTooFast = Number.isFinite(sentAt)
      ? Date.now() - sentAt < MIN_SECONDS_TO_SUBMIT * 1000
      : true;

    if (submittedTooFast) {
      console.warn(`[contact:${requestId}] rejected: submitted too fast`, { ip, sentAt });
      return NextResponse.json({ error: 'Submission rejected.', requestId }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields', requestId }, { status: 400 });
    }

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json({ error: 'Invalid name length.', requestId }, { status: 400 });
    }

    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json({ error: 'Invalid email address.', requestId }, { status: 400 });
    }

    if (message.length < 10 || message.length > 2000 || hasTooManyLinks(message)) {
      return NextResponse.json({ error: 'Invalid message content.', requestId }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.TO_EMAIL) {
      console.error(`[contact:${requestId}] missing resend configuration`);
      return NextResponse.json({ error: 'Mail service is not configured.', requestId }, { status: 500 });
    }

    const fromDomain = getEmailDomain(process.env.FROM_EMAIL);
    if (!fromDomain) {
      return NextResponse.json(
        {
          error: 'Mail service sender is invalid.',
          requestId,
          hint: SHOW_CONTACT_DEBUG ? 'FROM_EMAIL must be a valid email or "Name <email@domain.com>".' : undefined,
        },
        { status: 500 },
      );
    }

    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL!,
    //   to: process.env.TO_EMAIL!,
    //   subject: `New Contact Form Message from ${name}`,
    //   replyTo: email,
    //   text: `You received a new message:\n\n${message}\n\nFrom: ${name} <${email}>`,
    // });

    const emailComponent = renderContactEmail(name, email, message);
    const html = await render(emailComponent);
    const text = await render(emailComponent, { plainText: true });

    const resendResult = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      html,
      text,
    });

    if (resendResult.error) {
      console.error(`[contact:${requestId}] resend rejected message`, {
        fromDomain,
        resendError: resendResult.error,
      });

      const providerError = buildProviderDebug(resendResult.error);
      const hint =
        SHOW_CONTACT_DEBUG && providerError?.message?.toLowerCase().includes('resolve')
          ? 'Verify your sender domain in Resend and try the control test.'
          : undefined;

      return NextResponse.json({ error: 'Email provider rejected the message.', requestId, providerError, hint }, { status: 502 });
    }

    console.info(`[contact:${requestId}] message sent`, { resendId: resendResult.data?.id });

    return NextResponse.json({ success: true, requestId, resendId: resendResult.data?.id });
  } catch (error) {
    console.error(`[contact:${requestId}] unexpected error`, error);

    const unexpectedError =
      SHOW_CONTACT_DEBUG && error instanceof Error
        ? { name: error.name, message: error.message }
        : undefined;

    return NextResponse.json({ error: 'Failed to send email', requestId, unexpectedError }, { status: 500 });
  }
}
