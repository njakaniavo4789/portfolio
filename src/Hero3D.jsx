import { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import {
  Search, Menu, BarChart2, User, ChevronLeft, ChevronRight,
  Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X,
  MapPin, Mail, Phone, ArrowRight
} from 'lucide-react';

/* ============================================================
   STYLE GLOBAL — Design Njaka Niavo Portfolio
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

:root{
  --void:#000; --paper:#fff; --carbon:#0a0a0a;
  --ash:#b4b4b4; --slate:#6e6e6e; --hair:rgba(255,255,255,.12);
  --ease:cubic-bezier(.2,.8,.2,1);
  --blue:#2b5cff; --blue-glow:rgba(43,92,255,.4);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background:var(--void);color:var(--paper);
  font-family:Inter,system-ui,-apple-system,sans-serif;
  -webkit-font-smoothing:antialiased;
}
.bebas{font-family:'Bebas Neue',Impact,Haettenschweiler,sans-serif;letter-spacing:.015em}
.serif{font-family:'Playfair Display', serif;}
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:2px}

/* Grain overlay */
.grain{
  position:fixed;inset:-150%;z-index:95;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity:.12;mix-blend-mode:overlay;animation:grain 700ms steps(3) infinite;
}
@keyframes grain{
  0%{transform:translate(0,0)}25%{transform:translate(-3%,2%)}
  50%{transform:translate(2%,-3%)}75%{transform:translate(-2%,-2%)}100%{transform:translate(3%,1%)}
}

/* Vignette */
.vignette{
  position:fixed;inset:0;z-index:94;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 45%,transparent 35%,rgba(0,0,0,.5) 78%,#000 100%);
}

/* Custom cursor */
.lens{
  position:fixed;top:0;left:0;z-index:96;pointer-events:none;
  width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:999px;
  backdrop-filter:invert(1);-webkit-backdrop-filter:invert(1);
  transition:width .25s var(--ease),height .25s var(--ease),margin .25s var(--ease);
}
.lens.big{width:84px;height:84px;margin:-42px 0 0 -42px}
.dot{
  position:fixed;top:0;left:0;z-index:97;pointer-events:none;
  width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:999px;background:#fff;mix-blend-mode:difference;
}
@media (pointer:coarse){.lens,.dot{display:none}}

/* Animations */
@keyframes barGrow{0%{transform:scaleY(0)}100%{transform:scaleY(1)}}
@keyframes barConverge{0%{transform:translateX(0)}100%{transform:translateX(var(--to))}}
@keyframes barFall{0%{transform:scaleY(1);opacity:1}100%{transform:scaleY(0);opacity:0}}
@keyframes flash{0%{opacity:0}12%{opacity:1}100%{opacity:0}}
@keyframes wordIn{
  0%{opacity:0;transform:translateY(38%) scaleY(1.7);filter:blur(10px)}
  100%{opacity:1;transform:none;filter:none}
}
@keyframes sweep{0%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@keyframes zoomOut{0%{transform:scale(1);opacity:1}100%{transform:scale(1.35);opacity:0}}
@keyframes curtain{0%{transform:translateY(0)}100%{transform:translateY(-101%)}}
@keyframes kenburns{0%{transform:scale(1)}100%{transform:scale(1.12)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
@keyframes pulse-soft{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes blink{50%{opacity:0}}
.caret{animation:blink 1s steps(1) infinite}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.marquee{animation:marquee 32s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{animation:spin .9s linear infinite}

/* Intro cinematic */
@keyframes introSweep{0%{transform:translateX(-130%)}100%{transform:translateX(500%)}}
@keyframes introPulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.15);opacity:1}}
@keyframes introLogoIn{0%{opacity:0;transform:scale(0.6) rotate(-15deg);filter:blur(20px)}60%{opacity:1;transform:scale(1.05) rotate(3deg);filter:blur(0)}100%{opacity:1;transform:scale(1) rotate(0);filter:blur(0)}}
@keyframes introRing{0%{transform:scale(0.5);opacity:1;border-width:3px}100%{transform:scale(2.5);opacity:0;border-width:0.5px}}
@keyframes introGlitch1{0%{transform:translate(3px,-2px)}50%{transform:translate(-3px,2px)}100%{transform:translate(2px,-1px)}}
@keyframes introGlitch2{0%{transform:translate(-2px,3px)}50%{transform:translate(2px,-3px)}100%{transform:translate(-1px,2px)}}
@keyframes introGlitchOut{0%{opacity:1;transform:scale(1);filter:none}20%{opacity:1;transform:scale(1.02) skewX(3deg);filter:hue-rotate(90deg)}40%{opacity:0.8;transform:scale(0.98) skewX(-5deg);filter:hue-rotate(180deg) blur(2px)}60%{opacity:0.5;transform:scale(1.1) skewX(8deg);filter:hue-rotate(270deg) blur(4px)}100%{opacity:0;transform:scale(1.5);filter:blur(20px)}}
@keyframes introLetterIn{0%{opacity:0;transform:translateY(40px) scaleY(1.5);filter:blur(8px)}100%{opacity:1;transform:none;filter:none}}
@keyframes introFadeUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:none}}
@keyframes introCurtainUp{0%{transform:translateY(0)}100%{transform:translateY(-101%)}}
@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes heroScan{0%{top:-2px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}

/* Hero layout */
.hero-container {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  background: #000;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #0a0014 0%, #000 50%, #000a1a 100%);
}
.hero-image-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-image {
  width: 65%;
  height: 85%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 80px rgba(43,92,255,.15);
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.15) brightness(0.85);
}
.hero-blue-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent 45%, rgba(43,92,255,0.45) 45%, rgba(43,92,255,0.45) 55%, transparent 55%);
  mix-blend-mode: screen;
  pointer-events: none;
}
.hero-side-lines {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}
.hero-side-lines .line {
  width: 36px;
  height: 2px;
  background: rgba(255,255,255,0.5);
}
.hero-side-lines .line.short {
  width: 16px;
  background: var(--blue);
}
.hero-vertical-text {
  position: absolute;
  right: 3%;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-size: clamp(3rem, 10vw, 9rem);
  line-height: 0.8;
  color: rgba(255,255,255,0.85);
  mix-blend-mode: overlay;
  font-weight: 700;
  letter-spacing: -0.02em;
  pointer-events: none;
  white-space: nowrap;
  font-family: 'Playfair Display', serif;
}
.hero-number {
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 700;
  color: rgba(255,255,255,0.15);
  position: absolute;
  left: 5%;
  top: 18%;
  font-family: 'Playfair Display', serif;
}
.hero-dots {
  position: absolute;
  bottom: 18%;
  right: 8%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  z-index: 10;
}
.hero-dot {
  width: 5px; height: 5px;
  background: rgba(43,92,255,0.7);
  border-radius: 50%;
  animation: pulse-soft 2s ease-in-out infinite;
}
.hero-dot:nth-child(odd) { animation-delay: 0.5s; }
.hero-explore-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--blue);
  color: #fff;
  padding: 14px 44px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 11px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
  font-family: 'Inter', sans-serif;
}
.hero-explore-btn:hover {
  background: #1a4ae0;
  box-shadow: 0 0 40px var(--blue-glow);
  transform: translate(-50%, -50%) scale(1.05);
}
.hero-bottom-bar {
  position: absolute;
  bottom: 36px;
  left: 5%;
  right: 5%;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 10;
  color: #fff;
}
.hero-bottom-bar .counter {
  font-size: 12px;
  letter-spacing: 3px;
  font-family: 'Inter', sans-serif;
}
.hero-bottom-bar .progress-track {
  width: 80px;
  height: 2px;
  background: rgba(255,255,255,0.2);
  position: relative;
}
.hero-bottom-bar .progress-fill {
  position: absolute;
  left: 0; top: 0; height: 100%;
  width: 25%;
  background: var(--blue);
  transition: width 0.5s ease;
}
.hero-bottom-bar .nav-arrows {
  display: flex;
  gap: 12px;
}
.hero-bottom-bar .nav-arrows button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.3);
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.hero-bottom-bar .nav-arrows button:hover {
  background: var(--blue);
  border-color: var(--blue);
}
.hero-nav {
  position: absolute;
  top: 0; left: 0; right: 0;
  padding: 28px 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 30;
  color: #fff;
}
.hero-nav .logo {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 1px;
}
.hero-nav .logo span { color: var(--blue); }
.hero-nav .nav-center {
  display: flex;
  gap: 32px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.7;
}
.hero-nav .nav-center a {
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s;
}
.hero-nav .nav-center a:hover { opacity: 1; }
.hero-nav .nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-nav .nav-right button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.hero-nav .nav-right button:hover { opacity: 1; }
.hero-nav .menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.hero-gradient-bottom {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 200px;
  background: linear-gradient(to top, #000, transparent);
  pointer-events: none;
  z-index: 5;
}

/* Ticker */
.ticker-container {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--hair);
  border-bottom: 1px solid var(--hair);
  padding: 14px 0;
  user-select: none;
}
.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 40s linear infinite;
}
.ticker-item {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  color: rgba(255,255,255,0.25);
  padding: 0 28px;
  letter-spacing: 2px;
}
.ticker-item span { color: rgba(255,255,255,0.1); margin-left: 28px; }

/* Sections */
.section-header {
  margin-bottom: 48px;
}
.section-header .label {
  color: var(--blue);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 12px;
  font-weight: 500;
}
.section-header h2 {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: clamp(2rem, 4vw, 3.5rem);
}
.section-header .line {
  width: 60px;
  height: 1px;
  background: var(--blue);
  margin-top: 20px;
}

/* Cards grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.portfolio-card {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  cursor: pointer;
  group: true;
}
.portfolio-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}
.portfolio-card:hover img { transform: scale(1.1); }
.portfolio-card .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent);
  opacity: 0.6;
  transition: opacity 0.5s;
}
.portfolio-card:hover .overlay { opacity: 0.9; }
.portfolio-card .card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  transform: translateY(16px);
  transition: transform 0.5s;
}
.portfolio-card:hover .card-content { transform: translateY(0); }
.portfolio-card .card-category {
  color: var(--blue);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 4px;
}
.portfolio-card .card-title {
  font-size: 18px;
  font-weight: 500;
}

/* About */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
}
.skill-bar {
  margin-bottom: 24px;
}
.skill-bar .skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.skill-bar .skill-name {
  font-size: 13px;
  color: rgba(255,255,255,0.7);
}
.skill-bar .skill-level {
  font-size: 13px;
  color: var(--blue);
}
.skill-bar .bar-track {
  height: 2px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.skill-bar .bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--blue), #8a2be2);
  transition: width 1s ease;
}

/* Contact */
.contact-form { max-width: 700px; margin: 0 auto; }
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 600px) {
  .form-row { grid-template-columns: 1fr; }
}
.form-group { margin-bottom: 24px; }
.form-group label {
  display: block;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 14px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: border-color 0.3s;
}
.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255,255,255,0.3);
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--blue);
}
.form-group textarea { resize: none; }
.submit-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s;
}
.submit-btn:hover {
  background: #1a4ae0;
  box-shadow: 0 0 30px var(--blue-glow);
}

/* Footer */
.site-footer {
  padding: 48px 24px;
  border-top: 1px solid var(--hair);
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-logo {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 22px;
}
.footer-logo span { color: var(--blue); }
.footer-copy {
  color: rgba(255,255,255,0.3);
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-image { width: 85%; }
  .hero-vertical-text { display: none; }
  .hero-nav { padding: 20px; }
  .hero-nav .nav-center { display: none; }
  .hero-bottom-bar { left: 20px; right: 20px; bottom: 24px; }
}
`;

function GlobalStyle() {
  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return null;
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function Atmosphere() {
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

function Lens() {
  const lens = useRef(null);
  const dot = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(pointer:coarse)').matches) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, lx = x, ly = y, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      lens.current?.classList.toggle('big', Boolean(e.target.closest?.('[data-lens="big"]')));
    };
    const loop = () => {
      lx += (x - lx) * 0.18; ly += (y - ly) * 0.18;
      if (lens.current) lens.current.style.transform = `translate(${lx}px,${ly}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={lens} className="lens" aria-hidden /><div ref={dot} className="dot" aria-hidden /></>);
}

/* ============================================================
   INTRO — Netflix-Style Cinematic
   ============================================================ */

const PARTICLE_COUNT = 60;

function Particles({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 140, 255, ${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />;
}

function Intro({ onDone }) {
  const [phase, setPhase] = useState(0);
  // 0: particles + dark
  // 1: flash sweep
  // 2: logo N appears (cinematic)
  // 3: logo glitch + dissolve
  // 4: name typewriter
  // 5: tagline fade
  // 6: curtain out

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 800),    // flash
      setTimeout(() => setPhase(2), 1400),    // logo
      setTimeout(() => setPhase(3), 3200),    // glitch dissolve
      setTimeout(() => setPhase(4), 4000),    // name
      setTimeout(() => setPhase(5), 5200),    // tagline
      setTimeout(() => setPhase(6), 6200),    // curtain out
      setTimeout(onDone, 7000),
    ];
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Particles */}
      <Particles active={phase >= 0 && phase < 4} />

      {/* Gradient mesh background */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ 
          opacity: phase >= 1 && phase < 4 ? 0.4 : 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(43,92,255,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.1) 0%, transparent 60%)'
        }}
      />

      {/* Phase 1: Flash sweep */}
      {phase === 1 && (
        <div className="absolute inset-0 z-20">
          <div 
            className="absolute inset-y-0 w-[40%]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(100,150,255,0.6), transparent)',
              animation: 'introSweep 0.9s cubic-bezier(.4,0,.2,1) forwards',
            }}
          />
        </div>
      )}

      {/* Phase 2: Logo N cinematic */}
      {phase >= 2 && phase < 3 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          {/* Glow behind N */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(43,92,255,0.3) 0%, rgba(43,92,255,0.05) 50%, transparent 70%)',
              animation: 'introPulse 2s ease-in-out infinite',
            }}
          />
          {/* The N */}
          <div className="relative" style={{ animation: 'introLogoIn 1.2s cubic-bezier(.2,.8,.2,1) forwards' }}>
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="nGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2b5cff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#2b5cff" />
                </linearGradient>
                <filter id="nGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <text 
                x="100" y="155" 
                textAnchor="middle" 
                fontFamily="'Playfair Display', serif" 
                fontWeight="700" 
                fontStyle="italic"
                fontSize="180" 
                fill="url(#nGrad)" 
                filter="url(#nGlow)"
              >
                N
              </text>
            </svg>
            {/* Ring pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-blue-500/30" style={{ animation: 'introRing 1.5s ease-out forwards' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-purple-500/20" style={{ animation: 'introRing 1.5s ease-out 0.3s forwards' }} />
            </div>
          </div>
        </div>
      )}

      {/* Phase 3: Glitch + dissolve */}
      {phase === 3 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ animation: 'introGlitchOut 0.8s ease forwards' }}>
          <div className="relative">
            {/* Glitch copies */}
            <div className="absolute inset-0" style={{ animation: 'introGlitch1 0.15s steps(2) infinite', color: '#ff0040', opacity: 0.7 }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <text x="100" y="155" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontStyle="italic" fontSize="180" fill="#ff0040">N</text>
              </svg>
            </div>
            <div className="absolute inset-0" style={{ animation: 'introGlitch2 0.15s steps(2) infinite', color: '#00d4ff', opacity: 0.7 }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <text x="100" y="155" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontStyle="italic" fontSize="180" fill="#00d4ff">N</text>
              </svg>
            </div>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="nGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2b5cff" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <text x="100" y="155" textAnchor="middle" fontFamily="'Playfair Display', serif" fontWeight="700" fontStyle="italic" fontSize="180" fill="url(#nGrad2)">N</text>
            </svg>
          </div>
        </div>
      )}

      {/* Phase 4: Name typewriter */}
      {phase >= 4 && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center">
          <div className="relative overflow-hidden">
            <h1 
              className="serif italic text-white text-[12vw] md:text-[8vw] leading-none"
              style={{ animation: 'introFadeUp 0.8s cubic-bezier(.2,.8,.2,1) forwards', opacity: 0 }}
            >
              {'Njaka'.split('').map((l, i) => (
                <span 
                  key={i} 
                  style={{ 
                    display: 'inline-block',
                    animation: `introLetterIn 0.5s cubic-bezier(.2,.8,.2,1) ${i * 0.08}s both`,
                  }}
                >
                  {l}
                </span>
              ))}
              <span 
                className="text-blue-500"
                style={{ 
                  display: 'inline-block',
                  animation: 'introLetterIn 0.5s cubic-bezier(.2,.8,.2,1) 0.4s both',
                }}
              >.</span>
            </h1>
            {/* Sweep line */}
            <div 
              className="absolute inset-y-0 w-1/4 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                animation: 'introSweep 0.8s cubic-bezier(.4,0,.2,1) 0.3s both',
              }}
            />
          </div>
          {/* Subtitle */}
          {phase >= 5 && (
            <p 
              className="text-white/40 text-xs md:text-sm tracking-[0.4em] uppercase mt-6"
              style={{ animation: 'introFadeUp 0.6s cubic-bezier(.2,.8,.2,1) forwards', opacity: 0 }}
            >
              Developer & AI Engineer
            </p>
          )}
        </div>
      )}

      {/* Phase 6: Curtain out */}
      {phase === 6 && (
        <div className="absolute inset-0 z-50" style={{ animation: 'introCurtainUp 0.8s cubic-bezier(.7,0,.2,1) forwards' }}>
          <div className="w-full h-full bg-black" />
        </div>
      )}

      {/* Skip button */}
      <div className="absolute bottom-10 inset-x-0 flex items-center justify-center z-[60]">
        <button 
          onClick={onDone} 
          className="text-[11px] tracking-[.35em] text-white/30 hover:text-white transition-colors duration-300"
          style={{ animation: 'introFadeUp 0.5s ease 1s both', opacity: 0 }}
        >
          Passer
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar({ sound, onSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const sections = ['portfolio', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`hero-nav transition-all duration-500 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ padding: scrolled ? '16px 44px' : '28px 44px' }}
    >
      <a href="#top" className="logo" data-lens="big">
        Njaka<span>.</span>
      </a>
      <div className="nav-center hidden md:flex">
        {[
          { id: 'portfolio', label: 'Projects' },
          { id: 'about', label: 'About' },
          { id: 'contact', label: 'Contact' },
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={scrollTo(item.id)}
            className={`transition-colors duration-300 ${
              activeSection === item.id ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ============================================================
   HERO BILLBOARD — Tech & Development
   ============================================================ */

const slides = [
  { 
    id: 1, 
    title: 'INTELLIGENCE\nARTIFICIELLE', 
    category: 'AI & Machine Learning', 
    num: '01.', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1976&auto=format&fit=crop',
    color: '#8b5cf6',
    tags: ['Python', 'LangChain', 'OpenAI', 'Neural Networks'],
  },
  { 
    id: 2, 
    title: 'FULL-STACK\nDEVELOPMENT', 
    category: 'Web & Applications', 
    num: '02.', 
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1976&auto=format&fit=crop',
    color: '#3b82f6',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  { 
    id: 3, 
    title: 'CLOUD &\nDEVOPS', 
    category: 'Infrastructure & Scalabilité', 
    num: '03.', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1976&auto=format&fit=crop',
    color: '#10b981',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  },
];

function FloatingCode({ delay = 0 }) {
  return (
    <div 
      className="absolute pointer-events-none select-none font-mono text-[10px] text-blue-500/20 whitespace-pre"
      style={{ 
        animation: `heroFloat 8s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        top: `${20 + Math.random() * 60}%`,
        left: `${5 + Math.random() * 85}%`,
      }}
    >
      {[
        'const ai = new NeuralNet();',
        'await model.train(data);',
        'export default App;',
        'docker compose up -d;',
        'kubectl scale --replicas=5',
        'git push origin main',
        'npm run build && deploy',
        'SELECT * FROM projects;',
        'terraform apply -auto-approve',
        'pip install transformers',
      ][Math.floor(delay * 3)]}
    </div>
  );
}

function Billboard({ onExplore, sound, onSound }) {
  const [current, setCurrent] = useState(0);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const wrap = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const move = (e) => {
      const r = node.getBoundingClientRect();
      setOff({
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      });
    };
    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, []);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((v) => (v + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (index) => {
    clearInterval(timerRef.current);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((v) => (v + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 6000);
  };

  const slide = slides[current];

  return (
    <header ref={wrap} id="top" className="hero-container">
      <div className="hero-bg" />

      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at ${50 + off.x * 20}% ${50 + off.y * 20}%, ${slide.color}15 0%, transparent 50%)`,
        }}
      />

      {/* Navigation */}
      <Navbar sound={sound} onSound={onSound} />

      {/* Floating code snippets */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-60">
        {[...Array(10)].map((_, i) => (
          <FloatingCode key={i} delay={i * 0.8} />
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left — Text */}
          <div className="relative z-20">
            {/* Category pill */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8 transition-all duration-700 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.color }} />
              <span className="text-[11px] text-white/60 tracking-wider uppercase font-medium">{slide.category}</span>
            </div>

            {/* Big title */}
            <h1 
              className={`font-bold text-white leading-[0.85] mb-8 transition-all duration-700 delay-100 ${
                isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
              }`}
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                textShadow: `0 0 80px ${slide.color}30`,
              }}
            >
              {slide.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-white/30">{line}</span>
                  ) : line}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p 
              className={`text-white/40 text-sm md:text-base leading-relaxed max-w-md mb-8 transition-all duration-700 delay-200 ${
                isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
              }`}
            >
              Développeur full-stack & AI Engineer. Je crée des solutions innovantes 
              qui allient intelligence artificielle, performance et design immersif.
            </p>

            {/* Tags */}
            <div 
              className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-300 ${
                isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
              }`}
            >
              {slide.tags.map((tag, i) => (
                <span 
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-300"
                  style={{ 
                    background: `${slide.color}10`,
                    borderColor: `${slide.color}25`,
                    color: `${slide.color}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Hero image with effects */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div 
              className={`relative transition-all duration-700 ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${off.x * 5}deg) rotateX(${-off.y * 5}deg)`,
              }}
            >
              {/* Glow behind image */}
              <div 
                className="absolute -inset-20 rounded-full blur-[100px] transition-all duration-1000"
                style={{ background: `${slide.color}20` }}
              />

              {/* Main image */}
              <div className="relative w-[420px] h-[520px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ 
                    transform: `scale(1.1) translate(${off.x * 10}px, ${off.y * 10}px)`,
                    filter: 'grayscale(30%) contrast(1.1)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${slide.color}20, transparent)` }} />
                
                {/* Scan line effect */}
                <div 
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${slide.color}60, transparent)`,
                    animation: 'heroScan 3s linear infinite',
                  }}
                />

                {/* Bottom info on image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-white/20 serif">{slide.num}</span>
                    <div className="h-[1px] flex-1 bg-white/10" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.color }} />
                      <span className="text-[10px] text-white/40 tracking-wider uppercase">Disponible pour projets</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats cards */}
              <div 
                className="absolute -top-6 -right-6 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl"
                style={{ animation: 'heroFloat 4s ease-in-out infinite' }}
              >
                <p className="text-[10px] text-white/40 mb-1">Projets livrés</p>
                <p className="text-xl font-bold text-white">24<span className="text-blue-500">+</span></p>
              </div>

              <div 
                className="absolute -bottom-4 -left-6 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl"
                style={{ animation: 'heroFloat 4s ease-in-out infinite 1s' }}
              >
                <p className="text-[10px] text-white/40 mb-1">Satisfaction client</p>
                <p className="text-xl font-bold text-white">98<span className="text-green-500">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side decorative */}
      <div className="hero-side-lines">
        <span className="line short" />
        <span className="line" />
        <span className="line" />
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom-bar">
        <div className="flex items-center gap-4">
          {slides.map((s, i) => (
            <button 
              key={s.id}
              onClick={() => goTo(i)}
              className="flex items-center gap-2 group"
            >
              <div 
                className={`h-[2px] transition-all duration-500 ${
                  i === current ? 'w-12' : 'w-6 group-hover:w-8'
                }`}
                style={{ background: i === current ? s.color : 'rgba(255,255,255,0.2)' }}
              />
              <span className={`text-[10px] transition-colors ${i === current ? 'text-white' : 'text-white/30'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] text-white/30 tracking-widest">{slide.category}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
        <span className="text-[9px] text-white/30 tracking-widest uppercase">Scroll</span>
      </div>

      <div className="hero-gradient-bottom" />
    </header>
  );
}

/* ============================================================
   TICKER
   ============================================================ */

function Ticker() {
  const words = ['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'Tailwind', 'Docker', 'AWS', 'AI/ML', 'TensorFlow', 'PostgreSQL', 'GraphQL'];
  const line = [...words, ...words];
  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {line.map((w, i) => (
              <span key={`${k}-${i}`} className="ticker-item">
                {w}<span>/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   EXPORT
   ============================================================ */

export default function Hero3D({ onEnter }) {
  const [intro, setIntro] = useState(true);
  const [sound, setSound] = useState(false);

  const handleIntroDone = useCallback(() => {
    setIntro(false);
    onEnter?.();
  }, [onEnter]);

  const toggleSound = useCallback(() => setSound(v => !v), []);

  return (
    <div>
      <GlobalStyle />
      <Atmosphere />
      <Lens />

      {intro && <Intro onDone={handleIntroDone} />}

      {!intro && (
        <>
          <Billboard
            onExplore={() => {}}
            sound={sound}
            onSound={toggleSound}
          />
          <div style={{ position: 'relative', zIndex: 20, marginTop: '-96px' }}>
            <Ticker />
          </div>
        </>
      )}
    </div>
  );
}
