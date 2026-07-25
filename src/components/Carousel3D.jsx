import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../data/projects';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Eye, 
  TrendingUp, 
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { playTick, playWoosh } from '../utils/audio';

export const Carousel3D = ({
  selectedCategory,
  onSelectProject,
  onOpenBooking
}) => {
  const filteredProjects = PROJECTS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling || filteredProjects.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoScrolling, filteredProjects.length]);

  const handleNext = () => {
    playWoosh();
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    playWoosh();
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  if (filteredProjects.length === 0) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      id="cinema-deck"
      className="py-12 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden text-[#F4F0EA]"
      onMouseEnter={() => setIsAutoScrolling(false)}
      onMouseLeave={() => setIsAutoScrolling(true)}
    >
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
          <Layers className="w-3.5 h-3.5" />
          <span>INTERACTIVE 3D PERSPECTIVE STAGE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-ping ml-1" />
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#F4F0EA] tracking-tight">Our Video Portfolio</h2>
        <p className="text-xs sm:text-sm text-[#9E9BA8] mt-2 font-medium">
          Browse our collection of video projects across different categories and styles in 3D perspective space.
        </p>

        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="mt-3 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#131318] border border-[#26242E] text-[#F4F0EA] hover:border-[#FF3333]/50 transition-colors inline-flex items-center gap-1.5"
        >
          <span className={`w-2 h-2 rounded-full ${isAutoScrolling ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span>{isAutoScrolling ? 'AUTO-SCROLLING ACTIVE' : 'PAUSED (CLICK TO RESUME)'}</span>
        </button>
      </div>

      {/* 3D Stage Container */}
      <div className="relative min-h-[480px] sm:min-h-[530px] flex items-center justify-center py-6" style={{ perspective: '1200px' }}>
        
        {/* Soft Red Glow behind Center Card */}
        <div className="absolute w-80 h-80 rounded-full bg-[#FF3333]/20 blur-[140px] pointer-events-none" />

        {/* Carousel Deck Cards */}
        <div className="relative w-full max-w-4xl flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {filteredProjects.map((project, index) => {
            let offset = index - currentIndex;
            if (offset < -Math.floor(filteredProjects.length / 2)) {
              offset += filteredProjects.length;
            } else if (offset > Math.floor(filteredProjects.length / 2)) {
              offset -= filteredProjects.length;
            }

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  x: offset * (window.innerWidth < 640 ? 140 : 260),
                  scale: isCenter ? 1 : 0.82 - Math.abs(offset) * 0.1,
                  rotateY: offset * -28,
                  translateZ: isCenter ? 0 : -Math.abs(offset) * 120,
                  zIndex: 30 - Math.abs(offset) * 10,
                  opacity: isCenter ? 1 : 0.55 - Math.abs(offset) * 0.15,
                }}
                whileHover={{
                  scale: isCenter ? 1.04 : 0.86,
                  y: isCenter ? -8 : -4,
                  transition: { type: 'spring', stiffness: 350, damping: 22 }
                }}
                whileTap={{ scale: isCenter ? 0.98 : 0.8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => {
                  if (isCenter) {
                    playWoosh();
                    onSelectProject(project);
                  } else {
                    playTick();
                    setCurrentIndex(index);
                  }
                }}
                className={`absolute w-full max-w-[320px] sm:max-w-[400px] h-[460px] rounded-3xl bg-[#131318] border transition-colors duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between ${
                  isCenter
                    ? 'border-[#FF3333] shadow-2xl shadow-[#FF3333]/30 ring-2 ring-[#FF3333]/50'
                    : 'border-[#26242E] opacity-75 hover:opacity-95'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Video Media Header */}
                <div className="relative aspect-video bg-[#0B0B0E] overflow-hidden">
                  <video
                    src={project.previewVideoUrl}
                    poster={project.thumbnailUrl}
                    autoPlay={isCenter}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20">
                      {project.categoryLabel}
                    </span>

                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FF3333] border border-[#FF3333]/30 font-bold">
                      {project.duration}
                    </span>
                  </div>

                  {/* Play Center Overlay */}
                  {isCenter && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FF3333] text-white flex items-center justify-center shadow-lg shadow-[#FF3333]/60 border border-white/20">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#131318]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={project.clientAvatar}
                        alt={project.client}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-5 h-5 rounded-full object-cover border border-[#FF3333]/40"
                      />
                      <span className="text-xs text-[#9E9BA8] font-semibold truncate">{project.client}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#F4F0EA] line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#9E9BA8] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#26242E]">
                    <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {project.retention}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#0B0B0E] text-[#9E9BA8] border border-[#26242E]">
                      <Eye className="w-3.5 h-3.5 text-[#FF3333]" />
                      {project.views}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-40 p-3 rounded-2xl bg-[#131318] hover:bg-[#1A1A22] border border-[#26242E] text-[#F4F0EA] shadow-xl backdrop-blur-md transition-all active:scale-95 hover:border-[#FF3333]/50"
        >
          <ChevronLeft className="w-6 h-6 text-[#F4F0EA]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-40 p-3 rounded-2xl bg-[#131318] hover:bg-[#1A1A22] border border-[#26242E] text-[#F4F0EA] shadow-xl backdrop-blur-md transition-all active:scale-95 hover:border-[#FF3333]/50"
        >
          <ChevronRight className="w-6 h-6 text-[#F4F0EA]" />
        </button>

      </div>

      {/* Pagination Counter */}
      <div className="flex items-center justify-center gap-2 mt-4 font-mono text-xs font-bold text-[#9E9BA8]">
        <span>{currentIndex + 1}</span>
        <span>/</span>
        <span>{filteredProjects.length}</span>
      </div>

    </motion.section>
  );
};

export default Carousel3D;
