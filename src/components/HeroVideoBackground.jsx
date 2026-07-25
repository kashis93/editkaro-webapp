import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors } from 'lucide-react';

const MONTAGE_CLIPS = [
  {
    id: 'short-form',
    styleName: 'Short-Form Vertical',
    label: 'Viral Retention Hook',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    badge: 'KINETIC CAPTIONS',
    hudText: '⚡ 3-SEC HOOK • VELOCITY CUT ⚡',
    accentColor: '#FF3333'
  },
  {
    id: 'gaming',
    styleName: 'Gaming Highlight',
    label: '120 FPS Clutch Edit',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    badge: '3D HUD OVERLAY',
    hudText: '🎯 MOTION TRACKING • KILL FEED 🎯',
    accentColor: '#00F0FF'
  },
  {
    id: 'anime',
    styleName: 'Anime Motion Edit',
    label: 'Kinetic Beat-Sync',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    badge: 'MOTION LINES',
    hudText: '✨ GLOW EFFECT • BEAT MATCH ✨',
    accentColor: '#A855F7'
  },
  {
    id: 'ecommerce',
    styleName: 'eCommerce Product',
    label: 'Commercial Studio',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4',
    badge: '3D PRODUCT TAG',
    hudText: '🛒 HIGH-CONVERSION AD 🛒',
    accentColor: '#F59E0B'
  },
  {
    id: 'cinematic',
    styleName: 'Color-Graded Shot',
    label: 'RAW Teal & Orange',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    badge: 'DAVINCI HDR',
    hudText: '🎬 S-LOG3 RAW • FILM GRAIN 🎬',
    accentColor: '#10B981'
  }
];

export const HeroVideoBackground = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [frames, setFrames] = useState(14);
  const [seconds, setSeconds] = useState(0);
  const [cutSpeed, setCutSpeed] = useState(700); // 0.7 seconds fast montage cut

  // Timecode Ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrames((prev) => {
        if (prev >= 29) {
          setSeconds((s) => (s >= 7 ? 0 : s + 1));
          return 0;
        }
        return prev + 1;
      });
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Rapid Montage Loop (0.5s - 0.8s cuts)
  useEffect(() => {
    if (!isPlaying) return;

    const montageInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % MONTAGE_CLIPS.length);
        setIsGlitching(false);
      }, 90);
    }, cutSpeed);

    return () => clearInterval(montageInterval);
  }, [isPlaying, cutSpeed]);

  const activeClip = MONTAGE_CLIPS[currentIdx];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0B0B0E] pointer-events-none select-none z-0">
      
      {/* 1. Base Video Montage Frame */}
      <div className={`relative w-full h-full transition-transform duration-75 ${isGlitching ? 'scale-[1.03] translate-x-1 -translate-y-1 filter contrast-200 saturate-200' : 'scale-100'}`}>
        <video
          key={activeClip.id}
          src={activeClip.videoUrl}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className={`w-full h-full object-cover opacity-45 mix-blend-luminosity filter brightness-90 contrast-125 transition-opacity duration-150 ${isGlitching ? 'opacity-70 blur-[1px]' : ''}`}
        />

        {/* RGB Split Glitch Effect Layer on Cut */}
        {isGlitching && (
          <div className="absolute inset-0 bg-[#FF3333]/20 mix-blend-screen pointer-events-none translate-x-2 animate-pulse" />
        )}
      </div>

      {/* 2. Warm Ember-Orange Ambient Backdrop Glare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#FF3333]/20 via-amber-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* 3. Subtle Film Grain & VHS Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(11,11,14,0.85)_80%,rgba(11,11,14,1)_100%)] z-10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-25 z-10" />

      {/* 4. Vignette Dark Mask ensuring top text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E]/90 via-[#0B0B0E]/60 to-[#0B0B0E] pointer-events-none z-10" />

      {/* 5. HUD Video Craft Indicators (Timecode, Clip HUD, Speed Ramping) */}
      <div className="absolute inset-x-6 top-6 bottom-6 pointer-events-none flex flex-col justify-between z-20 font-mono text-[11px] text-[#F4F0EA]">
        
        {/* Top Indicators */}
        <div className="flex items-center justify-between opacity-80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3333] animate-ping" />
            <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md font-bold text-[#FF3333]">
              EDITKARO SHOWREEL LOOP • 8S MONTAGE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md text-cyan-400 font-bold">
              CUT SPEED: {(cutSpeed / 1000).toFixed(1)}s RAPID
            </span>
            <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md text-emerald-400 font-bold">
              1920x1080 • 60 FPS
            </span>
          </div>
        </div>

        {/* Live Active Clip Style Overlay Indicator */}
        <div className="self-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClip.id}
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#FF3333]/40 text-white shadow-2xl backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeClip.accentColor }} />
              <span className="font-extrabold text-xs tracking-wider uppercase text-[#FF3333]">
                {activeClip.styleName}
              </span>
              <span className="text-[#9E9BA8]">•</span>
              <span className="text-[10px] text-white/90 font-bold">
                {activeClip.badge}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Ticking Timecode & Controls Overlay */}
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Ticking Timecode */}
          <div className="bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md font-bold text-emerald-400 flex items-center gap-2 shadow-xl">
            <Scissors className="w-3.5 h-3.5 text-[#FF3333]" />
            <span>TC: 00:00:0{seconds}:{frames < 10 ? `0${frames}` : frames}</span>
          </div>

          {/* Interactive Montage Speed Controls */}
          <div className="flex items-center gap-2 bg-black/80 p-1 rounded-xl border border-white/10 backdrop-blur-md text-[10px]">
            <span className="px-2 text-[#9E9BA8] font-bold hidden sm:inline">Montage Speed:</span>
            <button
              onClick={() => setCutSpeed(500)}
              className={`px-2 py-1 rounded-md transition-all ${cutSpeed === 500 ? 'bg-[#FF3333] text-white font-bold' : 'text-[#9E9BA8] hover:text-white'}`}
            >
              0.5s Fast
            </button>
            <button
              onClick={() => setCutSpeed(700)}
              className={`px-2 py-1 rounded-md transition-all ${cutSpeed === 700 ? 'bg-[#FF3333] text-white font-bold' : 'text-[#9E9BA8] hover:text-white'}`}
            >
              0.7s Standard
            </button>
            <button
              onClick={() => setCutSpeed(1000)}
              className={`px-2 py-1 rounded-md transition-all ${cutSpeed === 1000 ? 'bg-[#FF3333] text-white font-bold' : 'text-[#9E9BA8] hover:text-white'}`}
            >
              1.0s Cinematic
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HeroVideoBackground;
