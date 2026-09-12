'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CoveragePage() {
  const areas = [
    { zone: 'North Dhaka', locations: ['Uttara', 'Mirpur', 'Pallabi', 'Cantonment'] },
    { zone: 'Central Dhaka', locations: ['Gulshan', 'Banani', 'Mohakhali', 'Tejgaon'] },
    { zone: 'South Dhaka', locations: ['Dhanmondi', 'Lalmatia', 'Mohammadpur', 'Azimpur'] },
    { zone: 'East Dhaka', locations: ['Badda', 'Rampura', 'Khilgaon', 'Basabo'] },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/coverage' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>NETWORK REACH</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-.065em', margin: '0 0 20px', lineHeight: 1.1 }}>
            Check our <em style={{ fontStyle: 'normal', color: '#80e7ff' }}>coverage area.</em>
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 16, lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            We are continuously expanding our optical fiber network. See if we are currently available in your neighborhood.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20, marginBottom: 60 }}>
          {areas.map((area) => (
            <div key={area.zone} style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: '#6de5ff' }}>{area.zone}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                {area.locations.map(loc => (
                  <li key={loc} style={{ fontSize: 14, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6effc6' }}></span>
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(145deg,#0d3560,#071528)', borderRadius: 16, padding: 40, textAlign: 'center', border: '1px solid rgba(186,221,255,.2)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Don&apos;t see your area?</h2>
          <p style={{ fontSize: 14, color: '#9fb0c8', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Drop us a message. We prioritize our expansion based on user requests. Let us know where we should go next!
          </p>
          <Link href="/contact" style={{ display: 'inline-block', border: 0, borderRadius: 9, padding: '12px 24px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 12, fontWeight: 800 }}>
            Request Coverage
          </Link>
        </div>
      </main>

      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
