import React, { useState, useRef, useEffect } from 'react';

const AboutPage = () => {
  const [bootPhase, setBootPhase] = useState('off');
  const [activeTab, setActiveTab] = useState('histoire');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const tabletRef = useRef(null);

  const [timelineIndex, setTimelineIndex] = useState(3);
  const [missionProgress, setMissionProgress] = useState(72);
  const [teamSelected, setTeamSelected] = useState(0);
  const [valuesLikes, setValuesLikes] = useState([true, false, true, false]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setBootPhase('logo'), 400),
      setTimeout(() => setBootPhase('transition'), 2200),
      setTimeout(() => setBootPhase('text'), 2800),
      setTimeout(() => setBootPhase('ready'), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const tabs = [
    { id: 'histoire', label: 'Histoire' },
    { id: 'mission', label: 'Mission' },
    { id: 'equipe', label: 'Équipe' },
    { id: 'valeurs', label: 'Valeurs' },
  ];

  const handleMouseMove = (e) => {
    if (!tabletRef.current) return;
    const rect = tabletRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    setRotation({ x: -(mouseY / rect.height) * 8, y: (mouseX / rect.width) * 8 });
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const replayBoot = () => {
    setBootPhase('off');
    setTimeout(() => setBootPhase('logo'), 100);
    setTimeout(() => setBootPhase('transition'), 2000);
    setTimeout(() => setBootPhase('text'), 2600);
    setTimeout(() => setBootPhase('ready'), 6000);
  };

  const isBooting = bootPhase !== 'ready';
  const showLogo = bootPhase === 'logo' || bootPhase === 'transition';
  const showText = bootPhase === 'text';

  const timelineEvents = [
    { year: '2009', title: 'Création', desc: 'Naissance dans un garage' },
    { year: '2014', title: 'Expansion', desc: 'Ouverture en Europe' },
    { year: '2019', title: 'Innovation', desc: 'Lancement de notre IA' },
    { year: '2024', title: 'Mondial', desc: '1M de clients actifs' },
  ];

  const team = [
    { name: 'Alex Martin', role: 'CEO & Fondateur', initials: 'AM', color: 'from-indigo-500 to-purple-600', bio: 'Visionnaire, 15 ans d\'expérience tech.' },
    { name: 'Sarah Dubois', role: 'CTO', initials: 'SD', color: 'from-pink-500 to-rose-600', bio: 'Architecte de notre plateforme IA.' },
    { name: 'Karim Benali', role: 'Créatif', initials: 'KB', color: 'from-cyan-500 to-blue-600', bio: 'Designer primé international.' },
    { name: 'Emma Laurent', role: 'RH', initials: 'EL', color: 'from-emerald-500 to-teal-600', bio: 'Culture & talents chez nous.' },
  ];

  const values = [
    { icon: '✦', title: 'Excellence', desc: 'Le détail fait la différence' },
    { icon: '◆', title: 'Intégrité', desc: 'Transparence totale' },
    { icon: '▲', title: 'Audace', desc: 'Oser pour avancer' },
    { icon: '●', title: 'Solidarité', desc: 'Ensemble on va plus loin' },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="text-center mb-10">
        <p className="text-blue-500 text-xs tracking-[0.3em] uppercase mb-3 font-medium">À propos</p>
        <h2 className="text-4xl md:text-5xl font-serif italic">Mon univers</h2>
      </div>

      <div 
        className="relative"
        style={{ width: '720px', maxWidth: '92vw', perspective: '2000px' }}
      >

        <div 
          ref={tabletRef}
          className="relative transition-transform duration-200 ease-out will-change-transform"
          style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="relative rounded-[2rem] p-[3px] bg-gradient-to-br from-slate-500 via-slate-700 to-slate-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_60px_-10px_rgba(139,92,246,0.5)]">
            <div className="absolute top-[1px] left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            <div className="absolute bottom-[1px] left-[30%] right-[30%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative bg-black rounded-[1.8rem] p-[8px]">
              
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 ring-[1.5px] ring-slate-800/80 relative overflow-hidden">
                  <div className="absolute inset-[1px] rounded-full bg-gradient-to-br from-blue-900 via-slate-950 to-black"></div>
                  <div className="absolute top-[1px] left-[1px] w-[1.5px] h-[1.5px] rounded-full bg-blue-400/90 blur-[0.5px]"></div>
                </div>
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${bootPhase === 'off' ? 'bg-slate-800' : 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.9)]'}`}></div>
              </div>

              <div className="relative bg-black rounded-[1.4rem] overflow-hidden" style={{ height: '480px' }}>
                
                {isBooting && (
                  <div className="absolute inset-0 z-50 bg-black overflow-hidden">
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${showLogo ? (bootPhase === 'transition' ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0') : 'opacity-0 scale-90 pointer-events-none'}`}>
                      <div className="absolute w-56 h-56 bg-indigo-500/40 rounded-full blur-[80px] animate-pulse"></div>
                      <div className="relative flex flex-col items-center">
                        <div 
                          className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/60"
                          style={{ animation: showLogo ? 'logoPop 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none', opacity: showLogo ? 1 : 0 }}
                        >
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/30 to-transparent"></div>
                          <span className="text-white font-bold text-4xl relative z-10">E</span>
                          <div className="absolute -inset-2 rounded-[1.7rem] border border-indigo-400/50 animate-ping"></div>
                          <div className="absolute -inset-4 rounded-[2rem] border border-purple-400/30 animate-ping" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                        <div className="mt-8 overflow-hidden">
                          <p 
                            className="text-white/80 text-xs tracking-[0.4em] font-light"
                            style={{ animation: showLogo ? 'textReveal 1.2s ease-out 0.5s forwards' : 'none', opacity: 0 }}
                          >
                            ENTREPRISE INC.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 flex flex-col items-center justify-center px-12 transition-opacity duration-700 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <div className="text-center space-y-4">
                        <p className={`text-white/40 text-[10px] tracking-[0.4em] uppercase transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.3s' }}>Bienvenue</p>
                        <h2 className={`text-white text-3xl font-bold leading-tight transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.6s' }}>
                          Repoussez vos<br />
                          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">limites</span>
                        </h2>
                        <p className={`text-white/60 text-xs leading-relaxed max-w-xs mx-auto transition-all duration-700 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1s' }}>
                          L'innovation commence par une idée.<br />La nôtre transforme le monde.
                        </p>
                      </div>
                      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-48 transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
                        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" style={{ animation: showText ? 'loadBar 3s ease-out forwards' : 'none' }}></div>
                        </div>
                        <p className="text-white/30 text-[9px] text-center mt-2 tracking-widest">INITIALISATION...</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-[scan_3s_linear_infinite]"></div>
                    </div>
                  </div>
                )}

                <div className={`relative h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-950 to-black transition-opacity duration-700 ${bootPhase === 'ready' ? 'opacity-100' : 'opacity-0'}`}>
                  
                  <div className="absolute inset-0 pointer-events-none z-40 rounded-[1.4rem]" style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 20%, transparent 50%)` }}></div>
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent rotate-12 pointer-events-none z-40"></div>
                  <div className="absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/10 pointer-events-none z-40"></div>

                  <div className="flex justify-between items-center px-5 pt-3 pb-1.5 text-[10px] text-white/70 font-medium z-10 flex-shrink-0">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-[2px] items-end">
                        <div className="w-[2.5px] h-1 bg-white/70 rounded-sm"></div>
                        <div className="w-[2.5px] h-1.5 bg-white/70 rounded-sm"></div>
                        <div className="w-[2.5px] h-2 bg-white/70 rounded-sm"></div>
                        <div className="w-[2.5px] h-2.5 bg-white/40 rounded-sm"></div>
                      </div>
                      <svg className="w-3 h-2 text-white/70" viewBox="0 0 24 16" fill="currentColor">
                        <path d="M12 2C7 2 2.5 4.5 0 8.5L2 10.5C4 7.5 7.5 5.5 12 5.5C16.5 5.5 20 7.5 22 10.5L24 8.5C21.5 4.5 17 2 12 2Z" opacity="0.9"/>
                        <circle cx="12" cy="14" r="1.5"/>
                      </svg>
                      <div className="relative w-4 h-2 border border-white/50 rounded-sm">
                        <div className="absolute inset-[1px] bg-green-400 rounded-[1px] w-[85%]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pt-1 pb-3 z-10 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"></div>
                          <span className="text-white font-bold text-xs relative z-10">E</span>
                        </div>
                        <div>
                          <h1 className="text-white font-semibold text-[13px] leading-tight">Entreprise Inc.</h1>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-green-400"></div>
                            <p className="text-white/40 text-[9px]">En ligne • Depuis 2009</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                          </svg>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-slate-950"></div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 mb-3 z-10 flex-shrink-0">
                    <div className="flex gap-1 bg-white/[0.06] backdrop-blur-xl p-1 rounded-xl border border-white/10">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 min-w-0 py-1.5 px-1.5 text-[10px] font-medium rounded-lg relative transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
                        >
                          {activeTab === tab.id && (
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/40"></div>
                          )}
                          <span className="relative z-10 truncate block">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 px-4 pb-2 overflow-hidden z-10 min-h-0">
                    <div key={activeTab} className="animate-[fadeIn_0.4s_ease-out] h-full">
                      
                      {activeTab === 'histoire' && (
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-white text-xs font-bold">Notre Parcours</h2>
                            <span className="text-white/40 text-[9px]">{timelineIndex + 1}/{timelineEvents.length}</span>
                          </div>

                          <div className="relative mb-3">
                            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/10 -translate-y-1/2"></div>
                            <div 
                              className="absolute top-1/2 left-0 h-[1.5px] bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 transition-all duration-500"
                              style={{ width: `${(timelineIndex / (timelineEvents.length - 1)) * 100}%` }}
                            ></div>
                            <div className="flex justify-between relative">
                              {timelineEvents.map((ev, i) => (
                                <button
                                  key={i}
                                  onClick={() => setTimelineIndex(i)}
                                  className="flex flex-col items-center group"
                                >
                                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    i <= timelineIndex 
                                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 scale-110' 
                                      : 'bg-slate-800 border border-white/20'
                                  }`}></div>
                                  <span className={`text-[9px] mt-1.5 font-medium transition-colors ${
                                    i === timelineIndex ? 'text-white' : 'text-white/40'
                                  }`}>{ev.year}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 flex-1 relative overflow-hidden">
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
                            <div className="relative">
                              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 px-2 py-0.5 rounded-full mb-2">
                                <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                                <span className="text-indigo-300 text-[9px] font-medium tracking-wider">{timelineEvents[timelineIndex].year}</span>
                              </div>
                              <h3 className="text-white text-base font-bold mb-1">{timelineEvents[timelineIndex].title}</h3>
                              <p className="text-white/60 text-[11px] leading-relaxed mb-3">{timelineEvents[timelineIndex].desc}</p>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full transition-all duration-700"
                                    style={{ width: `${((timelineIndex + 1) / timelineEvents.length) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-white/40 text-[9px]">{Math.round(((timelineIndex + 1) / timelineEvents.length) * 100)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'mission' && (
                        <div className="h-full flex flex-col gap-2.5">
                          <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-3.5 overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
                            <div className="relative">
                              <div className="flex items-center gap-1.5 mb-2">
                                <span className="text-[9px] text-indigo-300 font-medium tracking-widest">MISSION 2024</span>
                              </div>
                              <p className="text-white/90 text-[12px] leading-relaxed mb-3">
                                Créer des solutions qui <span className="text-white font-semibold">transforment le quotidien</span> de millions de personnes.
                              </p>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-white/50 text-[9px]">Progression annuelle</span>
                                  <span className="text-white text-[11px] font-bold">{missionProgress}%</span>
                                </div>
                                <input 
                                  type="range" 
                                  min="0" 
                                  max="100" 
                                  value={missionProgress}
                                  onChange={(e) => setMissionProgress(e.target.value)}
                                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer slider-custom"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 relative overflow-hidden">
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                              </div>
                              <p className="text-white/40 text-[9px] mb-0.5">Projets actifs</p>
                              <p className="text-white text-lg font-bold">28</p>
                              <p className="text-cyan-400 text-[9px]">+12% ce mois</p>
                            </div>
                            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3 relative overflow-hidden">
                              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
                              </div>
                              <p className="text-white/40 text-[9px] mb-0.5">Impact clients</p>
                              <p className="text-white text-lg font-bold">1M+</p>
                              <p className="text-pink-400 text-[9px]">+25% ce mois</p>
                            </div>
                          </div>

                          <div className="bg-white/[0.04] border border-white/10 rounded-xl p-2.5 flex-1">
                            <p className="text-white/50 text-[9px] mb-2">Objectifs trimestriels</p>
                            <div className="space-y-1.5">
                              {[
                                { label: 'Innovation', value: 92, color: 'from-indigo-400 to-purple-500' },
                                { label: 'Satisfaction', value: 98, color: 'from-pink-400 to-rose-500' },
                                { label: 'Croissance', value: 75, color: 'from-cyan-400 to-blue-500' },
                              ].map((o, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="text-white/50 text-[9px] w-16">{o.label}</span>
                                  <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${o.color} rounded-full`} style={{ width: `${o.value}%` }}></div>
                                  </div>
                                  <span className="text-white/60 text-[9px] w-6 text-right">{o.value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'equipe' && (
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-white text-xs font-bold">Les visages</h2>
                            <span className="text-white/40 text-[9px]">{team.length} membres</span>
                          </div>

                          <div className="flex gap-2 justify-center mb-3">
                            {team.map((m, i) => (
                              <button
                                key={i}
                                onClick={() => setTeamSelected(i)}
                                className={`relative transition-all duration-300 ${
                                  teamSelected === i ? 'scale-110' : 'scale-90 opacity-50 hover:opacity-80'
                                }`}
                              >
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg ${
                                  teamSelected === i ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-slate-950' : ''
                                }`}>
                                  <span className="text-white font-bold text-xs">{m.initials}</span>
                                </div>
                                {i === 0 && (
                                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-slate-950"></div>
                                )}
                              </button>
                            ))}
                          </div>

                          <div className="flex-1 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 relative overflow-hidden">
                            <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${team[teamSelected].color} opacity-20 rounded-full blur-3xl transition-all duration-500`}></div>
                            <div className="relative">
                              <div className="flex items-start gap-3 mb-3">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team[teamSelected].color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                  <span className="text-white font-bold text-lg">{team[teamSelected].initials}</span>
                                </div>
                                <div className="flex-1 pt-1">
                                  <h3 className="text-white text-sm font-bold">{team[teamSelected].name}</h3>
                                  <p className="text-white/50 text-[10px] mb-1">{team[teamSelected].role}</p>
                                  <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-green-400"></div>
                                    <span className="text-green-400 text-[9px]">Disponible</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-white/60 text-[11px] leading-relaxed mb-3">{team[teamSelected].bio}</p>

                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { label: 'Projets', value: '47' },
                                  { label: 'Années', value: '8+' },
                                  { label: 'Prix', value: '3' },
                                ].map((s, i) => (
                                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-lg p-1.5 text-center">
                                    <div className="text-white font-bold text-xs">{s.value}</div>
                                    <div className="text-white/40 text-[8px]">{s.label}</div>
                                  </div>
                                ))}
                              </div>

                              <button className="w-full mt-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-lg text-indigo-300 text-[10px] font-medium hover:from-indigo-500/30 hover:to-purple-500/30 transition-all">
                                + Suivre ce membre
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'valeurs' && (
                        <div className="h-full flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-white text-xs font-bold">Ce qui nous anime</h2>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"></div>
                              <span className="text-white/40 text-[9px]">En direct</span>
                            </div>
                          </div>

                          <div className="space-y-2 flex-1 overflow-hidden">
                            {values.map((v, i) => (
                              <div 
                                key={i}
                                className="group bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-2.5 flex items-center gap-3 hover:bg-white/[0.07] transition-all cursor-pointer"
                              >
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-sm">{v.icon}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-[11px] font-semibold">{v.title}</p>
                                  <p className="text-white/50 text-[9px] truncate">{v.desc}</p>
                                </div>
                                <button 
                                  onClick={() => {
                                    const newLikes = [...valuesLikes];
                                    newLikes[i] = !newLikes[i];
                                    setValuesLikes(newLikes);
                                  }}
                                  className="flex flex-col items-center gap-0.5 px-1"
                                >
                                  <svg 
                                    className={`w-4 h-4 transition-all ${valuesLikes[i] ? 'text-pink-500 scale-110' : 'text-white/30'}`}
                                    fill={valuesLikes[i] ? 'currentColor' : 'none'}
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                  >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                  </svg>
                                  <span className={`text-[8px] ${valuesLikes[i] ? 'text-pink-400' : 'text-white/30'}`}>
                                    {valuesLikes[i] ? 128 + i * 42 : 127 + i * 42}
                                  </span>
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 justify-center">
                            <span className="text-white/30 text-[9px]">#NosValeurs</span>
                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                            <span className="text-white/30 text-[9px]">#TeamEntreprise</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pb-1.5 flex justify-center items-center gap-3 z-10 flex-shrink-0">
                    <button 
                      onClick={replayBoot}
                      className="text-white/20 hover:text-white/60 text-[8px] tracking-widest transition-colors"
                    >
                      ↻ REBOOT
                    </button>
                    <div className="w-20 h-[3px] bg-white/40 rounded-full"></div>
                    <div className="w-8"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 -right-[4px] w-[4px] h-12 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-800 rounded-r-md shadow-lg"></div>
              <div className="absolute top-36 -right-[4px] w-[4px] h-20 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-800 rounded-r-md shadow-lg"></div>
              <div className="absolute top-24 -left-[4px] w-[4px] h-8 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-800 rounded-l-md shadow-lg"></div>
              <div className="absolute top-36 -left-[4px] w-[4px] h-12 bg-gradient-to-b from-slate-500 via-slate-700 to-slate-800 rounded-l-md shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.5) rotate(-12deg); }
          60% { opacity: 1; transform: scale(1.1) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes textReveal {
          from { opacity: 0; letter-spacing: 1em; }
          to { opacity: 1; letter-spacing: 0.4em; }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .slider-custom::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #818cf8, #a855f7);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
        }
        .slider-custom::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #818cf8, #a855f7);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
