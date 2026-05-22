"use client"
import { useState } from "react";

const SHOW_CONTACT_DEBUG =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_CONTACT_DEBUG === 'true';

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", bot_check: "" });
  const [sentAt] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      bot_check: formData.get('bot_check') as string,
      sentAt: Number(formData.get('sentAt')),
    };

    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => null);

    if (res.ok && result?.success === true) {
      setStatus('✅ Message sent successfully! 😎');
      setForm({ name: '', email: '', message: '', bot_check: '' });
      form.reset();
    } else {
      const error = typeof result?.error === 'string' ? result.error : 'There was a problem sending your message.';
      const providerReason = typeof result?.providerError?.message === 'string' ? ` (${result.providerError.message})` : '';
      const hint = typeof result?.hint === 'string' ? ` ${result.hint}` : '';
      const debugInfo = SHOW_CONTACT_DEBUG && typeof result?.requestId === 'string' ? ` [id: ${result.requestId}]` : '';
      const fullMessage = `${error}${providerReason}${hint}${debugInfo}`;
      
      if (result?.ignored) {
        setStatus('🛑 Submission blocked. 😒');
      } else {
        setStatus(`🛑 ${fullMessage} 🫤`);
      }
    }
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="sentAt" value={String(sentAt)} />
        {/* Honeypot field - visually hidden, excluded from screen readers and keyboard navigation */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          <label htmlFor="bot_check">Leave this field blank</label>
          <input
            id="bot_check"
            type="text"
            name="bot_check"
            value={form.bot_check}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
          required
        />
        <button type="submit" className="bg-orange-600 hover:bg-orange-500 hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] w-full py-2 rounded-md transition">
          Send Message
        </button>
        {status && <p className="text-center mt-2 text-sm">{status}</p>}
      </form>
    </>
  );
}