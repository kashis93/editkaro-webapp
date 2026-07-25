import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { 
  Smartphone, 
  ChevronUp, 
  ChevronDown, 
  Heart, 
  Share2, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Disc,
  TrendingUp,
  Bookmark,
  ArrowUpDown
} from 'lucide-react';
import { playTick, playWoosh } from '../utils/audio';

export const MobileReelSimulator = ({
  onOpenBookingWithProject
}) => {
  // Filter vertical short-form projects
  const verticalProjects = PROJECTS.filter(
    p => p.aspectRatio === '9:16' || p.category === 'short-form' || p.category === 'anime' || p.category === 'football' || p.category === 'ecommerce'
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const touchStartY = useRef(null);
  const videoRef = useRef(null);

  const currentProject = verticalProjects[currentIndex] || verticalProjects[0];

  const handleNext = () => {
    playWoosh();
    setCurrentIndex(prev => (prev + 1) % verticalProjects.length);
  };

  const handlePrev = () => {
    playWoosh();
    setCurrentIndex(prev => (prev - 1 + verticalProjects.length) % verticalProjects.length);
  };

  const handleWheel = (e) => {
    if (e.deltaY > 30) {
      handleNext();
    } else if (e.deltaY < -30) {
      handlePrev();
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // Swiped up -> Next reel
      } else {
        handlePrev(); // Swiped down -> Previous reel
      }
    }
    touchStartY.current = null;
  };

  const togglePlay = () => {
    playTick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    playTick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    playTick();
    setLiked(prev => ({ ...prev, [currentProject.id]: !prev[currentProject.id] }));
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleSave = () => {
    playTick();
    setSaved(prev => ({ ...prev, [currentProject.id]: !prev[currentProject.id] }));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentIndex]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-12 px-4 max-w-7xl mx-auto space-y-8"
    >
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
          <Smartphone className="w-3.5 h-3.5" />
          <span>TIKTOK & REELS FEED SIMULATOR</span>
        </div>
        <h2 className="text-3xl font-black text-[#F4F0EA] tracking-tight">Interactive Mobile Reel Feed</h2>
        <p className="text-xs text-[#9E9BA8] mt-2 max-w-lg mx-auto">
          Experience Editkaro's short-form edits in a real mobile feed. <strong className="text-[#FF3333]">Scroll your mouse wheel or swipe up/down</strong> to flip between reels seamlessly!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        
        {/* Mobile Device Frame with Touch & Wheel Scroll */}
        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-[330px] sm:w-[370px] h-[670px] rounded-[48px] bg-[#131318] border-[10px] border-[#26242E] shadow-2xl shadow-[#FF3333]/20 overflow-hidden flex flex-col justify-between group select-none"
        >
          
          {/* Smartphone Notch Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-[#26242E] rounded-b-2xl z-30 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#131318]" />
            <div className="w-10 h-1.5 rounded-full bg-[#131318]" />
          </div>

          {/* Video Player */}
          <div className="relative w-full h-full bg-[#0B0B0E] flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={currentProject.previewVideoUrl}
              poster={currentProject.thumbnailUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer"
            />

            {/* Heart Animation Burst */}
            {showHeartAnim && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                <Heart className="w-24 h-24 text-[#FF3333] fill-[#FF3333]" />
              </div>
            )}

            {/* Top Reel Navigation Bar */}
            <div className="absolute top-6 inset-x-4 z-20 flex items-center justify-between text-white text-xs font-mono">
              <span className="font-bold flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3333]" />
                <span>Reel {currentIndex + 1}/{verticalProjects.length}</span>
              </span>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors border border-white/20"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>

            {/* Up/Down Swipe Indicators */}
            <div className="absolute right-3 top-24 z-20 flex flex-col items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-[#FF3333] transition-colors"
                title="Previous Reel"
              >
                <ChevronUp className="w-4 h-4" />
              </button>

              <div className="text-[10px] font-mono text-white/80 rotate-90 my-2 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-[#FF3333]" />
                <span>SWIPE</span>
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:bg-[#FF3333] transition-colors"
                title="Next Reel"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Right Action Bar (Reels Style) */}
            <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-5 text-white">
              
              <button onClick={handleLike} className="flex flex-col items-center gap-1">
                <div className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                  liked[currentProject.id] ? 'bg-[#FF3333] text-white scale-110' : 'bg-black/60 text-white'
                }`}>
                  <Heart className={`w-5 h-5 ${liked[currentProject.id] ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[10px] font-mono font-bold">14.2k</span>
              </button>

              <button onClick={handleSave} className="flex flex-col items-center gap-1">
                <div className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
                  saved[currentProject.id] ? 'bg-amber-500 text-white' : 'bg-black/60 text-white'
                }`}>
                  <Bookmark className={`w-5 h-5 ${saved[currentProject.id] ? 'fill-white' : ''}`} />
                </div>
                <span className="text-[10px] font-mono font-bold">Save</span>
              </button>

              <button onClick={handleNext} className="flex flex-col items-center gap-1">
                <div className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-[#FF3333] transition-colors">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold">Next</span>
              </button>

              <div className="w-8 h-8 rounded-full border-2 border-white/40 overflow-hidden animate-spin" style={{ animationDuration: '6s' }}>
                <Disc className="w-full h-full text-[#FF3333]" />
              </div>

            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 inset-x-4 z-20 text-left text-white space-y-2 pr-14">
              <div className="flex items-center gap-2">
                <img
                  src={currentProject.clientAvatar}
                  alt={currentProject.client}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-[#FF3333]"
                />
                <span className="text-xs font-extrabold truncate">{currentProject.client}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF3333] font-bold">EDITKARO MASTER</span>
              </div>

              <p className="text-xs font-medium line-clamp-2 leading-snug drop-shadow-md">
                {currentProject.title} — {currentProject.description}
              </p>

              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold pt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Retention: {currentProject.retention}</span>
                <span className="text-white/60">• Views: {currentProject.views}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Side Details Panel */}
        <div className="max-w-sm p-6 rounded-3xl bg-[#131318] border border-[#26242E] shadow-xl text-left space-y-4 text-[#F4F0EA]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold">
            <span>ACTIVE REEL ANALYSIS</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[#9E9BA8] uppercase">Client / Brand</span>
              <div className="flex items-center gap-2 mt-1">
                <img src={currentProject.clientAvatar} alt="" referrerPolicy="no-referrer" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-bold text-[#F4F0EA]">{currentProject.client}</span>
                <span className="text-xs text-[#FF3333] font-mono font-bold">{currentProject.categoryLabel}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#F4F0EA] mb-1">{currentProject.title}</h4>
              <p className="text-xs text-[#9E9BA8] leading-relaxed">{currentProject.description}</p>
            </div>

            {/* Retention Stats */}
            <div className="p-4 rounded-2xl bg-[#0B0B0E] border border-[#26242E] space-y-1.5">
              <div className="text-xs font-mono font-bold text-[#FF3333] uppercase">Retention Metric</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">{currentProject.retention}</div>
              <div className="text-xs text-[#9E9BA8]">Total Organic Views: <span className="text-[#F4F0EA] font-bold">{currentProject.views}</span></div>
            </div>

            {/* Editor Technique */}
            <div className="text-xs text-[#F4F0EA] font-mono bg-[#0B0B0E] p-3 rounded-xl border border-[#26242E]">
              <span className="text-[#FF3333] font-bold block mb-1">Editkaro Formula:</span>
              {currentProject.editorNotes}
            </div>

            <button
              onClick={() => {
                playTick();
                onOpenBookingWithProject(currentProject);
              }}
              className="w-full py-3.5 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-xs tracking-wide shadow-lg shadow-[#FF3333]/30 transition-all border border-[#FF3333]/40"
            >
              Order Similar Reel Edit
            </button>
          </div>
        </div>

      </div>

    </motion.section>
  );
};

export default MobileReelSimulator;
