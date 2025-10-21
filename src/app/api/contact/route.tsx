import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // await resend.emails.send({
    //   from: process.env.FROM_EMAIL!,
    //   to: process.env.TO_EMAIL!,
    //   subject: `New Contact Form Message from ${name}`,
    //   replyTo: email,
    //   text: `You received a new message:\n\n${message}\n\nFrom: ${name} <${email}>`,
    // });

    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,
      react: <ContactEmail name={name} email={email} message={message} />,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
