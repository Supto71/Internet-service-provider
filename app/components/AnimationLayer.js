'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────
   AnimationLayer
   Adds to every page:
   1. Floating 3-D particle canvas background
   2. Cursor radial glow
   3. Scroll-triggered 3D reveal on [data-3d] elements
───────────────────────────────────────── */
export default function AnimationLayer() {
  const canvasRef = useRef(null);

  /* ── 1. Particle Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [], animId;

    const PARTICLE_COUNT = 90;
    const COLORS = ['#6de5ff', '#3b82f6', '#a855f7', '#22d3ee', '#ffffff'];

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : H + 10;
        this.z = Math.random(); // depth 0-1
        this.r = (0.5 + this.z * 2.5);
        this.vx = (Math.random() - 0.5) * 0.4 * (0.3 + this.z);
        this.vy = -(0.2 + Math.random() * 0.5) * (0.3 + this.z);
        this.alpha = 0.15 + this.z * 0.65;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.glow = this.z > 0.6;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += 0.025;
        // subtle horizontal drift
        this.vx += Math.sin(this.pulse * 0.4) * 0.005;
        if (this.y < -10 || this.x < -20 || this.x > W + 20) this.reset();
      }
      draw() {
        const pulseR = this.r + Math.sin(this.pulse) * 0.4;
        if (this.glow) {
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, pulseR * 5);
          grad.addColorStop(0, this.color + 'cc');
          grad.addColorStop(1, this.color + '00');
          ctx.beginPath();
          ctx.arc(this.x, this.y, pulseR * 5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Connecting lines between nearby particles
    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#6de5ff';
            ctx.globalAlpha = (1 - dist / 120) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function init() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      drawLines();
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(loop);
    }

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    init();
    loop();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* ── 2. Cursor Glow ── */
  useEffect(() => {
    const glow = document.getElementById('cursor-glow-global');
    if (!glow) return;
    const move = (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  /* ── 3. Scroll-triggered 3D reveal ── */
  useEffect(() => {
    // Inject CSS for 3D reveal
    if (!document.getElementById('anim3d-style')) {
      const style = document.createElement('style');
      style.id = 'anim3d-style';
      style.textContent = `
        [data-3d] {
          opacity: 0;
          transform: perspective(800px) rotateX(18deg) translateY(40px) scale(0.96);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1),
                      transform 0.75s cubic-bezier(.22,1,.36,1);
          will-change: transform, opacity;
        }
        [data-3d].in-view {
          opacity: 1;
          transform: perspective(800px) rotateX(0deg) translateY(0px) scale(1);
        }
        [data-3d-left] {
          opacity: 0;
          transform: perspective(800px) rotateY(20deg) translateX(-50px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        [data-3d-left].in-view {
          opacity: 1;
          transform: perspective(800px) rotateY(0deg) translateX(0);
        }
        [data-3d-right] {
          opacity: 0;
          transform: perspective(800px) rotateY(-20deg) translateX(50px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        [data-3d-right].in-view {
          opacity: 1;
          transform: perspective(800px) rotateY(0deg) translateX(0);
        }
        [data-3d-scale] {
          opacity: 0;
          transform: perspective(600px) scale(0.85) rotateX(10deg);
          transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                      transform 0.7s cubic-bezier(.22,1,.36,1);
        }
        [data-3d-scale].in-view {
          opacity: 1;
          transform: perspective(600px) scale(1) rotateX(0deg);
        }
        /* Staggered delays */
        [data-delay="1"] { transition-delay: 0.1s; }
        [data-delay="2"] { transition-delay: 0.2s; }
        [data-delay="3"] { transition-delay: 0.3s; }
        [data-delay="4"] { transition-delay: 0.4s; }
        [data-delay="5"] { transition-delay: 0.5s; }
        [data-delay="6"] { transition-delay: 0.6s; }

        /* 3D hover tilt on cards */
        .tilt-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
      `;
      document.head.appendChild(style);
    }

    const targets = document.querySelectorAll('[data-3d], [data-3d-left], [data-3d-right], [data-3d-scale]');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  /* ── 4. 3D card tilt on mouse move ── */
  useEffect(() => {
    const handleTilt = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), ${rotateY * -1}px ${rotateX}px 30px rgba(109,229,255,0.15)`;
    };
    const handleLeave = (e) => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    };

    const attachTilt = () => {
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.removeEventListener('mousemove', handleTilt);
        card.removeEventListener('mouseleave', handleLeave);
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', handleLeave);
      });
    };

    attachTilt();
    // Re-attach on route change (observe DOM mutations)
    const mo = new MutationObserver(attachTilt);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.55,
        }}
      />

      {/* Cursor Glow */}
      <div
        id="cursor-glow-global"
        style={{
          position: 'fixed',
          width: 420,
          height: 420,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'radial-gradient(circle, rgba(12,120,255,.08), transparent 66%)',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.08s, top 0.08s',
        }}
      />
    </>
  );
}
