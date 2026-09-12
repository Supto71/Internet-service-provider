'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PricingPage() {
  const plans = {
    home: [
      { name: 'Essential', speed: 30,  price: 500,  color: '#64748b', features: ['Fiber-ready connection', 'Ideal for everyday browsing', 'Local CDN access', 'Support when you need it'] },
      { name: 'Connected', speed: 50,  price: 700,  color: '#2563eb', features: ['Smooth 4K streaming', 'Multi-device coverage', 'HD Facebook & YouTube', 'Priority support'], popular: true },
      { name: 'Momentum',  speed: 75,  price: 900,  color: '#0891b2', features: ['Active digital household', 'Bufferless YouTube', 'Enhanced Wi-Fi options', 'Responsive local support'] },
      { name: 'Limitless', speed: 100, price: 1100, color: '#7c3aed', features: ['Demanding use ready', 'Multiple high-bandwidth devices', 'Low latency gaming', 'Premium service pathway'] },
      { name: 'Ultra',     speed: 150, price: 1500, color: '#dc2626', features: ['Power user plan', 'IPv6 ready', 'BDIX direct connection', 'Dedicated support manager'] },
      { name: 'Giga',      speed: 200, price: 2000, color: '#059669', features: ['Maximum home speed', 'All premium features', 'Public IP available', 'VIP 24/7 support'] },
    ],
    business: [
      { name: 'SME Starter', speed: 50,  price: 2500, color: '#2563eb', features: ['Dedicated connection', 'SLA guaranteed', '24/7 support manager', 'Multiple upstream'] },
      { name: 'SME Pro',     speed: 100, price: 4000, color: '#7c3aed', features: ['High-speed dedicated', 'IPv6 ready', 'Public IP included', 'Network monitoring'], popular: true },
      { name: 'Enterprise',  speed: 300, price: 8000, color: '#dc2626', features: ['Enterprise grade', 'Multiple backup links', '99.9% uptime SLA', 'On-site support'] },
    ],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>

      {/* Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(2,6,23,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.1)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
        <nav style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/coverage', 'Coverage'], ['/offers', 'Offers'], ['/contact', 'Contact']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: href === '/pricing' ? '#6de5ff' : '#9fb0c8', textTransform: 'uppercase' }}>{label}</Link>
          ))}
        </nav>
        <Link href="/dashboard" style={{ border: 0, borderRadius: 9, padding: '10px 16px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 11, fontWeight: 800 }}>Self Care →</Link>
      </header>

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>FIND YOUR PACE</p>
          <h1 style={{ fontSize: 'clamp(40px,5vw,72px)', letterSpacing: '-.065em', margin: '0 0 20px', lineHeight: 1.05 }}>
            Plans without<br /><em style={{ fontStyle: 'normal', color: '#80e7ff' }}>compromise.</em>
          </h1>
          <p style={{ color: '#9fb0c8', fontSize: 15, lineHeight: 1.8 }}>
            Starting from ৳500/month. No hidden fees. Cancel anytime.
          </p>
          <a href="/files/tariff.pdf" target="_blank" style={{ display: 'inline-block', marginTop: 16, border: '1px solid rgba(186,221,255,.2)', borderRadius: 8, padding: '8px 20px', fontSize: 11, color: '#9fb0c8', fontWeight: 700 }}>
            📋 BTRC Approved Tariff
          </a>
        </div>

        {/* Home Plans */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 32, color: '#f8fafc' }}>
            🏠 Home Broadband Plans
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
            {plans.home.map((plan) => (
              <div key={plan.name} style={{ position: 'relative', border: `1px solid ${plan.popular ? '#6de5ff' : 'rgba(186,221,255,.12)'}`, borderRadius: 16, padding: 28, background: plan.popular ? 'linear-gradient(145deg,#0d3560,#071528)' : '#071427', transition: 'transform .3s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#6de5ff', color: '#020617', fontSize: 9, fontWeight: 800, padding: '4px 14px', borderRadius: 20, letterSpacing: '.1em' }}>MOST POPULAR</div>
                )}
                <div style={{ display: 'inline-block', background: plan.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 6, marginBottom: 20, letterSpacing: '.08em' }}>{plan.name.toUpperCase()}</div>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-.06em' }}>{plan.speed}</span>
                  <span style={{ fontSize: 14, color: '#9fb0c8', marginLeft: 4 }}>Mbps</span>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 28, fontWeight: 700 }}>৳{plan.price.toLocaleString()}</span>
                  <span style={{ fontSize: 12, color: '#9fb0c8' }}>/month</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 8 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontSize: 12, color: '#9fb0c8', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ color: '#6effc6', fontSize: 14 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/" style={{ display: 'block', textAlign: 'center', border: 0, borderRadius: 9, padding: '12px', background: plan.popular ? 'linear-gradient(120deg,#168df4,#1bd9ef)' : 'rgba(186,221,255,.08)', color: '#fff', fontSize: 12, fontWeight: 800 }}>
                  Get Connected →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Business Plans */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 32 }}>
            🏢 Corporate / SME Plans
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
            {plans.business.map((plan) => (
              <div key={plan.name} style={{ position: 'relative', border: `1px solid ${plan.popular ? '#6de5ff' : 'rgba(186,221,255,.12)'}`, borderRadius: 16, padding: 28, background: plan.popular ? 'linear-gradient(145deg,#0d3560,#071528)' : '#071427', transition: 'transform .3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {plan.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#6de5ff', color: '#020617', fontSize: 9, fontWeight: 800, padding: '4px 14px', borderRadius: 20, letterSpacing: '.1em' }}>RECOMMENDED</div>}
                <div style={{ display: 'inline-block', background: plan.color, color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 6, marginBottom: 20 }}>{plan.name.toUpperCase()}</div>
                <div><span style={{ fontSize: 52, fontWeight: 700, letterSpacing: '-.06em' }}>{plan.speed}</span><span style={{ fontSize: 14, color: '#9fb0c8', marginLeft: 4 }}>Mbps</span></div>
                <div style={{ marginBottom: 24 }}><span style={{ fontSize: 28, fontWeight: 700 }}>৳{plan.price.toLocaleString()}</span><span style={{ fontSize: 12, color: '#9fb0c8' }}>/month</span></div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'grid', gap: 8 }}>
                  {plan.features.map(f => <li key={f} style={{ fontSize: 12, color: '#9fb0c8', display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ color: '#6effc6' }}>✓</span>{f}</li>)}
                </ul>
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', border: 0, borderRadius: 9, padding: '12px', background: plan.popular ? 'linear-gradient(120deg,#168df4,#1bd9ef)' : 'rgba(186,221,255,.08)', color: '#fff', fontSize: 12, fontWeight: 800 }}>
                  Contact Sales →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: 80, padding: '32px 32px', borderTop: '1px solid rgba(186,221,255,.1)', textAlign: 'center', color: '#9fb0c8', fontSize: 12 }}>
        <p>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
      </footer>
    </div>
  );
}
