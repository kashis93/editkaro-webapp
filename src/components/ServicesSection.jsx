import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette, 
  Sparkles, 
  Smartphone, 
  Layers, 
  Calculator, 
  Film,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  X,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { playWoosh, playTick } from '../utils/audio';

export const ServicesSection = ({ 
  setCurrentView, 
  onOpenBooking 
}) => {
  const [selectedService, setSelectedService] = useState(null);

  const handleToolRedirect = (view) => {
    playWoosh();
    if (setCurrentView) {
      setCurrentView(view);
      const target = document.getElementById('active-workstation-view');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const services = [
    {
      id: 'color-grading-studio',
      title: 'DaVinci Resolve Color Grading',
      icon: Palette,
      badge: 'Interactive Studio',
      viewTarget: 'color-grade',
      tagline: '4K HDR RAW to Teal & Orange Color Transformation',
      description: 'Before & After RAW vs Graded 4K color transformation studio. Features DaVinci Resolve node trees, film grain, halation, and Teal & Orange LUTs created for high-budget cinema and commercial reels.',
      highlights: ['S-Log3 / C-Log / RAW Log Conversion', 'Live Split Wipe Slider Inspection', 'Cyberpunk, Film Halation & Teal-Orange LUTs', 'Color Space Transform (Rec.709)'],
      software: ['DaVinci Resolve Studio 18', 'Dehancer Pro', 'FilmConvert'],
      turnaround: '12 - 24 Hours',
      toolLabel: 'Launch Live Color Studio'
    },
    {
      id: 'ai-scripting-studio',
      title: 'AI Scripting & Viral Hook Generator',
      icon: Sparkles,
      badge: 'AI Powered',
      viewTarget: 'ai-generator',
      tagline: '3-Second Retention Hooks & Scene Callouts',
      description: 'Powered by Gemini AI to generate 3-second retention hooks, velocity pacing scripts, and visual scene-by-scene editing callouts tailored specifically to your channel niche.',
      highlights: ['0.8s Pattern Interrupt Hook Formulas', 'Full Scene-by-Scene Shotlists & B-Roll Ideas', 'Audience Retention & Pacing Suggestions', 'Niche-Specific Trend Analysis'],
      software: ['Gemini 1.5 Flash AI', 'Editkaro Virality Model', 'GPT-4o Vision'],
      turnaround: 'Instant AI Output',
      toolLabel: 'Launch AI Script Generator'
    },
    {
      id: 'reel-simulator-studio',
      title: 'TikTok & Short-Form Reel Simulator',
      icon: Smartphone,
      badge: 'Live Simulator',
      viewTarget: 'mobile-reel',
      tagline: '9:16 Vertical Smartphone Interactive Testing Frame',
      description: 'Test short-form video edits inside an interactive 9:16 vertical smartphone frame with live audio playback, kinetic captions, swipe gestures, and UI safe zone overlays.',
      highlights: ['9:16 Vertical Platform Safe Zones', 'Audio Waveform Syncing & Sound Effects', 'Live Interactive Swipe Motion Preview', 'Retention Hotspot Indicators'],
      software: ['CapCut Pro', 'Adobe Premiere Pro', 'After Effects'],
      turnaround: '24 Hours',
      toolLabel: 'Launch Reel Simulator'
    },
    {
      id: 'platform-comparison-studio',
      title: '2-Side Platform Safe Zone Studio',
      icon: Layers,
      badge: 'Overlay Studio',
      viewTarget: 'platform-compare',
      tagline: 'Reels vs TikTok vs Shorts Safe Zone Audit',
      description: 'Compare Instagram Reels vs TikTok vs YouTube Shorts overlays simultaneously to ensure kinetic subtitles, lower thirds, and callout popups never get blocked by UI buttons.',
      highlights: ['TikTok / Shorts / Reels Rules Grid', 'Interactive Safe-Zone Grid Audit', 'Real-Time Layout Collision Warning', 'Multi-Device Screen Testing'],
      software: ['Editkaro Overlay Engine', 'Adobe After Effects'],
      turnaround: 'Real-Time Studio',
      toolLabel: 'Launch Safe Zone Studio'
    },
    {
      id: 'pricing-calculator-studio',
      title: 'Instant Quote & Pricing Calculator',
      icon: Calculator,
      badge: 'Instant Estimate',
      viewTarget: 'pricing',
      tagline: 'Transparent Pricing & Retainer Customizer',
      description: 'Configure raw footage length, turnaround speeds, 3D graphic layers, and audio mastering to generate a transparent instant monthly retainer quote or per-video pricing.',
      highlights: ['Custom Raw Footage Duration Sliders', '24h Express Turnaround Upgrades', 'Instant PDF Invoice / Booking Sync', 'Bulk Volume Monthly Discounts'],
      software: ['Editkaro Financial Engine'],
      turnaround: 'Instant Custom Quote',
      toolLabel: 'Open Pricing Calculator'
    },
    {
      id: 'video-portfolio-deck',
      title: '3D Floating Cinema Deck & Portfolio',
      icon: Film,
      badge: '3D Stage',
      viewTarget: 'carousel3d',
      tagline: 'Perspective 3D Stage Video Portfolio',
      description: 'Explore Editkaro\'s full showcase of short-form reels, long-form YouTube essays, gaming frags, football edits, and Vox documentaries in 3D perspective space.',
      highlights: ['Spring Motion Interactive Card Stack', 'Instant Hover Video Previews', 'Categorized Edit Filtering & Search', 'Direct Client Case Studies'],
      software: ['Three.js / React Spring / Motion'],
      turnaround: 'Instant Portfolio Stage',
      toolLabel: 'Explore 3D Cinema Deck'
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      id="services-overview"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#F4F0EA]"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OUR SERVICES</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#F4F0EA] tracking-tight">
          Our Services
        </h2>
        
        <p className="text-xs sm:text-sm text-[#9E9BA8] mt-3 font-medium max-w-2xl mx-auto leading-relaxed">
          Professional video editing and social media marketing services to elevate your brand. Click any card to explore full details and launch tools.
        </p>
      </div>

      {/* Services Showcase Grid - Clean, Direct & Impactful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const IconComp = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
              className="group p-5 sm:p-6 rounded-3xl bg-[#131318] border border-[#26242E] hover:border-[#FF3333] shadow-xl hover:shadow-2xl hover:shadow-[#FF3333]/15 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle Red Top Accent Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF3333]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header Row: Icon & Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#0B0B0E] border border-[#26242E] group-hover:border-[#FF3333]/50 flex items-center justify-center text-[#FF3333] group-hover:bg-[#FF3333] group-hover:text-white transition-all duration-300 shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#0B0B0E] text-[#FF3333] border border-[#FF3333]/30 uppercase">
                    {service.badge}
                  </span>
                </div>

                {/* Direct Punchy Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-[#F4F0EA] mb-1.5 group-hover:text-[#FF3333] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Concise 1-Line Tagline */}
                <p className="text-xs text-[#9E9BA8] font-medium leading-snug mb-4">
                  {service.tagline}
                </p>

                {/* Key Quick Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[10px]">
                  {service.software.slice(0, 2).map((sw, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#0B0B0E] text-[#F4F0EA]/80 border border-[#26242E]">
                      {sw}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {service.turnaround}
                  </span>
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 border-t border-[#26242E] flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToolRedirect(service.viewTarget);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF3333] hover:bg-[#E60000] text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#FF3333]/20"
                >
                  <span>{service.toolLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playTick();
                    setSelectedService(service);
                  }}
                  className="p-2.5 rounded-xl bg-[#0B0B0E] hover:bg-[#1A1822] text-[#9E9BA8] hover:text-white border border-[#26242E] transition-colors"
                  title="View Deliverables & Details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* FULL SERVICE DETAILS MODAL */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            key="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            
            {/* Modal Backdrop Click */}
            <div 
              className="absolute inset-0"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-2xl bg-[#131318] border-2 border-[#FF3333]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-left overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#0B0B0E] text-[#9E9BA8] hover:text-white border border-[#26242E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon & Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF3333] text-white flex items-center justify-center shadow-lg shadow-[#FF3333]/30">
                  {React.createElement(selectedService.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#0B0B0E] text-[#FF3333] border border-[#FF3333]/30 uppercase">
                    {selectedService.badge}
                  </span>
                  <div className="text-xs font-mono text-[#9E9BA8] mt-1">
                    Turnaround: <strong className="text-emerald-400">{selectedService.turnaround}</strong>
                  </div>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-black text-[#F4F0EA] mb-1">
                {selectedService.title}
              </h3>
              <p className="text-xs font-mono font-bold text-[#FF3333] mb-4">
                {selectedService.tagline}
              </p>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-[#9E9BA8] leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {/* Key Features & Highlights */}
              <div className="mb-6 bg-[#0B0B0E] p-4 rounded-2xl border border-[#26242E]">
                <h4 className="text-xs font-mono font-bold text-[#F4F0EA] uppercase mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FF3333]" />
                  Service Deliverables & Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#F4F0EA]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Used */}
              <div className="mb-6">
                <span className="text-[11px] font-mono font-bold text-[#9E9BA8] block mb-2 uppercase">
                  Software & Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedService.software.map((sw, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-[#131318] text-[#F4F0EA] border border-[#26242E] text-xs font-mono font-bold">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#26242E]">
                <button
                  onClick={() => {
                    const target = selectedService.viewTarget;
                    setSelectedService(null);
                    handleToolRedirect(target);
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#FF3333] hover:bg-[#E60000] text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#FF3333]/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{selectedService.toolLabel}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>

                <button
                  onClick={() => {
                    setSelectedService(null);
                    playTick();
                    onOpenBooking();
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#0B0B0E] hover:bg-[#1A1822] text-[#F4F0EA] border border-[#26242E] hover:border-[#FF3333]/50 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Book Custom Project</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};

export default ServicesSection;
