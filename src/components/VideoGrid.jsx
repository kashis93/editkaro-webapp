import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { CardSkeleton } from './CardSkeleton';
import { 
  Play, 
  Eye, 
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { playWoosh } from '../utils/audio';

export const VideoGrid = ({
  selectedCategory,
  onSelectProject
}) => {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Trigger brief spring skeleton simulation on category change to demonstrate layout stability
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProjects = PROJECTS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      id="portfolio-grid" 
      className="px-6 sm:px-8 max-w-7xl mx-auto space-y-8 text-[#F4F0EA]"
    >
      
      {/* Grid Subheader Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#26242E]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#9E9BA8]">
          <Sparkles className="w-4 h-4 text-[#FF3333]" />
          <span>Showing <strong className="text-[#FF3333]">{filteredProjects.length}</strong> Master Edits in Selected Category</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#F4F0EA] px-3 py-1 rounded-full bg-[#131318] border border-[#26242E] shadow-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Hover to Preview Video Motion
          </span>
        </div>
      </div>

      {/* Grid Container - Skeleton vs Animated Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[480px]">
        {isLoading ? (
          <CardSkeleton count={Math.max(3, filteredProjects.length)} />
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredProjectId === project.id;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 280, 
                    damping: 22, 
                    delay: idx * 0.04 
                  }}
                  whileHover={{ 
                    scale: 1.028, 
                    y: -6,
                    transition: { type: 'spring', stiffness: 400, damping: 25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => {
                    playWoosh();
                    onSelectProject(project);
                  }}
                  className="group cursor-pointer rounded-3xl bg-[#131318] border border-[#26242E] hover:border-[#FF3333]/80 shadow-xl hover:shadow-2xl hover:shadow-[#FF3333]/20 transition-colors duration-300 flex flex-col overflow-hidden h-[460px] w-full relative"
                >
                  {/* Subtle Red Ambient Glow Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FF3333]/0 via-[#FF3333]/0 to-[#FF3333]/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />

                  {/* Fixed Height Media Container (220px) */}
                  <div className="relative w-full h-[220px] bg-[#0B0B0E] overflow-hidden flex-shrink-0">
                    
                    {/* Fallback Red/Anime Theme Poster Image */}
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80';
                      }}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isHovered ? 'scale-108 opacity-25' : 'scale-100 opacity-100'
                      }`}
                    />

                    {/* Hover Auto-Preview Video */}
                    {isHovered && (
                      <video
                        src={project.previewVideoUrl}
                        poster={project.thumbnailUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
                      />
                    )}

                    {/* Category & Duration Badge */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-[#F4F0EA] border border-white/10 shadow-md">
                        {project.categoryLabel}
                      </span>

                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-[#FF3333] border border-[#FF3333]/40 shadow-md">
                        {project.duration}
                      </span>
                    </div>

                    {/* Hover Play Button Overlay with Spring Scale */}
                    <motion.div 
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]"
                      initial={false}
                      animate={isHovered ? { scale: 1 } : { scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#FF3333] text-white flex items-center justify-center shadow-lg shadow-[#FF3333]/60 transform group-hover:scale-110 transition-transform border border-white/20">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </motion.div>

                  </div>

                  {/* Card Body - Uniform Layout */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-[#131318] z-10">
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={project.clientAvatar}
                          alt={project.client}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover border border-[#FF3333]/50"
                        />
                        <span className="text-xs text-[#9E9BA8] font-semibold truncate">{project.client}</span>
                      </div>

                      <h3 className="text-base font-bold text-[#F4F0EA] line-clamp-1 group-hover:text-[#FF3333] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#9E9BA8] line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Metrics Footer inside Card */}
                    <div className="pt-3 border-t border-[#26242E] flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1 font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {project.retention}
                      </span>

                      <span className="flex items-center gap-1 font-bold text-[#9E9BA8] px-2.5 py-1 rounded-full bg-[#0B0B0E] border border-[#26242E] group-hover:border-[#FF3333]/30 transition-colors">
                        <Eye className="w-3.5 h-3.5 text-[#FF3333]" />
                        {project.views}
                      </span>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

    </motion.section>
  );
};

export default VideoGrid;
