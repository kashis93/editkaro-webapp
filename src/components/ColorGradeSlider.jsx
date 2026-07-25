import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders } from 'lucide-react';
import { playTick } from '../utils/audio';

const PRESETS = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon Tokyo',
    category: 'Nighttime & Sci-Fi',
    rawImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80&sat=-80&con=20',
    gradedImg: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    lutName: 'Editkaro_CyberNeon_v4.cube',
    software: 'DaVinci Resolve Studio 19',
    highlights: ['Magenta Shadow Tinting', 'Neon Sign Isolation Glow', 'Film Grain 35mm', 'Highlight Roll-off']
  },
  {
    id: 'teal-orange',
    name: 'Blockbuster Teal & Orange',
    category: 'Cinematic Narrative',
    rawImg: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80&sat=-80',
    gradedImg: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80',
    lutName: 'Editkaro_Hollywood_TealOrange.cube',
    software: 'Premiere Pro Lumetri',
    highlights: ['Skin Tone Hue Lock', 'Shadow Cyan Shift', 'Midtone Warmth', 'Anamorphic Flare']
  },
  {
    id: 'anime-vibrant',
    name: 'Anime Golden Hour',
    category: 'AMV & Stylized Edits',
    rawImg: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80&sat=-70',
    gradedImg: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    lutName: 'Editkaro_Anime_Vibe.cube',
    software: 'After Effects Magic Bullet',
    highlights: ['High Saturation Punch', 'Soft Bloom Rays', 'Primary Color Boost', 'Dynamic Contrast']
  },
  {
    id: 'documentary',
    name: 'Moody History Essay',
    category: 'Long-Form & History',
    rawImg: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80&sat=-85',
    gradedImg: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    lutName: 'Editkaro_Docu_Matte.cube',
    software: 'DaVinci Resolve Studio 19',
    highlights: ['Subtle Sepia Warmth', 'Faded Blacks', 'Archive Grain Masking', 'Clean Contrast']
  }
];

export const ColorGradeSlider = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100

  const handleSliderMove = (e) => {
    setSliderPos(parseFloat(e.target.value));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="py-12 px-4 max-w-7xl mx-auto space-y-8 text-[#F4F0EA]"
    >
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 text-xs font-mono font-bold mb-3 shadow-md">
          <Sliders className="w-3.5 h-3.5" />
          <span>COLOR GRADING COMPARISON STUDIO</span>
        </div>
        <h2 className="text-3xl font-black text-[#F4F0EA] tracking-tight">RAW LOG vs Graded 4K HDR</h2>
        <p className="text-xs text-[#9E9BA8] mt-2 font-medium">
          Drag the center slider left and right to compare raw camera log footage with Editkaro's final cinema color grade.
        </p>
      </div>

      {/* Preset Selector Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {PRESETS.map((preset) => {
          const isActive = selectedPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                playTick();
                setSelectedPreset(preset);
                setSliderPos(50);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border ${
                isActive
                  ? 'bg-[#FF3333] text-white border-[#FF3333] shadow-lg shadow-[#FF3333]/30 scale-105'
                  : 'bg-[#131318] text-[#9E9BA8] hover:text-[#F4F0EA] border-[#26242E]'
              }`}
            >
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Split Screen Canvas Slider */}
      <div className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden border-2 border-[#26242E] shadow-2xl bg-[#0B0B0E] select-none group">
        
        {/* Graded Image (Background) */}
        <img
          src={selectedPreset.gradedImg}
          alt="Graded Footage"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* RAW Image (Clipped Overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl z-20"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={selectedPreset.rawImg}
            alt="RAW Footage"
            referrerPolicy="no-referrer"
            className="absolute inset-y-0 left-0 h-full object-cover max-w-none"
            style={{ width: '100%', minWidth: '100%' }}
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20">
            RAW CAMERA LOG (BEFORE)
          </span>
        </div>

        {/* Graded Label */}
        <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#FF3333] text-[10px] font-mono font-bold text-white shadow-lg shadow-[#FF3333]/30 border border-white/20">
          EDITKARO 4K HDR GRADED (AFTER)
        </span>

        {/* Center Divider Handle Bar */}
        <div
          className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-ew-resize pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-[#FF3333]">
            ↔
          </div>
        </div>

        {/* Interactive Invisible Input Range Overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSliderMove}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
        />

      </div>

      {/* Preset Spec Details */}
      <div className="max-w-5xl mx-auto p-6 rounded-3xl bg-[#131318] border border-[#26242E] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl text-[#F4F0EA]">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#FF3333] uppercase">Preset Profile</span>
          <h3 className="text-lg font-bold text-[#F4F0EA] mt-0.5">{selectedPreset.name}</h3>
          <p className="text-xs text-[#9E9BA8] mt-1">Category: {selectedPreset.category}</p>
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold text-[#FF3333] uppercase">Grading Suite</span>
          <p className="text-sm font-bold text-[#F4F0EA] mt-0.5">{selectedPreset.software}</p>
          <p className="text-xs font-mono text-[#9E9BA8] mt-1">LUT: {selectedPreset.lutName}</p>
        </div>

        <div>
          <span className="text-[10px] font-mono font-bold text-[#FF3333] uppercase">Key Node Techniques</span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {selectedPreset.highlights.map((h, i) => (
              <span key={i} className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#0B0B0E] text-[#F4F0EA] border border-[#26242E]">
                ✓ {h}
              </span>
            ))}
          </div>
        </div>
      </div>

    </motion.section>
  );
};

export default ColorGradeSlider;
