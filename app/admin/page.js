'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Simple admin panel protected by a secret key entered in browser
export default function AdminPage() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', { headers: { 'x-admin-token': token } });
      if (!res.ok) { setError('Invalid admin token.'); setLoading(false); return; }
      const data = await res.json();
      setOrders(data.orders || []);
      setAuthenticated(true);
    } catch {
      setError('Connection error.');
    }
    setLoading(false);
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/contact?admin=1', { headers: { 'x-admin-token': token } });
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch {}
  };

  useEffect(() => {
    if (authenticated && activeTab === 'contacts' && contacts.length === 0) fetchContacts();
  }, [authenticated, activeTab]);

  const STATUS_COLORS = { pending: '#ffb86b', reviewing: '#6de5ff', active: '#6effc6', cancelled: '#ff8a8a' };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope,sans-serif' }}>
        <div style={{ width: 400, background: '#071427', border: '1px solid rgba(186,221,255,.18)', borderRadius: 16, padding: 48 }}>
          <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={110} height={44} /></Link>
          <p style={{ fontSize: 10, color: '#6de5ff', letterSpacing: '.18em', fontWeight: 800, margin: '32px 0 8px' }}>ADMIN PANEL</p>
          <h1 style={{ fontSize: 28, color: '#f8fafc', margin: '0 0 24px', letterSpacing: '-.05em' }}>Admin Access</h1>
          <form onSubmit={login} style={{ display: 'grid', gap: 18 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#d9e6f3', display: 'grid', gap: 8 }}>
              Admin Token
              <input required type="password" placeholder="Enter secret token" value={token} onChange={e => setToken(e.target.value)}
                style={{ border: 0, borderBottom: '1px solid #7893ae61', background: 'transparent', padding: '11px 0', color: '#f8fafc', outline: 0, borderRadius: 0 }} />
            </label>
            {error && <p style={{ color: '#ff8a8a', fontSize: 11, margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ border: 0, borderRadius: 9, padding: '13px 18px', background: 'linear-gradient(120deg,#168df4,#1bd9ef)', color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
              {loading ? 'Verifying…' : 'Access Panel →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: 'Manrope,sans-serif', color: '#f8fafc' }}>
      <header style={{ background: 'rgba(7,20,39,.9)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(186,221,255,.12)', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link href="/"><Image src="/logo.png" alt="Sheikh Online Service" width={90} height={36} /></Link>
        <span style={{ fontSize: 10, color: '#6de5ff', fontWeight: 800, letterSpacing: '.15em' }}>ADMIN PANEL</span>
        <span style={{ flex: 1 }} />
        <button onClick={() => setAuthenticated(false)} style={{ border: '1px solid rgba(186,221,255,.18)', background: 'transparent', color: '#9fb0c8', padding: '8px 16px', borderRadius: 8, fontSize: 11, cursor: 'pointer' }}>
          Sign out
        </button>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'Pending Review', value: orders.filter(o => o.status === 'pending').length },
            { label: 'Active Connections', value: orders.filter(o => o.status === 'active').length },
          ].map(({ label, value }) => (
            <div key={label} style={{ padding: 28, background: '#071427', border: '1px solid rgba(186,221,255,.12)', borderRadius: 12 }}>
              <p style={{ fontSize: 10, color: '#9fb0c8', letterSpacing: '.12em', fontWeight: 800, margin: '0 0 8px' }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: 40, fontWeight: 700, margin: 0, letterSpacing: '-.06em' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid rgba(186,221,255,.12)', marginBottom: 24 }}>
          {['orders','contacts'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ border: 0, background: 'none', padding: '12px 24px', color: activeTab === tab ? '#f8fafc' : '#9fb0c8', fontWeight: 700, fontSize: 12, cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid #6de5ff' : '2px solid transparent', textTransform: 'capitalize' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Orders table */}
        {activeTab === 'orders' && (
          <div style={{ border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', background: 'rgba(186,221,255,.04)', fontSize: 10, color: '#9fb0c8', letterSpacing: '.1em', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr' }}>
              <span>CUSTOMER</span><span>PLAN</span><span>PHONE</span><span>ADDRESS</span><span>DATE</span><span>STATUS</span>
            </div>
            {orders.length === 0 && <p style={{ padding: 24, color: '#9fb0c8', fontSize: 13 }}>No orders yet.</p>}
            {orders.map((o) => (
              <div key={o._id} style={{ padding: '14px 20px', borderTop: '1px solid rgba(186,221,255,.08)', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr', fontSize: 12, alignItems: 'center' }}>
                <span><b style={{ display: 'block' }}>{o.fullName}</b><span style={{ color: '#9fb0c8', fontSize: 10 }}>{o.email || 'No email'}</span></span>
                <span>{o.plan} — {o.speed}Mbps</span>
                <span>{o.phone}</span>
                <span style={{ color: '#9fb0c8', fontSize: 11 }}>{o.address?.substring(0, 40)}…</span>
                <span style={{ color: '#9fb0c8' }}>{new Date(o.createdAt).toLocaleDateString('bn-BD')}</span>
                <span style={{ color: STATUS_COLORS[o.status] || '#9fb0c8', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>{o.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Contacts table */}
        {activeTab === 'contacts' && (
          <div style={{ border: '1px solid rgba(186,221,255,.12)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', background: 'rgba(186,221,255,.04)', fontSize: 10, color: '#9fb0c8', letterSpacing: '.1em', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr' }}>
              <span>NAME</span><span>PHONE</span><span>EMAIL</span><span>MESSAGE</span><span>DATE</span>
            </div>
            {contacts.length === 0 && <p style={{ padding: 24, color: '#9fb0c8', fontSize: 13 }}>No contacts yet.</p>}
            {contacts.map((c) => (
              <div key={c._id} style={{ padding: '14px 20px', borderTop: '1px solid rgba(186,221,255,.08)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr', fontSize: 12, alignItems: 'center' }}>
                <span><b>{c.name}</b></span>
                <span>{c.phone}</span>
                <span style={{ color: '#9fb0c8' }}>{c.email || '—'}</span>
                <span style={{ color: '#9fb0c8', fontSize: 11 }}>{c.message?.substring(0, 60)}…</span>
                <span style={{ color: '#9fb0c8' }}>{new Date(c.createdAt).toLocaleDateString('bn-BD')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
