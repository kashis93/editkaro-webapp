import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Zap, 
  ArrowRightLeft
} from 'lucide-react';
import { playTick } from '../utils/audio';
import { PROJECTS } from '../data/projects';

export const PlatformComparisonStudio = ({
  onOpenBooking
}) => {
  const [activePlatform, setActivePlatform] = useState('tiktok');
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Sample project for comparison
  const project = PROJECTS.find(p => p.category === 'short-form') || PROJECTS[0];

  const platformSpecs = {
    tiktok: {
      name: 'TikTok Feed Algorithm',
      badge: 'High Velocity / Raw Hooks',
      color: 'from-cyan-600 to-[#FF3333]',
      textColor: 'text-cyan-400',
      safeBottom: 'Bottom 22% blocked by caption & music ticker',
      safeRight: 'Right 18% blocked by Like/Comment icons',
      hookRule: 'Must land visual hook within 0.8s with native text-to-speech sound cue.',
      retentionSecret: 'Use 1.2x motion zooms every 2.5 seconds to prevent swipe-away.',
      aspectRatio: '9:16 Vertical (1080 x 1920)',
      audioNorm: '-14 LUFS Peak (-1 dBTP)',
    },
    reels: {
      name: 'Instagram Reels Feed',
      badge: 'High Aesthetic / Color Grade Focus',
      color: 'from-purple-600 to-amber-500',
      textColor: 'text-purple-400',
      safeBottom: 'Bottom 28% blocked by Instagram bio & comment bar',
      safeRight: 'Right 16% blocked by audio & share button',
      hookRule: 'Requires high-contrast cover thumbnail and smooth typography pop-ins.',
      retentionSecret: 'Seamless looping transitions increase completion count by 340%.',
      aspectRatio: '9:16 Vertical (1080 x 1920)',
      audioNorm: '-16 LUFS Peak (-1.5 dBTP)',
    },
    shorts: {
      name: 'YouTube Shorts Algorithm',
      badge: 'High Retention / Story Depth',
      color: 'from-[#FF3333] to-red-700',
      textColor: 'text-[#FF3333]',
      safeBottom: 'Bottom 18% blocked by Subscribe bar & video title',
      safeRight: 'Right 14% blocked by Remix/Dislike buttons',
      hookRule: 'Clear premise setup in first 1.2s; sound effects on every text pop.',
      retentionSecret: 'B-roll pattern interrupt every 3.2 seconds prevents dropoffs.',
      aspectRatio: '9:16 Vertical (1080 x 1920)',
      audioNorm: '-14 LUFS Peak (-1 dBTP)',
    },
  };

  const currentSpec = platformSpecs[activePlatform];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      id="services-section" 
      className="py-12 px-4 max-w-7xl mx-auto space-y-8 text-[#F4F0EA]"
    >
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>2-SIDE PLATFORM & EDIT SERVICES STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F4F0EA] tracking-tight">
          TikTok vs Instagram Reels vs YouTube Shorts
        </h2>
        <p className="text-xs sm:text-sm text-[#9E9BA8] mt-2 max-w-xl mx-auto font-medium">
          One video format does <strong className="text-[#FF3333]">NOT</strong> fit all platforms. Editkaro tailors safe zones, caption positioning, audio loudness, and hook pacing for each platform's algorithm.
        </p>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {['tiktok', 'reels', 'shorts'].map((tab) => {
          const isActive = activePlatform === tab;
          const spec = platformSpecs[tab];
          return (
            <button
              key={tab}
              onClick={() => {
                playTick();
                setActivePlatform(tab);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all border ${
                isActive
                  ? 'bg-[#FF3333] text-white border-[#FF3333] shadow-lg shadow-[#FF3333]/30 scale-105'
                  : 'bg-[#131318] text-[#9E9BA8] hover:text-[#F4F0EA] border-[#26242E]'
              }`}
            >
              <Smartphone className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#FF3333]'}`} />
              <span className="uppercase">{tab}</span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-[#0B0B0E] text-[#9E9BA8]'}`}>
                {spec.badge.split('/')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Interactive Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131318] border border-[#26242E] rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Left Interactive Mobile Frame Simulator (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          <div className="relative w-[280px] sm:w-[310px] h-[540px] rounded-[36px] bg-black border-4 border-[#26242E] overflow-hidden shadow-2xl shadow-[#FF3333]/20 flex flex-col justify-between">
            
            {/* Top Notch Bar */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black/90 z-40 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#131318] border border-white/20" />
            </div>

            {/* Video Background */}
            <video
              src={project.previewVideoUrl}
              poster={project.thumbnailUrl}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dynamic UI Safe Overlay Grid */}
            {showSafeZones && (
              <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between">
                
                {/* Header Unsafe Area */}
                <div className="bg-red-500/20 border-b border-red-500/50 p-2 text-[9px] font-mono text-white text-center font-bold">
                  ⚠️ Platform Header UI Safe Zone
                </div>

                {/* Right UI Icons Block Simulator */}
                <div className="absolute right-0 top-1/3 bottom-24 w-14 bg-red-500/25 border-l border-red-500/50 flex flex-col items-center justify-center gap-4 text-white text-[9px] font-mono font-bold p-1 text-center">
                  <span>UI ICONS</span>
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                </div>

                {/* Bottom Unsafe Caption Block Simulator */}
                <div className="h-28 bg-red-500/25 border-t border-red-500/50 p-2 text-[9px] font-mono text-white flex flex-col justify-end font-bold">
                  <div>⚠️ Caption & Audio Ticker Unsafe Block</div>
                  <div className="text-[8px] opacity-80 font-normal">Editkaro text popups remain strictly ABOVE this line</div>
                </div>

              </div>
            )}

            {/* Center Caption Text Preview inside Safe Zone */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none text-center">
              <div className="inline-block px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#FF3333] text-white font-extrabold text-xs shadow-xl animate-pulse">
                "3 SECONDS TO LAND THE HOOK"
              </div>
            </div>

            {/* Mobile Controls Overlay */}
            <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between">
              <button
                onClick={() => { playTick(); setShowSafeZones(!showSafeZones); }}
                className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white flex items-center gap-1"
              >
                <Eye className="w-3 h-3 text-[#FF3333]" />
                <span>{showSafeZones ? 'Hide Safe Zone' : 'Show Safe Zone'}</span>
              </button>

              <button
                onClick={() => { playTick(); setIsMuted(!isMuted); }}
                className="p-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>

          </div>

        </div>

        {/* Right Platform Audit & Service Specs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="flex items-center justify-between border-b border-[#26242E] pb-4">
            <div>
              <span className={`text-xs font-mono font-bold uppercase ${currentSpec.textColor}`}>
                {currentSpec.name}
              </span>
              <h3 className="text-2xl font-black text-[#F4F0EA] mt-0.5">
                Algorithm Optimization Audit
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0B0B0E] border border-[#26242E] text-[#FF3333]">
              {currentSpec.aspectRatio}
            </span>
          </div>

          {/* 2-Side Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Generic Amateur Edit Problems */}
            <div className="p-4 rounded-2xl bg-[#0B0B0E] border border-red-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>Standard Amateur Edit Mistakes</span>
              </div>
              <ul className="text-xs text-[#9E9BA8] space-y-1.5 font-mono">
                <li className="text-red-300">• Subtitles cut off behind like buttons</li>
                <li className="text-red-300">• Unmastered audio blowing out speakers</li>
                <li className="text-red-300">• Slow 3s intros causing immediate swipes</li>
                <li className="text-red-300">• Dull flat phone camera color profiles</li>
              </ul>
            </div>

            {/* Editkaro Agency Solution */}
            <div className="p-4 rounded-2xl bg-[#0B0B0E] border border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Editkaro Agency Solution</span>
              </div>
              <ul className="text-xs text-[#F4F0EA] space-y-1.5 font-mono">
                <li className="text-emerald-300 font-bold">✓ 100% UI Safe-Zone layout padding</li>
                <li className="text-emerald-300 font-bold">✓ Instant 0.8s pattern hook</li>
                <li className="text-emerald-300 font-bold">✓ DaVinci 4K HDR grading</li>
                <li className="text-emerald-300 font-bold">✓ Normalized {currentSpec.audioNorm}</li>
              </ul>
            </div>

          </div>

          {/* Retention Strategy Info */}
          <div className="p-4 rounded-2xl bg-[#0B0B0E] border border-[#26242E] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF3333]">
              <Zap className="w-4 h-4" />
              <span>Platform Hook Strategy</span>
            </div>
            <p className="text-xs text-[#F4F0EA] font-mono leading-relaxed">
              {currentSpec.hookRule}
            </p>
            <div className="text-[11px] text-[#9E9BA8] border-t border-[#26242E] pt-2 mt-2 font-medium">
              <strong className="text-[#FF3333]">Secret Sauce:</strong> {currentSpec.retentionSecret}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              playTick();
              onOpenBooking();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-xs tracking-wide shadow-lg shadow-[#FF3333]/30 transition-all flex items-center justify-center gap-2 border border-[#FF3333]/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Order Platform-Optimized Edit Sample</span>
          </button>

        </div>

      </div>

    </motion.section>
  );
};

export default PlatformComparisonStudio;
