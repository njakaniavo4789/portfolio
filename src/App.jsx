import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, X, Send, User, MessageCircle, ArrowUp } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

import Hero3D from './Hero3D';
import AboutPage from './AboutPage';
import ProjectsSection from './ProjectsSection';

/* ============================================================
   FOCUS TRAP HOOK
   ============================================================ */
function useFocusTrap(isOpen) {
  const containerRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      setTimeout(() => {
        const focusable = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable?.length) focusable[0].focus();
      }, 100);
    } else if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key !== 'Tab' || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  return containerRef;
}

/* ============================================================
   TOAST COMPONENT
   ============================================================ */
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[200] px-5 py-3 rounded-xl bg-green-500/90 backdrop-blur-md text-white text-sm font-medium shadow-lg shadow-green-500/30 flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </motion.div>
  );
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-[100] w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Retour en haut"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [openContact, setOpenContact] = useState(null);
  const [toast, setToast] = useState(null);
  const [emailForm, setEmailForm] = useState({ subject: '', message: '' });
  const trapRef = useFocusTrap(!!openContact);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const closeModal = useCallback(() => setOpenContact(null), []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && openContact) closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openContact, closeModal]);

  const handleSendEmail = () => {
    if (!emailForm.subject.trim() || !emailForm.message.trim()) {
      setToast('Veuillez remplir tous les champs');
      return;
    }
    setEmailForm({ subject: '', message: '' });
    closeModal();
    setToast('Message envoyé avec succès !');
  };

  const showToast = useCallback((msg) => setToast(msg), []);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Main Content */}
      <main>
        <Hero3D />

        <ProjectsSection />

        {/* About Section */}
        <section id="about" className="relative py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black via-slate-950/50 to-black overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <AboutPage />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-blue-500 text-xs tracking-[0.3em] uppercase mb-3 font-medium">Contact</p>
              <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Travaillons ensemble</h2>
              <p className="text-white/60 mb-16 max-w-xl mx-auto">
                Une idée de projet ? Une collaboration ? Contactez-moi.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center gap-12 md:gap-20"
            >
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setOpenContact('phone')}
                  aria-label="Appeler par téléphone"
                  className="group relative w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Phone size={28} className="text-white/70 group-hover:text-blue-400 transition-colors" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="text-xs text-white/60 mt-4 tracking-widest uppercase">Téléphone</span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => setOpenContact('email')}
                  aria-label="Envoyer un email"
                  className="group relative w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Mail size={28} className="text-white/70 group-hover:text-blue-400 transition-colors" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="text-xs text-white/60 mt-4 tracking-widest uppercase">Email</span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => setOpenContact('address')}
                  aria-label="Voir l'adresse"
                  className="group relative w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-500 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <MapPin size={28} className="text-white/70 group-hover:text-blue-400 transition-colors" />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <span className="text-xs text-white/60 mt-4 tracking-widest uppercase">Adresse</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ MODALS ============ */}
        <AnimatePresence>
          {openContact === 'phone' && (
            <motion.div
              key="phone-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-label="Appel téléphonique"
            >
              <div ref={trapRef} onClick={(e) => e.stopPropagation()} className="relative animate-[modalIn_.4s_ease_both]">
                <div className="absolute -inset-16 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="relative w-[280px] h-[560px] rounded-[3rem] bg-black border-[3px] border-gray-700 shadow-2xl overflow-hidden">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-900 border-2 border-gray-700 z-20" />
                  <div className="absolute inset-[6px] rounded-[2.6rem] overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)' }}>
                    <div className="flex justify-between items-center px-6 pt-4 text-[10px] text-white/60">
                      <span>14:30</span>
                      <div className="flex items-center gap-2">
                        <span>5G</span>
                        <div className="w-4 h-2 rounded-sm border border-white/40 relative">
                          <div className="absolute inset-0.5 bg-green-400 rounded-sm w-2/3" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full px-6 pb-20">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                        <div className="absolute -inset-4 rounded-full border-2 border-blue-500/20 animate-pulse" />
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                          <User className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <p className="text-blue-300 text-xs mb-1 animate-pulse">Appel en cours...</p>
                      <h3 className="text-white text-xl font-bold mb-1">Njaka Niavo</h3>
                      <p className="text-white/60 text-sm mb-8 font-mono">+225 07 08 09 10 11</p>
                      <div className="flex items-end gap-1 h-6 mb-8">
                        {[0,1,2,3,4,5,6].map(i => (
                          <div key={i} className="w-1 rounded-full" style={{
                            background: i % 2 === 0 ? '#60a5fa' : '#c084fc',
                            animation: 'wave 1s ease-in-out infinite',
                            animationDelay: `${i * 0.1}s`
                          }} />
                        ))}
                      </div>
                      <div className="flex gap-5 items-center">
                        <button
                          aria-label="Envoyer un message"
                          onClick={() => { closeModal(); setTimeout(() => setOpenContact('email'), 300); }}
                          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={closeModal}
                          aria-label="Raccrocher"
                          className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/50 hover:bg-red-600 transition-colors"
                        >
                          <Phone className="w-6 h-6 text-white rotate-[135deg]" />
                        </button>
                        <button
                          aria-label="Appeler"
                          onClick={() => showToast('Appel en cours...')}
                          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Phone className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <p className="text-white/40 text-[10px] mt-5 animate-pulse">Appuyez sur le bouton rouge pour raccrocher</p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/20 z-20" />
                </div>
                <button onClick={closeModal} aria-label="Fermer" className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-30">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {openContact === 'email' && (
            <motion.div
              key="email-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-label="Envoyer un email"
            >
              <div ref={trapRef} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg animate-[modalIn_.4s_ease_both]">
                <div className="absolute -inset-16 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-white/60 text-xs font-medium">Nouveau message</span>
                    <button onClick={closeModal} aria-label="Fermer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">À</p>
                        <p className="text-white text-sm">njaka.niavo@email.com</p>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Objet"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500 transition-colors text-sm mb-4"
                    />
                    <textarea
                      rows={6}
                      placeholder="Écrivez votre message ici..."
                      value={emailForm.message}
                      onChange={(e) => setEmailForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-0 py-3 bg-transparent text-white placeholder-white/40 focus:outline-none text-sm resize-none"
                    />
                    <div className="flex items-center justify-between mt-4 pt-4 border-b border-white/10">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                          <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
                        </button>
                        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                          <svg className="w-3.5 h-3.5 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg>
                        </button>
                      </div>
                      <button
                        onClick={handleSendEmail}
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/30"
                      >
                        Envoyer <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={closeModal} aria-label="Fermer" className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-30">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {openContact === 'address' && (
            <motion.div
              key="address-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-label="Localisation"
            >
              <div ref={trapRef} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg animate-[modalIn_.4s_ease_both]">
                <div className="absolute -inset-16 bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-full blur-3xl pointer-events-none" />
                <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-white/60 text-xs font-medium">Localisation</span>
                    <button onClick={closeModal} aria-label="Fermer" className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div className="relative h-52 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)' }}>
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 208" fill="none">
                      {[...Array(20)].map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 26} x2="500" y2={i * 26} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                      ))}
                      {[...Array(20)].map((_, i) => (
                        <line key={`v${i}`} x1={i * 26} y1="0" x2={i * 26} y2="208" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                      ))}
                      <rect x="80" y="88" width="340" height="6" rx="2" fill="rgba(255,255,255,0.06)" />
                      <rect x="200" y="20" width="6" height="168" rx="2" fill="rgba(255,255,255,0.06)" />
                      <rect x="90" y="50" width="40" height="32" rx="3" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5" />
                      <rect x="220" y="96" width="50" height="28" rx="3" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
                      <rect x="320" y="52" width="45" height="30" rx="3" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.22)" strokeWidth="0.5" />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse z-10 relative">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-5 h-5 bg-blue-500/30 rounded-full blur-md" />
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute w-24 h-24 -top-12 -left-12 rounded-full border-2 border-blue-500/20 animate-ping" />
                      <div className="absolute w-36 h-36 -top-18 -left-18 rounded-full border border-blue-500/10 animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm">Abidjan, Côte d'Ivoire</h3>
                        <p className="text-white/60 text-xs mt-0.5">Plateau, Rue du Commerce</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-green-400 text-[10px]">Disponible</span>
                          </div>
                          <span className="text-white/50 text-[10px]">Remote & On-site</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <a href="https://maps.google.com/?q=Abidjan+Plateau" target="_blank" rel="noreferrer" className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/30">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        Itinéraire
                      </a>
                      <button
                        onClick={() => { navigator.clipboard?.writeText('Abidjan, Plateau, Rue du Commerce'); showToast('Adresse copiée !'); }}
                        className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16,6 12,2 8,6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                        Partager
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={closeModal} aria-label="Fermer" className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-30">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-serif italic text-xl">
              Njaka<span className="text-blue-500">.</span>
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="GitHub" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <GithubIcon size={14} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <LinkedinIcon size={14} />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <InstagramIcon size={14} />
              </a>
            </div>
            <p className="text-white/50 text-sm">
              © 2026 Njaka Niavo. Tous droits réservés.
            </p>
          </div>
        </footer>
      </main>

      <BackToTop />

      <AnimatePresence>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
