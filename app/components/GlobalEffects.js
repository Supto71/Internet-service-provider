'use client';

import { useEffect } from 'react';

export default function GlobalEffects() {
  useEffect(() => {
    const handleMove = (e) => {
      const el = document.getElementById('cursor-glow');
      if (el) {
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <>
      <div className="noise" style={{ position:'fixed', inset:0, zIndex:20, pointerEvents:'none', opacity:0.032, backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 180 180\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.55\'/%3E%3C/svg%3E")' }} />
      <div id="cursor-glow" style={{ position:'fixed', width:400, height:400, borderRadius:'50%', pointerEvents:'none', zIndex:-1, background:'radial-gradient(circle,rgba(12,120,255,.1),transparent 66%)', transform:'translate(-50%,-50%)', display:'none' }} />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          #cursor-glow { display: block !important; }
        }
      `}</style>
    </>
  );
}
