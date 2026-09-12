'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/* ─────────────────────────────────────────
   PageTransition
   Wraps every page in a 3D perspective
   enter animation on route change.
───────────────────────────────────────── */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Reset & replay animation
    el.style.animation = 'none';
    el.offsetHeight; // reflow trigger
    el.style.animation = '';
  }, [pathname]);

  return (
    <div ref={wrapperRef} className="page-3d-wrapper">
      {children}
      <style>{`
        @keyframes page3dEnter {
          0% {
            opacity: 0;
            transform: perspective(1200px) rotateX(6deg) translateY(30px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: perspective(1200px) rotateX(0deg) translateY(0px) scale(1);
          }
        }
        .page-3d-wrapper {
          animation: page3dEnter 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: center top;
          will-change: transform, opacity;
          position: relative;
          z-index: 2;
        }
      `}</style>
    </div>
  );
}
