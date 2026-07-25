import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import heroSectionVideo from '../../assets/heosection.mp4';
import { 
  Play, 
  Pause,
  ArrowRight,
  Scissors,
  Layers,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playTick, playWoosh } from '../utils/audio';

const SHOWREEL_CLIPS = [
  {
    id: 'hero-main',
    category: 'Agency Hero Edit',
    title: 'Editkaro Master Showcase Video',
    videoUrl: heroSectionVideo,
    sfx: 'Mastered Studio Audio + Kinetic SFX'
  },
  {
    id: 'short-form',
    category: 'Short Form / Reels',
    title: 'Alex Hormozi Style High-Retention Edit',
    videoUrl: heroSectionVideo,
    sfx: 'Sub-bass Impact + Kinetic Subtitles'
  },
  {
    id: 'gaming',
    category: 'Gaming Frag / Esports',
    title: 'Valorant Clutch Motion Tracking',
    videoUrl: heroSectionVideo,
    sfx: '3D Sound Design + Kill FX'
  }
];

export const HeroBanner = ({
  currentView,
  setCurrentView,
  onOpenBooking
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentClipIdx, setCurrentClipIdx] = useState(0);
  const [timecodeFrame, setTimecodeFrame] = useState(12);
  const videoRef = useRef(null);

  // Timecode Ticker
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimecodeFrame((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 1000 / 30);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Attempt unmuted autoplay with fallback
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    }
  }, []);

  const activeClip = SHOWREEL_CLIPS[currentClipIdx];

  const toggleSound = () => {
    playTick();
    const video = videoRef.current;
    if (video) {
      const nextMuteState = !isMuted;
      video.muted = nextMuteState;
      setIsMuted(nextMuteState);
      if (!nextMuteState && video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    playTick();
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 bg-[#0B0B0E]">
      {/* Background Backlight Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-[#FF3333]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Clean 2-Column Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Clean & Minimalist (Headline, Tagline & 2 Buttons) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Impactful Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-[#F4F0EA] tracking-tight leading-[1.08]"
            >
              Transform Your Videos with <br />
              <span className="text-[#FF3333] drop-shadow-[0_0_30px_rgba(255,51,51,0.5)]">
                EditKaro.in
              </span>
            </motion.h1>

            {/* Clean Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-[#9E9BA8] max-w-lg font-normal leading-relaxed"
            >
              Professional video editing services that bring your vision to life.
            </motion.p>

            {/* 2 Action Buttons ONLY */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  playTick();
                  const gridEl = document.getElementById('cinema-deck') || document.getElementById('portfolio-grid');
                  if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
                  else setCurrentView('grid');
                }}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-sm tracking-wide shadow-xl shadow-[#FF3333]/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-[#FF3333]/40 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>View Our Work</span>
              </button>

              <button
                onClick={() => {
                  playWoosh();
                  const el = document.getElementById('services-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else setCurrentView('grid');
                }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#131318] hover:bg-[#1A1A22] border-2 border-[#26242E] hover:border-[#FF3333] text-[#F4F0EA] font-extrabold text-sm transition-all shadow-md group cursor-pointer"
              >
                <span>Services</span>
                <ArrowRight className="w-4 h-4 text-[#9E9BA8] group-hover:text-[#FF3333] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Full Pro Workstation NLE Player UI (Restored!) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 w-full"
          >
            <div className="rounded-2xl bg-[#131318] border-2 border-[#26242E] hover:border-[#FF3333]/50 shadow-2xl overflow-hidden text-left shadow-[#FF3333]/10">
              
              {/* NLE Window Title Bar */}
              <div className="bg-[#0B0B0E] px-4 py-3 border-b border-[#26242E] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 mr-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#F4F0EA] flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-[#FF3333]" />
                    SHOWCASE PLAYER
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border transition-all ${
                    !isMuted 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse' 
                      : 'bg-[#131318] text-[#9E9BA8] border-[#26242E]'
                  }`}>
                    {!isMuted ? '🔊 AUDIO ON' : 'AUDIO OFF'}
                  </span>
                </div>
              </div>

              {/* Video Monitor */}
              <div className="relative aspect-video max-h-[290px] bg-black overflow-hidden flex items-center justify-center group">
                <video
                  ref={videoRef}
                  id="hero-nle-video"
                  key={activeClip.videoUrl}
                  src={activeClip.videoUrl}
                  poster="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                />

                {/* Film Overlay Aesthetic */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] z-10" />

                {/* HUD Monitoring Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="px-2.5 py-0.5 rounded bg-black/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      TC: 00:00:0{currentClipIdx + 1}:{timecodeFrame < 10 ? `0${timecodeFrame}` : timecodeFrame}
                    </span>

                    <span className="px-2.5 py-0.5 rounded bg-black/80 text-[#FF3333] border border-[#FF3333]/40 backdrop-blur-md">
                      4K 60FPS
                    </span>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="flex items-center justify-between pointer-events-auto bg-black/85 p-2 rounded-xl backdrop-blur-md border border-white/10 shadow-lg text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg bg-[#FF3333] text-white hover:bg-[#E60000] transition-colors"
                        title={isPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      </button>

                      {/* Sound Toggle Button */}
                      <button
                        onClick={toggleSound}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                          isMuted
                            ? 'bg-[#131318] text-[#9E9BA8] border border-[#26242E] hover:text-white'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                            <span>Muted</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            <span>Audio Active</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#9E9BA8]">
                      {SHOWREEL_CLIPS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentClipIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${currentClipIdx === idx ? 'bg-[#FF3333] w-4' : 'bg-white/30'}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Multi-Track Editor Timeline Strip */}
              <div className="bg-[#0B0B0E] p-3 border-t border-[#26242E] space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center justify-between text-[#9E9BA8] pb-1 border-b border-[#26242E]/60">
                  <span className="flex items-center gap-1.5 text-[#F4F0EA] font-bold">
                    <Layers className="w-3.5 h-3.5 text-[#FF3333]" />
                    MASTER TIMELINE
                  </span>
                  <span className="text-[#FF3333] font-bold">{activeClip.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 text-[#9E9BA8] font-bold">V1</span>
                  <div className="flex-1 h-4.5 bg-[#131318] rounded border border-[#26242E] overflow-hidden flex p-0.5">
                    <div className="w-full h-full rounded bg-indigo-600/90 text-white text-[8px] px-2 flex items-center justify-between font-bold">
                      <span className="truncate">4K VIDEO: {activeClip.title}</span>
                      <span className="text-[#FF3333]">● 60 FPS</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 text-[#9E9BA8] font-bold">A1</span>
                  <div className="flex-1 h-4.5 bg-[#131318] rounded border border-[#26242E] overflow-hidden flex p-0.5">
                    <div className="w-full h-full rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] px-2 flex items-center justify-between font-bold">
                      <span className="truncate">AUDIO MASTER: {activeClip.sfx}</span>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-2 bg-emerald-400 animate-pulse" />
                        <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default HeroBanner;
