import React from 'react';
import { motion } from 'motion/react';
import { AGENCY_METRICS, PROJECTS, CLIENT_TESTIMONIALS } from '../data/projects';
import { Eye, Flame, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { playWoosh, playTick } from '../utils/audio';

export const BottomShowcase = ({
  setCurrentView,
  onSelectProject,
  onOpenBooking
}) => {
  // Duplicate projects array for seamless continuous marquee loop
  const marqueeProjects = [...PROJECTS, ...PROJECTS];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-16 bg-[#08080A] relative overflow-hidden text-[#F4F0EA]"
    >
      {/* Background Ambient Soft Red Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF3333]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. AGENCY METRICS & TOTAL CLIENT VIEWS (ABOUT ANCHOR) */}
      <div id="about-agency" className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>PROVEN VIRAL RESULTS & AGENCY METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F4F0EA] tracking-tight">
            250 Million+ Total Client Views & Counting
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9BA8] mt-2 font-medium">
            Editkaro transforms raw footage into viral visual assets that drive massive organic reach, high watch times, and multi-million view spikes.
          </p>
        </div>

        {/* Agency Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#131318] border border-[#26242E] shadow-2xl max-w-5xl mx-auto mb-12">
          {AGENCY_METRICS.map((metric, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#0B0B0E] border border-[#26242E] hover:border-[#FF3333]/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#FF3333]">
                {metric.value}
              </div>
              <div className="text-xs text-[#F4F0EA] font-bold mt-1">{metric.label}</div>
              <div className="text-[11px] text-[#9E9BA8] mt-0.5">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Client Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CLIENT_TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#131318] border border-[#26242E] flex flex-col justify-between space-y-4">
              <p className="text-xs text-[#F4F0EA] italic leading-relaxed">
                "{t.quote}"
              </p>

              <div className="flex items-center justify-between border-t border-[#26242E] pt-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-[#FF3333]/40"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#F4F0EA]">{t.name}</h4>
                    <p className="text-[10px] text-[#9E9BA8]">{t.handle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. LIVE EDITING SHOWCASE (AUTO SCROLLING REEL MARQUEE) */}
      <div className="w-full overflow-hidden pt-8 border-t border-[#26242E] relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131318] border border-[#26242E] text-xs font-mono font-bold text-[#F4F0EA] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#FF3333]" />
            <span>LIVE EDITING SHOWCASE (AUTO SCROLLING REEL)</span>
          </div>
          <p className="text-xs text-[#9E9BA8] mt-1 font-medium">
            Continuous feed of recent high-retention video edits engineered by Editkaro
          </p>
        </div>

        <div className="flex animate-marquee gap-6 pointer-events-auto py-2">
          {marqueeProjects.map((project, idx) => (
            <div
              key={`${project.id}-bottom-${idx}`}
              onClick={() => {
                playWoosh();
                if (onSelectProject) onSelectProject(project);
                else setCurrentView('grid');
              }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] rounded-2xl bg-[#131318] border border-[#26242E] p-3 shadow-xl hover:border-[#FF3333]/60 transition-all cursor-pointer group hover:scale-[1.02]"
            >
              <div className="relative h-[160px] rounded-xl bg-[#0B0B0E] overflow-hidden mb-3">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#0B0B0E]/85 backdrop-blur-md text-[10px] font-mono font-bold text-[#F4F0EA] border border-white/10">
                  {project.categoryLabel}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#0B0B0E]/85 backdrop-blur-md text-[10px] font-mono text-[#FF3333] font-bold border border-[#FF3333]/30">
                  {project.duration}
                </div>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[11px] text-[#9E9BA8] font-medium block truncate">{project.client}</span>
                <h4 className="text-xs font-bold text-[#F4F0EA] truncate group-hover:text-[#FF3333] transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-[#9E9BA8]">
                  <span className="text-emerald-400 font-bold">{project.retention}</span>
                  <span className="flex items-center gap-1 font-bold"><Eye className="w-3 h-3 text-[#FF3333]" /> {project.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick CTA banner at very bottom */}
      <div className="max-w-4xl mx-auto px-6 mt-12 text-center">
        <button
          onClick={() => {
            playTick();
            onOpenBooking();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-[#FF3333]/30 hover:scale-105 transition-transform border border-[#FF3333]/40"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span>Contact Us — Book Your Custom Video Edit</span>
        </button>
      </div>

    </motion.section>
  );
};

export default BottomShowcase;
