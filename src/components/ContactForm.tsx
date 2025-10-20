"use client"
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Message sent! (mock)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">Contact Me (soon)</h2>
      <form onSubmit={handleSubmit} className="space-y-4 opacity-10">
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
      </form>
    </>
  );
}