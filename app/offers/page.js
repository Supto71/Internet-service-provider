'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function OffersPage() {
  const offers = [
    {
      title: 'New Connection Discount',
      description: 'Get 50% off on your first month when you sign up for any of our Home Broadband plans. No installation charge.',
      code: 'NEW50',
      validUntil: 'Valid until Oct 31, 2026',
      bg: 'linear-gradient(145deg, #168df4, #0d3560)'
    },
    {
      title: 'Refer a Friend',
      description: 'Refer a friend to Sheikh Online Service and both of you get 1 month of free internet upon successful activation.',
      code: 'REFERFREE',
      validUntil: 'Ongoing',
      bg: 'linear-gradient(145deg, #7c3aed, #4c1d95)'
    },
    {
      title: 'Corporate Bundle Upgrade',
      description: 'Upgrade your SME Starter to SME Pro and get the first 3 months at the Starter price.',
      code: 'PROUPGRADE',
      validUntil: 'Valid until Dec 31, 2026',
      bg: 'linear-gradient(145deg, #059669, #064e3b)'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/offers' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>EXCLUSIVE DEALS</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-.065em', margin: '0 0 20px', lineHeight: 1.1 }}>
            Special <em style={{ fontStyle: 'normal', color: '#80e7ff' }}>Offers.</em>
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Take advantage of our current promotions and get the most out of your internet connection for less.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30 }}>
          {offers.map((offer) => (
            <div key={offer.title} style={{ background: offer.bg, borderRadius: 16, padding: 32, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1, fontSize: 120 }}>🏷️</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#fff', position: 'relative', zIndex: 1 }}>{offer.title}</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                {offer.description}
              </p>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Promo Code:</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '1px' }}>{offer.code}</span>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', position: 'relative', zIndex: 1 }}>{offer.validUntil}</p>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
