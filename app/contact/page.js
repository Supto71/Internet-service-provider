'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setStatus(data.message || 'Error submitting form.');
      }
    } catch (err) {
      setStatus('Error submitting form.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/contact' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>GET IN TOUCH</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-.065em', margin: '0 0 20px', lineHeight: 1.1 }}>
            We&apos;re here <em style={{ fontStyle: 'normal', color: '#80e7ff' }}>to help.</em>
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Have a question, feedback, or need support? Reach out to us using the form below or through our support channels.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Send a Message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
              <input 
                required placeholder="Your Name" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(186,221,255,.12)', borderRadius: 8, padding: '14px 16px', color: '#fff', outline: 'none' }}
              />
              <input 
                required type="tel" placeholder="Phone Number" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(186,221,255,.12)', borderRadius: 8, padding: '14px 16px', color: '#fff', outline: 'none' }}
              />
              <input 
                type="email" placeholder="Email Address (Optional)" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(186,221,255,.12)', borderRadius: 8, padding: '14px 16px', color: '#fff', outline: 'none' }}
              />
              <textarea 
                required placeholder="Your Message" rows={5}
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(186,221,255,.12)', borderRadius: 8, padding: '14px 16px', color: '#fff', outline: 'none', resize: 'vertical' }}
              />
              <button type="submit" style={{ border: 0, borderRadius: 9, padding: '16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
                Send Message →</button>
              {status && <p style={{ fontSize: 14, color: '#6effc6', marginTop: 8 }}>{status}</p>}
            </form>
          </div>

          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Contact Info</h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <div style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>📧</div>
                <h3 style={{ fontSize: 14, color: '#9fb0c8', marginBottom: 4 }}>Call Us (24/7)</h3>
                <p style={{ fontSize: 18, fontWeight: 700 }}>01712345678</p>
              </div>
              <div style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>📧</div>
                <h3 style={{ fontSize: 14, color: '#9fb0c8', marginBottom: 4 }}>Email Us</h3>
                <p style={{ fontSize: 18, fontWeight: 700 }}>support@sheikhonline.com</p>
              </div>
              <div style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>📧</div>
                <h3 style={{ fontSize: 14, color: '#9fb0c8', marginBottom: 4 }}>Office Address</h3>
                <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6 }}>123 Internet Street<br />Tech Park, Dhaka 1200</p>
              </div>
            </div>
          </div>
          
        </div>
      </main>

      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
