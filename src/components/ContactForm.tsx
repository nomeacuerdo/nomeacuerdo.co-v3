"use client"
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.valueOf,
      email: form.email.value,
      message: form.message.value,
    };

    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus('✅ Message sent successfully!');
      form.reset();
    } else {
      setStatus('❌ There was a problem sending your message.');
    }
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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