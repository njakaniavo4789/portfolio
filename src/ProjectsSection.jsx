import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight, Code2, Cloud, Cpu, Smartphone, Database, Shield, Layers, ChevronRight } from 'lucide-react';

const categories = [
  { id: 'all', label: 'ALL PROJECTS', icon: Layers, count: 6 },
  { id: 'ai', label: 'INTELLIGENCE ARTIFICIELLE', icon: Cpu, count: 1 },
  { id: 'web', label: 'FULL-STACK WEB', icon: Code2, count: 2 },
  { id: 'cloud', label: 'DEVOPS & CLOUD', icon: Cloud, count: 1 },
  { id: 'mobile', label: 'MOBILE APPS', icon: Smartphone, count: 1 },
  { id: 'web3', label: 'BLOCKCHAIN WEB3', icon: Shield, count: 1 },
];

const projects = [
  {
    id: 1,
    title: 'Neural Chat AI',
    category: 'ai',
    description: 'Assistant conversationnel propulsé par des modèles de langage avancés. Fine-tuning, RAG, et interface temps réel pour une expérience IA fluide.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    tech: ['Python', 'LangChain', 'OpenAI', 'Next.js', 'Vector DB'],
    year: '2024',
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'web',
    description: 'Marketplace multi-vendeurs avec paiements Stripe, dashboard analytics et gestion de stock temps réel.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
    year: '2024',
    color: '#3b82f6',
  },
  {
    id: 3,
    title: 'Cloud Dashboard',
    category: 'cloud',
    description: 'Tableau de bord unifié pour infrastructure cloud. Métriques temps réel, alertes et auto-scaling.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    tech: ['Vue.js', 'Go', 'Kubernetes', 'Prometheus', 'Grafana'],
    year: '2023',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'IoT Analytics',
    category: 'web',
    description: 'Pipeline de données pour capteurs IoT. Ingestion temps réel, dashboards et prédictive analytics.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    tech: ['Python', 'Kafka', 'TimescaleDB', 'React', 'D3.js'],
    year: '2023',
    color: '#f97316',
  },
  {
    id: 5,
    title: 'Mobile App',
    category: 'mobile',
    description: 'Application cross-platform avec synchronisation offline-first, push notifications et géolocalisation.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop',
    tech: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Maps API'],
    year: '2024',
    color: '#ec4899',
  },
  {
    id: 6,
    title: 'Blockchain Web3',
    category: 'web3',
    description: 'Plateforme DeFi avec staking, yield farming et governance DAO. Smart contracts audités.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
    tech: ['Solidity', 'Ethers.js', 'Hardhat', 'The Graph', 'IPFS'],
    year: '2024',
    color: '#f59e0b',
  },
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10"
      >
        <div className="grid md:grid-cols-2 h-full">
          {/* Image side */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent md:hidden" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content side */}
          <div className="p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium tracking-wider" style={{ color: project.color }}>
                {project.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs text-white/40">{categories.find(c => c.id === project.category)?.label}</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{project.description}</p>

            <div className="mb-6">
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-3">Stack technique</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span 
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                    style={{ 
                      background: `${project.color}10`, 
                      borderColor: `${project.color}25`,
                      color: project.color
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg text-black"
                style={{ 
                  background: project.color, 
                  boxShadow: `0 0 20px ${project.color}40`
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Voir le projet
              </a>
              <a 
                href="#" 
                className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const filtered = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-20 px-6 md:px-12 lg:px-20 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Hero text + illustration */}
            <div className="relative">
              <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-6 font-medium">Portfolio</p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8">
                WORK THAT<br />
                <span className="text-white/30">BEGINS WITH</span><br />
                STRATEGY<span className="text-blue-500">.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-md mb-8">
                Chaque projet est une exploration technique. De l'idée au déploiement, 
                je crée des solutions qui allient performance, design et innovation.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{projects.length} projets réalisés</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>2023 — 2024</span>
              </div>

              {/* Floating thumbnails around hero */}
              <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2">
                <div className="relative w-64 h-80">
                  {projects.slice(0, 4).map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                      className="absolute cursor-pointer"
                      style={{
                        top: `${i * 20}%`,
                        left: i % 2 === 0 ? '0' : '25%',
                        zIndex: hoveredProject === p.id ? 10 : i,
                      }}
                      onMouseEnter={() => setHoveredProject(p.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => setSelectedProject(p)}
                    >
                      <div 
                        className={`w-28 h-20 rounded-lg overflow-hidden border border-white/10 transition-all duration-500 ${
                          hoveredProject === p.id ? 'scale-110 shadow-2xl' : 'scale-100'
                        }`}
                        style={{ 
                          boxShadow: hoveredProject === p.id ? `0 0 30px ${p.color}30` : 'none',
                          borderColor: hoveredProject === p.id ? `${p.color}40` : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Categories */}
            <div className="lg:pl-12">
              <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-6 font-medium">Catégories</p>
              <div className="space-y-1">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length;
                  
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-white/[0.06] border border-white/10' 
                          : 'hover:bg-white/[0.03] border border-transparent'
                      }`}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-blue-500/20' : 'bg-white/[0.04] group-hover:bg-white/[0.06]'
                        }`}>
                          <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-400' : 'text-white/40 group-hover:text-white/60'}`} />
                        </div>
                        <div className="text-left">
                          <p className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                            {cat.label}
                          </p>
                          <p className="text-[10px] text-white/25 mt-0.5">{count} projet{count > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-all ${isActive ? 'text-blue-400 opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); } }}
                aria-label={`Voir le projet ${project.title}`}
              >
                <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300"
                        style={{ background: project.color }}
                      >
                        <ArrowUpRight className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] text-white/60 font-medium">
                      {project.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                      <p className="text-[10px] text-white/40 tracking-wider uppercase">
                        {categories.find(c => c.id === project.category)?.label}
                      </p>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 3).map((t) => (
                        <span 
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-white/40 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] text-white/25">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom glow on hover */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 leading-relaxed max-w-4xl mx-auto">
            WE REJECT THE <span className="text-white/30">SUPERFLUOUS.</span><br />
            BUILDING IDENTITY SYSTEMS AND<br />
            DIGITAL ENVIRONMENTS <span className="text-blue-500">GROUNDED</span><br />
            IN EXTREME CLARITY, PURPOSE,<br />
            AND UNCOMPROMISED CRAFT.
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
