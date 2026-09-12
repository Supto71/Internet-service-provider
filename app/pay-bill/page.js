'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function PayBillPage() {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');

  const handlePay = (e) => {
    e.preventDefault();
    if (!method) {
      alert('Please select a payment method');
      return;
    }
    // Simulate payment gateway redirect
    alert(`Redirecting to ${method} gateway to pay ৳${amount} for ${phone}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/pay-bill' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>QUICK PAY</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '-.065em', margin: '0 0 16px', lineHeight: 1.1 }}>
            Pay your bill easily.
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 15, lineHeight: 1.6 }}>
            Use our secure payment gateway to clear your dues instantly via bKash, Nagad, or Rocket.
          </p>
        </div>

        <form onSubmit={handlePay} style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 16, padding: 40, display: 'grid', gap: 24 }}>
          
          <label style={{ fontSize: 12, fontWeight: 700, color: '#d9e6f3', display: 'grid', gap: 8 }}>
            Registered Phone Number
            <input 
              required type="tel" 
              placeholder="01712345678" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              style={{ border: 0, borderBottom: '1px solid #7893ae61', background: 'transparent', padding: '12px 0', color: '#f8fafc', outline: 0, width: '100%' }}
            />
          </label>

          <label style={{ fontSize: 12, fontWeight: 700, color: '#d9e6f3', display: 'grid', gap: 8 }}>
            Amount (৳)
            <input 
              required type="number" 
              placeholder="e.g. 500" 
              value={amount} 
              onChange={e => setAmount(e.target.value)}
              style={{ border: 0, borderBottom: '1px solid #7893ae61', background: 'transparent', padding: '12px 0', color: '#f8fafc', outline: 0, width: '100%' }}
            />
          </label>

          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#d9e6f3', margin: '0 0 12px' }}>Payment Method</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {['bKash', 'Nagad', 'Rocket'].map((m) => (
                <button 
                  key={m} 
                  type="button"
                  onClick={() => setMethod(m)}
                  style={{ 
                    padding: '16px 8px', 
                    border: method === m ? '1px solid #6de5ff' : '1px solid rgba(186,221,255,.12)', 
                    background: method === m ? 'rgba(109,229,255,.1)' : 'rgba(255,255,255,.02)', 
                    color: '#f8fafc', 
                    borderRadius: 8, 
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'all .2s'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              border: 0, borderRadius: 9, padding: '16px', 
              background: 'linear-gradient(120deg,#168df4,#1bd9ef)', 
              color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer',
              marginTop: 16
            }}
          >
            Proceed to Payment →
          </button>
        </form>

      </main>

      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
