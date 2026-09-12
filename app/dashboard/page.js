'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    const result = await signIn('credentials', {
      redirect: false,
      phone: loginForm.phone,
      password: loginForm.password,
    });
    setLoading(false);
    if (result?.error) setLoginError('Phone number or password is incorrect.');
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6de5ff', fontFamily: 'Manrope, sans-serif' }}>
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif' }}>
        <div style={{ width: 400, background: '#071427', border: '1px solid rgba(186,221,255,.18)', borderRadius: 16, padding: 48 }}>
          <Link href="/" style={{ display: 'block', marginBottom: 32 }}>
            <Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} />
          </Link>
          <p style={{ fontSize: 10, letterSpacing: '.18em', color: '#6de5ff', margin: '0 0 8px', fontWeight: 800 }}>SELF CARE</p>
          <h1 style={{ fontSize: 32, color: '#f8fafc', margin: '0 0 8px', letterSpacing: '-.06em' }}>Welcome back.</h1>
          <p style={{ fontSize: 13, color: '#9fb0c8', margin: '0 0 32px', lineHeight: 1.7 }}>Log in with your phone number and password to manage your connection.</p>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 18 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#d9e6f3', display: 'grid', gap: 8 }}>
              Phone number
              <input
                required type="tel" placeholder="01712345678"
                value={loginForm.phone}
                onChange={e => setLoginForm(p => ({...p, phone: e.target.value}))}
                style={{ border: 0, borderBottom: '1px solid #7893ae61', background: 'transparent', padding: '11px 0', color: '#f8fafc', outline: 0, borderRadius: 0, width: '100%' }}
              />
            </label>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#d9e6f3', display: 'grid', gap: 8 }}>
              Password
              <input
                required type="password" placeholder="••••••••"
                value={loginForm.password}
                onChange={e => setLoginForm(p => ({...p, password: e.target.value}))}
                style={{ border: 0, borderBottom: '1px solid #7893ae61', background: 'transparent', padding: '11px 0', color: '#f8fafc', outline: 0, borderRadius: 0, width: '100%' }}
              />
            </label>
            {loginError && <p style={{ color: '#ff8a8a', fontSize: 11, margin: 0 }}>{loginError}</p>}
            <button
              type="submit" disabled={loading}
              style={{ border: 0, borderRadius: 9, padding: '13px 18px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer', marginTop: 8 }}
            >
              {loading ? 'Logging in…' : 'Log in →'}
            </button>
          </form>
          <p style={{ fontSize: 11, color: '#9fb0c8', marginTop: 24, textAlign: 'center' }}>
            Don&apos;t have an account? <Link href="/#contact" style={{ color: '#6de5ff' }}>Contact us</Link>
          </p>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope, sans-serif', color: '#f8fafc' }}>
      {/* Top bar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(7,20,39,.85)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.12)', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={99} height={40} /></Link>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#9fb0c8' }}>Hello, <b style={{ color: '#f8fafc' }}>{user.name}</b></span>
        <button onClick={() => signOut({ callbackUrl: '/' })} style={{ border: '1px solid rgba(186,221,255,.18)', background: 'transparent', color: '#9fb0c8', padding: '8px 16px', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>
          Sign out
        </button>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        {/* Plan card */}
        <div style={{ background: 'linear-gradient(130deg,#123f70,#091b32)', borderRadius: 16, padding: 48, marginBottom: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '0 0 16px' }}>YOUR ACTIVE PLAN</p>
            <h2 style={{ fontSize: 56, letterSpacing: '-.07em', margin: '0 0 4px' }}>
              {user.planSpeed || '—'} <span style={{ fontSize: 18, color: '#6de5ff', letterSpacing: 0 }}>Mbps</span>
            </h2>
            <p style={{ fontSize: 13, color: '#9fb0c8', margin: '0 0 24px' }}>{user.plan || 'No active plan'} — ৳{user.planPrice?.toLocaleString() || '—'}/month</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Active', '99.9% uptime', '24/7 support'].map(t => (
                <span key={t} style={{ fontSize: 10, border: '1px solid rgba(186,221,255,.25)', borderRadius: 20, padding: '5px 12px', color: '#9fb0c8' }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: '#07172bce', border: '1px solid #75ccff45', padding: 24, borderRadius: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, letterSpacing: '.12em', color: '#9fb0c8', marginBottom: 32 }}>
                <span>MY CONNECTION</span>
                <i style={{ display: 'block', width: 8, height: 8, borderRadius: '50%', background: '#6effc6', boxShadow: '0 0 8px #6effc6' }} />
              </div>
              <div style={{ display: 'flex', gap: 5, alignItems: 'end', height: 52 }}>
                {[40,70,52,90,75,60,85].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: 'linear-gradient(#69e8ff,#0876de)', height: `${h}%`, borderRadius: 2 }} />
                ))}
              </div>
              <p style={{ fontSize: 10, color: '#9fb0c8', marginTop: 12 }}>Connection quality — last 7 days</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid rgba(186,221,255,.12)', marginBottom: 32 }}>
          {['overview','invoices','support'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ border: 0, background: 'none', padding: '12px 24px', color: activeTab === tab ? '#f8fafc' : '#9fb0c8', fontWeight: 700, fontSize: 12, cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid #6de5ff' : '2px solid transparent', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              { label: 'Plan', value: user.plan || '-' },
              { label: 'Speed', value: user.planSpeed ? `${user.planSpeed} Mbps` : '-' },
              { label: 'Monthly bill', value: user.planPrice ? `৳${user.planPrice.toLocaleString()}` : '-' },
              { label: 'Account phone', value: user.phone },
              { label: 'Email', value: user.email || 'Not set' },
              { label: 'Account status', value: 'Active' },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: 24, border: '1px solid rgba(186,221,255,.12)', borderRadius: 12 }}>
                <p style={{ fontSize: 10, color: '#9fb0c8', letterSpacing: '.12em', margin: '0 0 10px', fontWeight: 700 }}>{label.toUpperCase()}</p>
                <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'invoices' && (
          <div style={{ border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', background: 'rgba(186,221,255,.04)', fontSize: 11, color: '#9fb0c8', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span>MONTH</span><span>PLAN</span><span>AMOUNT</span><span>STATUS</span>
            </div>
                        {['September 2026','August 2026','July 2026'].map((m, i) => (
              <div key={m} style={{ padding: '16px 24px', borderTop: '1px solid rgba(186,221,255,.08)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', fontSize: 13 }}>
                <span>{m}</span>
                <span>{user.plan || '-'}</span>
                <span>৳{user.planPrice?.toLocaleString() || '-'}</span>
                <span style={{ color: i === 0 ? '#ffb86b' : '#6effc6' }}>{i === 0 ? 'Pending' : 'Paid'}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'support' && (
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, color: '#9fb0c8', lineHeight: 1.8, marginBottom: 32 }}>Need help with your connection? Contact our support team.</p>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { icon: '📞', label: 'Call support', desc: 'Available 24/7' },
                { icon: '💬', label: 'WhatsApp', desc: 'Quick response' },
                { icon: '📧', label: 'Email support', desc: 'hello@sheikhonline.example' },
              ].map(({ icon, label, desc }) => (
                <div key={label} style={{ padding: 20, border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>
                  <div><p style={{ margin: 0, fontWeight: 700 }}>{label}</p><p style={{ margin: 0, fontSize: 12, color: '#9fb0c8' }}>{desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
