'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HOME_PLANS = [
  { name:'Essential', speed:30,  price:500,  color:'#64748b', popular:false, features:['Fiber-ready connection','Everyday browsing','Local CDN access','Standard support'] },
  { name:'Connected', speed:50,  price:700,  color:'#2563eb', popular:true,  features:['Smooth 4K streaming','Multi-device','HD Facebook & YouTube','Priority support'] },
  { name:'Momentum',  speed:75,  price:900,  color:'#0891b2', popular:false, features:['Active household','Bufferless YouTube','Enhanced Wi-Fi','Local support'] },
  { name:'Limitless', speed:100, price:1100, color:'#7c3aed', popular:false, features:['Power users','Multi high-bandwidth','Low latency gaming','Premium pathway'] },
  { name:'Ultra',     speed:150, price:1500, color:'#dc2626', popular:false, features:['IPv6 ready','BDIX direct','Dedicated manager','VIP support'] },
  { name:'Giga',      speed:200, price:2000, color:'#059669', popular:false, features:['Max home speed','All premium features','Public IP','VIP 24/7'] },
];

const BIZ_PLANS = [
  { name:'SME Starter', speed:50,  price:2500, color:'#2563eb', popular:false, features:['Dedicated connection','SLA guaranteed','24/7 manager','Multiple upstream'] },
  { name:'SME Pro',     speed:100, price:4000, color:'#7c3aed', popular:true,  features:['High-speed dedicated','IPv6 ready','Public IP','Network monitoring'] },
  { name:'Enterprise',  speed:300, price:8000, color:'#dc2626', popular:false, features:['Enterprise grade','Multiple backup links','99.9% uptime SLA','On-site support'] },
];

const COVERAGE = [
  { zone:'North Dhaka',   locs:['Uttara','Mirpur','Pallabi','Cantonment'] },
  { zone:'Central Dhaka', locs:['Gulshan','Banani','Mohakhali','Tejgaon'] },
  { zone:'South Dhaka',   locs:['Dhanmondi','Lalmatia','Mohammadpur','Azimpur'] },
  { zone:'East Dhaka',    locs:['Badda','Rampura','Khilgaon','Basabo'] },
];

const OFFERS = [
  { title:'New Connection Discount', desc:'Get 50% off your first month on any Home Broadband plan. No installation charge.', code:'NEW50',      valid:'Valid until Oct 31, 2026', bg:'linear-gradient(135deg,#0f4c81,#1a6bb5)' },
  { title:'Refer a Friend',          desc:'Refer a friend and both get 1 month free internet upon successful activation.',    code:'REFERFREE',  valid:'Ongoing',                   bg:'linear-gradient(135deg,#4c1d95,#7c3aed)' },
  { title:'Corporate Bundle Upgrade',desc:'Upgrade SME Starter to SME Pro and get first 3 months at Starter price.',         code:'PROUPGRADE', valid:'Valid until Dec 31, 2026', bg:'linear-gradient(135deg,#064e3b,#059669)' },
];

const SECTIONS   = ['home','features','selfcare','about','pricing','coverage','offers','contact'];
const NAV_LABELS = ['Home','Features','Self Care','About','Pricing','Coverage','Offers','Contact'];

function snap(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Home() {
  const canvasRef  = useRef(null);
  const [mounted,    setMounted]    = useState(false);
  const [active,     setActive]     = useState(0);
  const [visible,    setVisible]    = useState({});
  const [scrolled,   setScrolled]   = useState(false);
  const [pricingTab, setPricingTab] = useState('home');
  const [form,       setForm]       = useState({ name:'', phone:'', email:'', message:'' });
  const [fStatus,    setFStatus]    = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Canvas hero animation - Scroll tied */
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    const fiberCanvas = document.getElementById('fiberCanvas');
    if (!canvas || !fiberCanvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const fCtx = fiberCanvas.getContext('2d');
    const N = 240;
    const images = new Map();
    let wanted = 0, painted = -1, raf = 0, fiberRaf = 0;
    
    // Fiber effect state
    let fibers = [];
    let scrollVelocity = 0;
    let lastProgress = 0;
    let fWidth = window.innerWidth;
    let fHeight = window.innerHeight;

    const framePath = i => `/hero_frames_1280x720_png/frame_${String(i).padStart(4,'0')}.png`;

    const draw = (index) => {
      const img = images.get(index);
      if (!img || !img.complete || img.naturalWidth === 0) {
        console.log('[Hero] Skipping draw for frame', index, 'complete:', img?.complete, 'width:', img?.naturalWidth);
        return;
      }
      const cw = canvas.width, ch = canvas.height, iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih), w = iw * scale, h = ih * scale;
      ctx.fillStyle = '#030f26'; ctx.fillRect(0,0,cw,ch);
      ctx.drawImage(img, (cw-w)/2, (ch-h)/2, w, h);
      painted = index;
      console.log('[Hero] Painted frame', index);
    };

    const requestDraw = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { 
        if (wanted !== painted) {
          draw(wanted); 
        }
      });
    };

    const loadFrame = (i) => {
      if (images.has(i)) return;
      const img = new window.Image();
      img.decoding = 'async';
      img.onload = () => { console.log('[Hero] Loaded frame', i); requestDraw(); };
      img.onerror = () => { console.error('[Hero] Failed to load frame', i); };
      img.src = framePath(i);
      images.set(i, img);
      if (img.complete) {
        requestDraw();
      }
    };

    const important = [0,1,2,3,4,5,6,7,8,10,12,16,20,24,30,40,55,70,90,115,145,175,205,239];
    important.forEach(loadFrame);
    let i = 0;
    const idle = () => {
      for(let n=0; n<4 && i<N; n++, i++) loadFrame(i);
      if(i<N) (window.requestIdleCallback || ((f)=>setTimeout(f,35)))(idle);
    };
    idle();

    // Initialize fibers
    const initFibers = () => {
      fibers = Array.from({ length: 60 }, () => ({
        x: Math.random() * fWidth,
        y: Math.random() * fHeight,
        length: 50 + Math.random() * 150,
        speed: 1 + Math.random() * 3,
        thickness: 0.5 + Math.random() * 1.5,
        alpha: Math.random(),
        curve: (Math.random() - 0.5) * 50
      }));
    };

    const resize = () => { 
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr; 
      canvas.height = window.innerHeight * dpr;
      
      fWidth = window.innerWidth;
      fHeight = window.innerHeight;
      fiberCanvas.width = fWidth * dpr;
      fiberCanvas.height = fHeight * dpr;
      fCtx.scale(dpr, dpr);
      
      initFibers();
      draw(wanted); 
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Fiber animation loop
    const animateFibers = () => {
      fCtx.clearRect(0, 0, fWidth, fHeight);
      
      // Decay velocity
      scrollVelocity *= 0.92;
      const baseSpeed = 1 + scrollVelocity * 15;
      
      fibers.forEach(f => {
        // Move fiber right-to-left or along perspective
        f.x -= f.speed * baseSpeed;
        if (f.x < -f.length) {
          f.x = fWidth + f.length;
          f.y = Math.random() * fHeight;
        }
        
        // Draw fiber
        fCtx.beginPath();
        fCtx.moveTo(f.x, f.y);
        fCtx.quadraticCurveTo(f.x + f.length / 2, f.y + f.curve, f.x + f.length, f.y);
        
        const grad = fCtx.createLinearGradient(f.x, f.y, f.x + f.length, f.y);
        grad.addColorStop(0, `rgba(109, 229, 255, 0)`);
        grad.addColorStop(0.8, `rgba(109, 229, 255, ${f.alpha})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${f.alpha + 0.2})`);
        
        fCtx.strokeStyle = grad;
        fCtx.lineWidth = f.thickness;
        fCtx.lineCap = 'round';
        fCtx.stroke();
      });
      fiberRaf = requestAnimationFrame(animateFibers);
    };
    initFibers();
    animateFibers();

    const updateScroll = () => {
      const hero = document.getElementById('home');
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const max = hero.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -r.top / max));
      
      scrollVelocity = Math.abs(progress - lastProgress) * 1000;
      lastProgress = progress;
      
      wanted = Math.round(progress * (N - 1));
      loadFrame(wanted); // Ensure the frame we want is actively loading
      requestDraw();

      // Sequential Information Blocks Logic
      const blocks = 3;
      for (let i = 0; i < blocks; i++) {
        const copy = document.getElementById(`hero-copy-${i}`);
        if (!copy) continue;
        
        const start = i / blocks;
        const end = (i + 1) / blocks;
        const center = (start + end) / 2;
        
        let dist = 0;
        if (i === 0 && progress < center) {
          dist = 0;
        } else if (i === blocks - 1 && progress > center) {
          dist = 0;
        } else {
          dist = Math.abs(progress - center) / (0.4 / blocks); // fade range
        }
        
        const opacity = Math.max(0, 1 - dist);
        const move = (progress - center) * 150;
        
        copy.style.opacity = opacity;
        copy.style.transform = `translateY(calc(-50% - ${move}px))`;
        copy.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      }
    };
    
    // Call updateScroll once on mount to set initial text positions
    updateScroll();
    
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fiberRaf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
    };
  }, [mounted]);

  /* Section visibility for animations */
  useEffect(() => {
    if (!mounted) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = SECTIONS.indexOf(e.target.id);
        if (e.isIntersecting) {
          setActive(idx);
          setVisible(v => ({ ...v, [e.target.id]: true }));
        }
      });
    }, { threshold: 0.35 });
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [mounted]);

  /* Navbar scroll state */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Contact submit */
  const handleSubmit = async e => {
    e.preventDefault(); setFStatus('Sending...');
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const d = await r.json();
      if (d.success) { setFStatus('Message sent!'); setForm({ name:'',phone:'',email:'',message:'' }); }
      else setFStatus(d.message||'Error.');
    } catch { setFStatus('Error sending message.'); }
  };

  if (!mounted) return null;

  const vis = id => visible[id];

  const fadeUp = (id, delay=0) => ({
    opacity: vis(id) ? 1 : 0,
    transform: vis(id) ? 'translateY(0)' : 'translateY(48px)',
    transition: `opacity 0.9s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.9s ${delay}s cubic-bezier(.22,1,.36,1)`,
  });
  const fadeLeft = (id, delay=0) => ({
    opacity: vis(id) ? 1 : 0,
    transform: vis(id) ? 'translateX(0)' : 'translateX(-56px)',
    transition: `opacity 0.85s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.85s ${delay}s cubic-bezier(.22,1,.36,1)`,
  });
  const fadeRight = (id, delay=0) => ({
    opacity: vis(id) ? 1 : 0,
    transform: vis(id) ? 'translateX(0)' : 'translateX(56px)',
    transition: `opacity 0.85s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.85s ${delay}s cubic-bezier(.22,1,.36,1)`,
  });
  const scaleIn = (id, delay=0) => ({
    opacity: vis(id) ? 1 : 0,
    transform: vis(id) ? 'scale(1)' : 'scale(0.88)',
    transition: `opacity 0.8s ${delay}s cubic-bezier(.22,1,.36,1), transform 0.8s ${delay}s cubic-bezier(.22,1,.36,1)`,
  });

  return (
    <>
      <style>{`
        body { margin:0; background:#030f26; color:#f8fafc; font-family:Manrope,sans-serif; overflow-x:hidden; }
        * { box-sizing:border-box; }
        
        .snap { height:100vh; min-height:100vh; width:100%; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; }
        .snap-tall { height:400vh; width:100%; position:relative; }
        .snap-scroll { min-height:100vh; width:100%; position:relative; overflow-y:auto; overflow-x:hidden; }
        
        .plan-card { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s; }
        .plan-card:hover { transform:translateY(-10px) scale(1.02); box-shadow:0 30px 60px rgba(0,0,0,.5),0 0 40px rgba(109,229,255,.12); }
        .offer-card { transition:transform 0.35s cubic-bezier(.22,1,.36,1); }
        .offer-card:hover { transform:translateY(-8px); }
        .nav-dot { cursor:pointer; transition:all .3s; }
        .nav-dot:hover { transform:scale(1.4); }
        input:focus, textarea:focus { border-color:#6de5ff!important; outline:none; }
        input::placeholder, textarea::placeholder { color:rgba(159,176,200,.55); }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, padding:'0 40px', height:70, display:'flex', alignItems:'center', gap:32, background: scrolled ? 'rgba(3,15,38,.92)' : 'transparent', backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: scrolled ? '1px solid rgba(186,221,255,.1)' : 'none', transition:'all .5s cubic-bezier(.22,1,.36,1)' }}>
        <button onClick={() => snap('home')} style={{ background:'none',border:0,cursor:'pointer',padding:0,flexShrink:0 }}>
          <Image src="/logo.png" alt="Sheikh Online" width={105} height={42} style={{ objectFit:'contain' }} />
        </button>
        <nav style={{ display:'flex', gap:28, flex:1, justifyContent:'center' }}>
          {NAV_LABELS.map((label,i) => (
            <button key={label} onClick={() => snap(SECTIONS[i])} style={{ background:'none', border:'none', cursor:'pointer', fontSize:10, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', color: active===i ? '#6de5ff' : 'rgba(255,255,255,.55)', transition:'color .3s', padding:'6px 0', borderBottom: active===i ? '1px solid #6de5ff' : '1px solid transparent' }}>{label}</button>
          ))}
        </nav>
        <Link href="/dashboard" style={{ background:'linear-gradient(120deg,#168df4,#1bd9ef)', color:'#fff', border:0, borderRadius:8, padding:'9px 20px', fontSize:11, fontWeight:800, textDecoration:'none', flexShrink:0, boxShadow:'0 4px 20px rgba(22,141,244,.35)' }}>Self Care →</Link>
      </header>

      {/* â”€â”€ RIGHT DOT NAV â”€â”€ */}
      <div style={{ position:'fixed', right:26, top:'50%', transform:'translateY(-50%)', zIndex:200, display:'flex', flexDirection:'column', gap:10, alignItems:'center' }}>
        {SECTIONS.map((id,i) => (
          <div key={id} className="nav-dot" onClick={() => snap(id)} title={NAV_LABELS[i]}
            style={{ width: active===i ? 10 : 6, height: active===i ? 10 : 6, borderRadius:'50%', background: active===i ? '#6de5ff' : 'rgba(255,255,255,.3)', boxShadow: active===i ? '0 0 12px #6de5ff' : 'none' }} />
        ))}
      </div>

      {/* ═══ SECTION: HOME (400vh Scroll-tied Canvas) ═══ */}
      <section id="home" className="snap-tall">
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#05122b' }}>
          <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex: 0 }} />
          <canvas id="fiberCanvas" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex: 1 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,rgba(3,15,38,.9) 0%,rgba(3,15,38,.3) 45%,rgba(3,15,38,.1) 100%), linear-gradient(0deg,rgba(3,15,38,.8) 0%,transparent 30%)', zIndex: 1 }} />
          
          <div id="hero-copy-0" style={{ position:'absolute', left:'8vw', top:'50%', transform:'translateY(-50%)', maxWidth:640, zIndex:2, opacity: 1, willChange: 'opacity, transform' }}>
            <p style={{ fontSize:10, color:'#6de5ff', letterSpacing:'.22em', fontWeight:800, margin:'0 0 18px', textTransform:'uppercase' }}>SHEIKH ONLINE SERVICE</p>
            <h1 style={{ fontSize:'clamp(42px,5.5vw,80px)', fontWeight:800, lineHeight:1.05, margin:'0 0 22px', letterSpacing:'-.055em' }}>
              Faster internet.<br/><em style={{ fontStyle:'normal', color: '#80e7ff' }}>A smarter connection.</em>
            </h1>
            <p style={{ fontSize:17, color:'rgba(210,222,237,.85)', lineHeight:1.75, marginBottom:36, maxWidth:500 }}>Reliable, high-speed connectivity designed for the way you live, work and connect.</p>
            <div style={{ display:'flex', gap:16 }}>
              <button onClick={() => snap('pricing')} style={{ background:'linear-gradient(120deg,#168df4,#1bd9ef)', color:'#fff', border:0, borderRadius:10, padding:'15px 32px', fontSize:14, fontWeight:800, cursor:'pointer', boxShadow:'0 8px 30px rgba(22,141,244,.4)' }}>View Packages →</button>
              <button onClick={() => snap('coverage')} style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.2)', color:'#fff', borderRadius:10, padding:'15px 32px', fontSize:14, fontWeight:700, cursor:'pointer', backdropFilter:'blur(10px)' }}>Check Coverage</button>
            </div>
          </div>

          <div id="hero-copy-1" style={{ position:'absolute', left:'8vw', top:'50%', transform:'translateY(0)', maxWidth:640, zIndex:2, opacity: 0, willChange: 'opacity, transform' }}>
            <p style={{ fontSize:10, color:'#6de5ff', letterSpacing:'.22em', fontWeight:800, margin:'0 0 18px', textTransform:'uppercase' }}>FIBER-OPTIC BACKBONE</p>
            <h1 style={{ fontSize:'clamp(42px,5.5vw,80px)', fontWeight:800, lineHeight:1.05, margin:'0 0 22px', letterSpacing:'-.055em' }}>
              Speed at the core.<br/><em style={{ fontStyle:'normal', color: '#80e7ff' }}>No compromises.</em>
            </h1>
            <p style={{ fontSize:17, color:'rgba(210,222,237,.85)', lineHeight:1.75, marginBottom:36, maxWidth:500 }}>Experience a direct and stable foundation for every connected home. Zero buffering, total reliability.</p>
          </div>

          <div id="hero-copy-2" style={{ position:'absolute', left:'8vw', top:'50%', transform:'translateY(0)', maxWidth:640, zIndex:2, opacity: 0, willChange: 'opacity, transform' }}>
            <p style={{ fontSize:10, color:'#6de5ff', letterSpacing:'.22em', fontWeight:800, margin:'0 0 18px', textTransform:'uppercase' }}>UNMATCHED RELIABILITY</p>
            <h1 style={{ fontSize:'clamp(42px,5.5vw,80px)', fontWeight:800, lineHeight:1.05, margin:'0 0 22px', letterSpacing:'-.055em' }}>
              Always on.<br/><em style={{ fontStyle:'normal', color: '#80e7ff' }}>Ready for your digital life.</em>
            </h1>
            <p style={{ fontSize:17, color:'rgba(210,222,237,.85)', lineHeight:1.75, marginBottom:36, maxWidth:500 }}>From your first stream at night to your last message of the day, Sheikh keeps your world moving.</p>
          </div>
          
          <div style={{ position:'absolute', bottom:30, left:'50%', zIndex:10, animation:'scrollBounce 2s infinite', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:9, color:'rgba(255,255,255,.4)', letterSpacing:'.15em', fontWeight:700, textTransform:'uppercase' }}>Scroll</span>
            <div style={{ width:1, height:36, background:'linear-gradient(to bottom,rgba(109,229,255,.6),transparent)' }} />
          </div>
        </div>
      </section>

      {/* â• â• â• â• â• â• â• â• â• â• â• â• â• â•  SECTION: FEATURES â• â• â• â• â• â• â• â• â• â• â• â• â• â•  */}
      <section id="features" className="snap" style={{ background:'radial-gradient(ellipse at 70% 50%,#0a2141 0%,#030f26 65%)', padding:'0 8vw' }}>
        <div style={{ maxWidth:1200, width:'100%', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
          <div>
            <p style={{ ...fadeLeft('features', 0), fontSize:10, color:'#6de5ff', letterSpacing:'.22em', fontWeight:800, margin:'0 0 18px', textTransform:'uppercase' }}>Why Choose Us</p>
            <h2 style={{ ...fadeLeft('features', 0.1), fontSize:'clamp(36px,4.5vw,60px)', fontWeight:800, lineHeight:1.07, margin:'0 0 36px', letterSpacing:'-.05em' }}>Built for the<br/><em style={{ fontStyle:'normal', color:'#6de5ff' }}>modern internet.</em></h2>
            <div style={{ ...fadeLeft('features', 0.2), display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {['Local CDN','BDIX Direct','HD Streaming','Fiber Optic','Low Latency','Multi Upstream','Public IP','24/7 Support'].map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', background:'rgba(255,255,255,.05)', borderRadius:40, border:'1px solid rgba(186,221,255,.08)' }}>
                  <span style={{ color:'#6effc6', fontSize:13, flexShrink:0 }}>✓</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            {[{s:50,p:700},{s:100,p:1100},{s:150,p:1500},{s:200,p:2000}].map((x, i) => (
              <div key={x.s} style={{ ...scaleIn('features', 0.1 + (i * 0.1)), background:'rgba(10,25,56,.8)', border:'1px solid rgba(109,229,255,.15)', borderRadius:14, padding:'22px 18px', textAlign:'center' }}>
                <div style={{ fontSize:36, fontWeight:800, color:'#FFDD72', letterSpacing:'-.05em' }}>{x.s}<span style={{ fontSize:12, color:'#9fb0c8', fontWeight:400 }}> Mbps</span></div>
                <div style={{ marginTop:10, background:'linear-gradient(120deg,#1a3a6e,#2d3587)', borderRadius:8, padding:'7px', fontSize:13, fontWeight:700 }}>৳{x.p}/mo</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: SELF-CARE â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="selfcare" className="snap" style={{ background:'radial-gradient(ellipse at 30% 70%,#064e3b 0%,#030f26 65%)', padding:'0 5vw' }}>
        <div style={{ textAlign:'center', maxWidth:750, margin: '0 auto' }}>
          <div style={{ ...fadeUp('selfcare', 0), fontSize:68, marginBottom:28, filter:'drop-shadow(0 0 30px rgba(110,255,198,.3))' }}>⚙️</div>
          <p style={{ ...fadeUp('selfcare', 0.1), fontSize:10, color:'#6effc6', letterSpacing:'.22em', fontWeight:800, margin:'0 0 18px', textTransform:'uppercase' }}>Self-Care Portal</p>
          <h2 style={{ ...fadeUp('selfcare', 0.2), fontSize:'clamp(38px,5vw,64px)', fontWeight:800, lineHeight:1.07, margin:'0 0 22px', letterSpacing:'-.05em' }}>Manage everything<br/><em style={{ fontStyle:'normal', color:'#6effc6' }}>in one place.</em></h2>
          <p style={{ ...fadeUp('selfcare', 0.3), fontSize:17, color:'rgba(210,222,237,.75)', lineHeight:1.75, marginBottom:40 }}>View bills, upgrade your plan, track usage, and get support.</p>
          <div style={{ ...fadeUp('selfcare', 0.4) }}>
            <Link href="/dashboard" style={{ background:'linear-gradient(120deg,#059669,#34d399)', color:'#fff', borderRadius:12, padding:'16px 44px', fontSize:16, fontWeight:800, textDecoration:'none', display:'inline-block', boxShadow:'0 8px 30px rgba(5,150,105,.4)' }}>Access Self-Care →</Link>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: ABOUT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="about" className="snap" style={{ background:'radial-gradient(ellipse at 20% 60%,#081a3b 0%,#030f26 70%)',padding:'0 8vw' }}>
        <div style={{ maxWidth:1200,width:'100%',margin:'0 auto',display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:80,alignItems:'center',position:'relative' }}>
          <div>
            <p style={{ ...fadeLeft('about',0),fontSize:10,color:'#6de5ff',letterSpacing:'.22em',fontWeight:800,margin:'0 0 18px',textTransform:'uppercase',display:'block' }}>Our Story</p>
            <h2 style={{ ...fadeLeft('about',.1),fontSize:'clamp(38px,4.8vw,66px)',fontWeight:800,lineHeight:1.05,margin:'0 0 24px',letterSpacing:'-.055em',display:'block' }}>
              Empowering<br/>communities<br/><em style={{ fontStyle:'normal',color:'#6de5ff' }}>through connectivity.</em>
            </h2>
            <p style={{ ...fadeLeft('about',.2),fontSize:16,color:'rgba(210,222,237,.78)',lineHeight:1.8,marginBottom:36,maxWidth:520,display:'block' }}>
              Since our inception, Sheikh Online Service has been dedicated to providing high-speed, reliable, and affordable internet to homes and businesses across the region.
            </p>
            <div style={{ ...fadeLeft('about',.3),display:'grid',gridTemplateColumns:'repeat(3,1fr)',border:'1px solid rgba(186,221,255,.12)',borderRadius:16,overflow:'hidden' }}>
              {[{v:'10K+',l:'Active Users'},{v:'50+',l:'Areas Covered'},{v:'99.9%',l:'Uptime'}].map((s,i) => (
                <div key={s.l} style={{ padding:'26px 18px',borderRight:i<2?'1px solid rgba(186,221,255,.12)':'none',textAlign:'center' }}>
                  <div style={{ fontSize:34,fontWeight:800,color:'#6de5ff',letterSpacing:'-.05em' }}>{s.v}</div>
                  <div style={{ fontSize:10,color:'#9fb0c8',fontWeight:700,marginTop:6,letterSpacing:'.08em',textTransform:'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:'grid',gap:14 }}>
            {[
              { t:'Our Mission', d:'To bridge the digital divide by offering state-of-the-art broadband connectivity and unparalleled customer service. We continuously upgrade our infrastructure.' },
              { t:'Our Vision',  d:'To be the most trusted and innovative ISP in the country, fostering a highly connected society where technology enhances everyday life seamlessly.' },
              { t:'24/7 Support',d:'Our dedicated support team is always available — call, email, or visit us. We are committed to resolving your issues as fast as possible.' },
            ].map((item,i) => (
              <div key={item.t} style={{ ...scaleIn('about',i*.1),background:'rgba(10,25,56,.7)',border:'1px solid rgba(186,221,255,.1)',borderRadius:14,padding:'20px 22px',backdropFilter:'blur(10px)',display:'block' }}>
                <h3 style={{ fontSize:15,fontWeight:800,marginBottom:8,color:'#f8fafc' }}>{item.t}</h3>
                <p style={{ fontSize:13,color:'#9fb0c8',lineHeight:1.7,margin:0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: PRICING â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="pricing" className="snap-scroll" style={{ background:'#030f26',padding:'90px 6vw 60px' }}>
        <div style={{ maxWidth:1280,margin:'0 auto' }}>
          <div style={{ ...fadeUp('pricing',0),textAlign:'center',marginBottom:44 }}>
            <p style={{ fontSize:10,color:'#6de5ff',letterSpacing:'.22em',fontWeight:800,margin:'0 0 14px',textTransform:'uppercase' }}>Find Your Pace</p>
            <h2 style={{ fontSize:'clamp(36px,4.5vw,56px)',fontWeight:800,lineHeight:1.07,margin:'0 0 14px',letterSpacing:'-.05em' }}>Plans without <em style={{ fontStyle:'normal',color:'#6de5ff' }}>compromise.</em></h2>
            <p style={{ fontSize:15,color:'#9fb0c8' }}>Starting from à§³500/month Â· No hidden fees Â· Cancel anytime</p>
          </div>
          <div style={{ ...fadeUp('pricing',.1),display:'flex',justifyContent:'center',marginBottom:36 }}>
            <div style={{ display:'flex',background:'rgba(255,255,255,.06)',borderRadius:40,padding:4,border:'1px solid rgba(186,221,255,.12)' }}>
              {[['home','🏠 Home'],['biz','🏢 Business']].map(([k,l]) => (
                <button key={k} onClick={() => setPricingTab(k)} style={{ padding:'10px 28px',borderRadius:36,border:0,cursor:'pointer',fontSize:13,fontWeight:800,background:pricingTab===k?'linear-gradient(120deg,#168df4,#1bd9ef)':'transparent',color:pricingTab===k?'#fff':'#9fb0c8',transition:'all .3s',boxShadow:pricingTab===k?'0 4px 20px rgba(22,141,244,.35)':'none' }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18 }}>
            {(pricingTab==='home' ? HOME_PLANS : BIZ_PLANS).map((p,i) => (
              <div key={p.name} className="plan-card" style={{ ...scaleIn('pricing',i*.06),position:'relative',background:p.popular?'linear-gradient(145deg,#0c2f5e,#071528)':'rgba(10,25,56,.8)',border:`1px solid ${p.popular?'#6de5ff':'rgba(186,221,255,.1)'}`,borderRadius:18,padding:26,backdropFilter:'blur(10px)',display:'block' }}>
                {p.popular && <div style={{ position:'absolute',top:-13,left:'50%',transform:'translateX(-50%)',background:'linear-gradient(90deg,#6de5ff,#a78bfa)',color:'#030f26',fontSize:9,fontWeight:800,padding:'5px 16px',borderRadius:20,letterSpacing:'.1em',whiteSpace:'nowrap' }}>MOST POPULAR</div>}
                <div style={{ display:'inline-block',background:p.color,color:'#fff',fontSize:10,fontWeight:800,padding:'4px 12px',borderRadius:6,marginBottom:16,letterSpacing:'.06em' }}>{p.name.toUpperCase()}</div>
                <div><span style={{ fontSize:46,fontWeight:800,letterSpacing:'-.06em' }}>{p.speed}</span><span style={{ fontSize:13,color:'#9fb0c8',marginLeft:4 }}>Mbps</span></div>
                <div style={{ marginBottom:18 }}><span style={{ fontSize:24,fontWeight:800 }}>৳{p.price.toLocaleString()}</span><span style={{ fontSize:12,color:'#9fb0c8' }}>/month</span></div>
                <ul style={{ listStyle:'none',padding:0,margin:'0 0 20px',display:'grid',gap:6 }}>
                  {p.features.map(f => <li key={f} style={{ fontSize:12,color:'#9fb0c8',display:'flex',gap:8,alignItems:'center' }}><span style={{ color:'#6effc6',flexShrink:0 }}>✓</span>{f}</li>)}
                </ul>
                <button onClick={() => snap('contact')} style={{ width:'100%',border:0,borderRadius:10,padding:'12px',fontSize:12,fontWeight:800,cursor:'pointer',background:p.popular?'linear-gradient(120deg,#168df4,#1bd9ef)':'rgba(186,221,255,.08)',color:'#fff' }}>{pricingTab==='home'?'Get Connected →':'Contact Sales →'}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: COVERAGE â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="coverage" className="snap" style={{ background:'radial-gradient(ellipse at 50% 100%,#071f45 0%,#030f26 65%)',padding:'0 8vw' }}>
        <div style={{ maxWidth:1200,width:'100%',margin:'0 auto',position:'relative' }}>
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <p style={{ ...fadeUp('coverage',0),fontSize:10,color:'#6de5ff',letterSpacing:'.22em',fontWeight:800,margin:'0 0 14px',textTransform:'uppercase',display:'block' }}>Network Reach</p>
            <h2 style={{ ...fadeUp('coverage',.1),fontSize:'clamp(38px,4.8vw,62px)',fontWeight:800,lineHeight:1.07,margin:'0 0 14px',letterSpacing:'-.055em',display:'block' }}>Check our <em style={{ fontStyle:'normal',color:'#6de5ff' }}>coverage area.</em></h2>
            <p style={{ ...fadeUp('coverage',.2),fontSize:16,color:'#9fb0c8',maxWidth:540,margin:'0 auto',display:'block' }}>Expanding our optical fiber network. See if we are available in your area.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:32 }}>
            {COVERAGE.map((area,i) => (
              <div key={area.zone} style={{ ...scaleIn('coverage',i*.08),background:'rgba(10,25,56,.75)',border:'1px solid rgba(186,221,255,.1)',borderRadius:16,padding:'22px 18px',backdropFilter:'blur(10px)',display:'block' }}>
                <h3 style={{ fontSize:14,fontWeight:800,marginBottom:14,color:'#6de5ff' }}>{area.zone}</h3>
                <ul style={{ listStyle:'none',padding:0,margin:0,display:'grid',gap:9 }}>
                  {area.locs.map(l => <li key={l} style={{ fontSize:14,display:'flex',alignItems:'center',gap:8,color:'#e2eaf3' }}><span style={{ width:5,height:5,borderRadius:'50%',background:'#6effc6',flexShrink:0 }}/>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ ...fadeUp('coverage',.3),background:'linear-gradient(135deg,rgba(13,53,96,.9),rgba(7,21,40,.9))',borderRadius:16,padding:'32px 36px',display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid rgba(186,221,255,.15)',backdropFilter:'blur(10px)' }}>
            <div>
              <h3 style={{ fontSize:20,fontWeight:800,margin:'0 0 6px' }}>Don&apos;t see your area?</h3>
              <p style={{ fontSize:14,color:'#9fb0c8',margin:0 }}>We prioritize expansion based on user requests.</p>
            </div>
            <button onClick={() => snap('contact')} style={{ background:'linear-gradient(120deg,#168df4,#1bd9ef)',color:'#fff',border:0,borderRadius:10,padding:'13px 26px',fontSize:13,fontWeight:800,cursor:'pointer',flexShrink:0,boxShadow:'0 6px 24px rgba(22,141,244,.35)' }}>Request Coverage →</button>
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: OFFERS â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="offers" className="snap" style={{ background:'#030f26',padding:'0 8vw' }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 80% 30%,rgba(124,58,237,.07) 0%,transparent 50%)' }} />
        <div style={{ maxWidth:1200,width:'100%',margin:'0 auto',position:'relative' }}>
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <p style={{ ...fadeUp('offers',0),fontSize:10,color:'#6de5ff',letterSpacing:'.22em',fontWeight:800,margin:'0 0 14px',textTransform:'uppercase',display:'block' }}>Exclusive Deals</p>
            <h2 style={{ ...fadeUp('offers',.1),fontSize:'clamp(38px,4.8vw,62px)',fontWeight:800,lineHeight:1.07,margin:'0 0 14px',letterSpacing:'-.055em',display:'block' }}>Special <em style={{ fontStyle:'normal',color:'#a78bfa' }}>Offers.</em></h2>
            <p style={{ ...fadeUp('offers',.2),fontSize:16,color:'#9fb0c8',maxWidth:540,margin:'0 auto',display:'block' }}>Save more with our current promotions and exclusive deals.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22 }}>
            {OFFERS.map((o,i) => (
              <div key={o.title} className="offer-card" style={{ ...fadeUp('offers',i*.1),background:o.bg,borderRadius:20,padding:'34px 28px',position:'relative',overflow:'hidden',border:'1px solid rgba(255,255,255,.08)',display:'block' }}>
                <div style={{ position:'absolute',top:-28,right:-28,fontSize:120,opacity:.06,lineHeight:1 }}>🎁</div>
                <h3 style={{ fontSize:20,fontWeight:800,marginBottom:12,color:'#fff',position:'relative',lineHeight:1.3 }}>{o.title}</h3>
                <p style={{ fontSize:14,color:'rgba(255,255,255,.78)',lineHeight:1.7,marginBottom:22,position:'relative' }}>{o.desc}</p>
                <div style={{ background:'rgba(0,0,0,.35)',padding:'11px 16px',borderRadius:10,display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,position:'relative' }}>
                  <span style={{ fontSize:11,color:'rgba(255,255,255,.55)',fontWeight:700,letterSpacing:'.08em' }}>PROMO CODE</span>
                  <span style={{ fontSize:17,fontWeight:800,color:'#fff',letterSpacing:'2px' }}>{o.code}</span>
                </div>
                <p style={{ fontSize:11,color:'rgba(255,255,255,.45)',position:'relative',margin:0 }}>{o.valid}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â• SECTION: CONTACT â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="contact" className="snap" style={{ background:'radial-gradient(ellipse at 50% 0%,#08254d 0%,#030f26 60%)',padding:'0 8vw' }}>
        <div style={{ maxWidth:1200,width:'100%',margin:'0 auto',display:'grid',gridTemplateColumns:'1.1fr .9fr',gap:80,alignItems:'center' }}>
          <div>
            <p style={{ ...fadeLeft('contact',0),fontSize:10,color:'#6de5ff',letterSpacing:'.22em',fontWeight:800,margin:'0 0 18px',textTransform:'uppercase',display:'block' }}>Get In Touch</p>
            <h2 style={{ ...fadeLeft('contact',.1),fontSize:'clamp(38px,4.8vw,62px)',fontWeight:800,lineHeight:1.05,margin:'0 0 20px',letterSpacing:'-.055em',display:'block' }}>We&apos;re here<br/><em style={{ fontStyle:'normal',color:'#6de5ff' }}>to help.</em></h2>
            <p style={{ ...fadeLeft('contact',.2),fontSize:16,color:'rgba(210,222,237,.75)',lineHeight:1.8,marginBottom:32,display:'block' }}>Have a question or need support? Fill the form and we&apos;ll get back to you soon.</p>
            <div style={{ display:'grid',gap:14 }}>
              {[{icon:'📞',label:'Call (24/7)',value:'01712345678'},{icon:'📧',label:'Email',value:'support@sheikhonline.com'},{icon:'🏢',label:'Address',value:'123 Internet St, Dhaka 1200'}].map((c,i) => (
                <div key={c.label} style={{ ...scaleIn('contact',i*.08),display:'flex',alignItems:'center',gap:14,background:'rgba(10,25,56,.7)',border:'1px solid rgba(186,221,255,.1)',borderRadius:12,padding:'14px 18px',backdropFilter:'blur(10px)' }}>
                  <span style={{ fontSize:22,flexShrink:0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize:10,color:'#9fb0c8',fontWeight:700,letterSpacing:'.06em',marginBottom:2 }}>{c.label}</div>
                    <div style={{ fontSize:14,fontWeight:700 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...fadeRight('contact',.1) }}>
            <form onSubmit={handleSubmit} style={{ display:'grid',gap:13 }}>
              <input required type="text"  placeholder="Your Full Name" value={form.name}    onChange={e => setForm({...form,name:e.target.value})}    style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(186,221,255,.12)',borderRadius:10,padding:'14px 18px',color:'#f8fafc',fontSize:14,transition:'border .2s',width:'100%' }} />
              <input required type="tel"   placeholder="Phone Number"   value={form.phone}   onChange={e => setForm({...form,phone:e.target.value})}   style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(186,221,255,.12)',borderRadius:10,padding:'14px 18px',color:'#f8fafc',fontSize:14,transition:'border .2s',width:'100%' }} />
              <input          type="email" placeholder="Email (Optional)"value={form.email}   onChange={e => setForm({...form,email:e.target.value})}   style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(186,221,255,.12)',borderRadius:10,padding:'14px 18px',color:'#f8fafc',fontSize:14,transition:'border .2s',width:'100%' }} />
              <textarea required placeholder="Your Message" rows={4} value={form.message} onChange={e => setForm({...form,message:e.target.value})} style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(186,221,255,.12)',borderRadius:10,padding:'14px 18px',color:'#f8fafc',fontSize:14,resize:'vertical',width:'100%',transition:'border .2s' }} />
              <button type="submit" style={{ background:'linear-gradient(120deg,#168df4,#1bd9ef)',color:'#fff',border:0,borderRadius:10,padding:'15px',fontSize:14,fontWeight:800,cursor:'pointer',boxShadow:'0 8px 30px rgba(22,141,244,.35)' }}>Send Message →</button>
              {fStatus && <p style={{ fontSize:14,color:'#6effc6',margin:0,textAlign:'center' }}>{fStatus}</p>}
            </form>
          </div>
        </div>

        {/* Footer bar */}
        <div style={{ position:'absolute',bottom:0,left:0,right:0,padding:'18px 8vw',borderTop:'1px solid rgba(186,221,255,.08)',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <p style={{ margin:0,fontSize:12,color:'rgba(159,176,200,.55)' }}>© {new Date().getFullYear()} Sheikh Online Service. All rights reserved.</p>
          <div style={{ display:'flex',gap:18 }}>
            {NAV_LABELS.map((l,i) => <button key={l} onClick={() => snap(SECTIONS[i])} style={{ background:'none',border:0,cursor:'pointer',color:'rgba(159,176,200,.55)',fontSize:12,padding:0,transition:'color .2s' }} onMouseEnter={e => e.target.style.color='#6de5ff'} onMouseLeave={e => e.target.style.color='rgba(159,176,200,.55)'}>{l}</button>)}
          </div>
        </div>
      </section>
    </>
  );
}

