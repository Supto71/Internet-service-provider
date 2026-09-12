'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      {/* Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/about' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>OUR STORY</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,56px)', letterSpacing: '-.065em', margin: '0 0 20px', lineHeight: 1.1 }}>
            Empowering the community <br /><em style={{ fontStyle: 'normal', color: '#80e7ff' }}>through connectivity.</em>
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 16, lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
            Since our inception, Sheikh Online Service has been dedicated to providing high-speed, reliable, and affordable internet to homes and businesses across the region. We believe that access to the digital world is a fundamental right.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 80 }}>
          <div style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 16, padding: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#f8fafc' }}>Our Mission</h2>
            <p style={{ fontSize: 14, color: '#9fb0c8', lineHeight: 1.8 }}>To bridge the digital divide by offering state-of-the-art broadband connectivity and unparalleled customer service. We continuously upgrade our infrastructure to ensure you get the bandwidth you need for work, play, and everything in between.</p>
          </div>
          <div style={{ background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 16, padding: 40 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16, color: '#f8fafc' }}>Our Vision</h2>
            <p style={{ fontSize: 14, color: '#9fb0c8', lineHeight: 1.8 }}>To be the most trusted and innovative Internet Service Provider in the country, fostering a highly connected society where technology enhances everyday life seamlessly and securely.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 40 }}>By The Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { label: 'Active Users', value: '10K+' },
              { label: 'Coverage Areas', value: '50+' },
              { label: 'Uptime', value: '99.9%' },
              { label: 'Support', value: '24/7' }
            ].map(stat => (
              <div key={stat.label} style={{ background: 'linear-gradient(145deg,#0d3560,#071528)', borderRadius: 12, padding: 32, border: '1px solid rgba(186,221,255,.1)' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#6de5ff', marginBottom: 8 }}>{stat.value}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9fb0c8', textTransform: 'uppercase', letterSpacing: '.1em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
