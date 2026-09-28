import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TabletDevice({ customTabs, customContent, className = '' }) {
  const [activeTab, setActiveTab] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [bootPhase, setBootPhase] = useState(0);
  const [booting, setBooting] = useState(true);
  const tabletRef = useRef(null);

  const defaultTabs = [
    { label: 'Histoire', key: 'story' },
    { label: 'Mission', key: 'mission' },
    { label: 'Équipe', key: 'team' },
    { label: 'Valeurs', key: 'values' },
  ];

  const defaultContent = {
    story: {
      title: 'Mon parcours',
      text: "Né à Madagascar et basé à Abidjan, j'ai découvert ma passion pour le code à travers la création de sites web pour des associations locales. Aujourd'hui, je construis des systèmes IA et des applications web à fort impact.",
    },
    mission: {
      title: 'Ma mission',
      text: "Démocratiser l'accès à la technologie en Afrique en créant des outils intelligents, accessibles et performants. Transformer les idées en solutions concrètes qui changent des vies.",
    },
    team: {
      title: 'Mon équipe',
      text: "Développeur full-stack & AI Engineer. Je collabore avec des designers, data scientists et entrepreneurs pour donner vie à des projets innovants du continent et au-delà.",
    },
    values: {
      title: 'Mes valeurs',
      text: "Innovation responsable. Code propre. Impact social. Transparence. Chaque ligne de code que j'écris a un but — résoudre un vrai problème pour de vraies personnes.",
    },
  };

  const tabs = customTabs || defaultTabs;
  const tabContent = customContent || defaultContent;

  useEffect(() => {
    const timer1 = setTimeout(() => setBootPhase(1), 400);
    const timer2 = setTimeout(() => setBootPhase(2), 900);
    const timer3 = setTimeout(() => setBootPhase(3), 1400);
    const timer4 = setTimeout(() => { setBootPhase(4); setBooting(false); }, 1900);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
  }, []);

  const handleMouseMove = (e) => {
    if (!tabletRef.current) return;
    const rect = tabletRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const current = tabContent[tabs[activeTab].key];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex justify-center ${className}`}
    >
      <div
        ref={tabletRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[320px] sm:w-[380px] cursor-default"
        style={{ perspective: 900 }}
      >
        {/* Glow */}
        <div className="absolute -inset-20 bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Tablet body */}
        <div
          className="relative rounded-[1.8rem] bg-[#111] border-[3px] border-gray-700/80 shadow-2xl overflow-hidden transition-transform duration-200 ease-out"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
          {/* Screen */}
          <div className="relative aspect-[4/3] p-4 sm:p-5 flex flex-col" style={{ background: 'linear-gradient(145deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)' }}>

            {/* === BOOT SEQUENCE === */}
            {booting && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#0a0e1a] z-20 p-6">
                {/* Phase 0: Logo */}
                {bootPhase === 0 && (
                  <div className="text-center animate-[modalIn_.3s_ease_both]">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-lg font-bold">NJ</span>
                    </div>
                    <p className="text-white text-xs font-semibold tracking-wide">NJAKA</p>
                  </div>
                )}

                {/* Phase 1: Code lines */}
                {bootPhase === 1 && (
                  <div className="w-full space-y-2 text-left animate-[modalIn_.3s_ease_both]">
                    {['const dev = new NjakaEngine();', 'await dev.initialize();', 'loadSkills(["React","AI","Cloud"]);', 'dev.startPortfolio();'].map((line, i) => (
                      <p key={i} className="text-green-400/80 text-[10px] font-mono" style={{ opacity: 0, animation: `modalIn .3s ease ${i * 0.1}s forwards` }}>{line}</p>
                    ))}
                  </div>
                )}

                {/* Phase 2: Progress */}
                {bootPhase === 2 && (
                  <div className="w-full max-w-[200px] animate-[modalIn_.3s_ease_both]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">NJ</span>
                      </div>
                      <span className="text-white text-[10px] font-semibold">NJAKA OS</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ animation: 'bootProgress 0.8s ease forwards' }} />
                    </div>
                    <p className="text-white/40 text-[9px] mt-2 text-center">Chargement du système...</p>
                  </div>
                )}

                {/* Phase 3: Ready */}
                {bootPhase === 3 && (
                  <div className="text-center animate-[modalIn_.3s_ease_both]">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-green-400 text-[10px] font-semibold">Prêt</p>
                  </div>
                )}
              </div>
            )}

            {/* === MAIN CONTENT === */}
            {!booting && (
              <div className="flex-1 flex flex-col animate-[modalIn_.5s_ease_both]">
                {/* Tab bar */}
                <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(i)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all duration-300 ${
                        activeTab === i
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Content area */}
                <div className="flex-1 bg-white/[0.03] rounded-xl border border-white/5 p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <h3 className="text-white text-xs font-semibold">{current.title}</h3>
                  </div>
                  <p className="text-white/50 text-[11px] leading-relaxed flex-1">{current.text}</p>

                  {/* Bottom stats */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-green-400 text-[9px]">En ligne</span>
                    </div>
                    <span className="text-white/20 text-[9px]">Njaka Niavo</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/15" />
        </div>
      </div>
    </motion.div>
  );
}
