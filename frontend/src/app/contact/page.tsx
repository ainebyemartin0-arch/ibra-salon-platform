"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("https://ibra-salon-platform.onrender.com/api/salon/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName(""); setEmail(""); setMessage("");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <section className="bg-black text-white py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">GET IN TOUCH</h1>
          <p className="text-lg text-gray-400">Have a question? We&apos;d love to hear from you.</p>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-8 tracking-tight">Visit Our Salon</h2>
            <p className="text-gray-600 mb-4">Kampala Road, Plot 123<br />Kampala, Uganda</p>
            
            <h3 className="text-lg font-semibold text-black mt-8 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">+256 757 649 159</p>
            
            <h3 className="text-lg font-semibold text-black mt-8 mb-2">Opening Hours</h3>
            <p className="text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p>
            <p className="text-gray-600">Sat - Sun: 9:00 AM - 6:00 PM</p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 tracking-tight">Message Sent!</h2>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="text-black font-bold hover:text-gray-700 text-sm uppercase tracking-wider">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-black mb-8 tracking-tight">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Message</label>
                    <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent transition-all" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 font-bold text-sm tracking-wider uppercase disabled:bg-gray-400 transition-colors mt-2">
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
