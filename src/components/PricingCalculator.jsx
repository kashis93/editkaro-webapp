import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, Zap, Clock, ShieldCheck } from 'lucide-react';
import { playTick } from '../utils/audio';

export const PricingCalculator = ({
  onOpenBookingWithQuote
}) => {
  const [videoType, setVideoType] = useState('Short-Form Reel (Reels/TikTok/Shorts)');
  const [quantity, setQuantity] = useState(4); // 4 videos
  const [turnaround, setTurnaround] = useState('24h');
  const [motionGraphics, setMotionGraphics] = useState(true);
  const [subtitles, setSubtitles] = useState(true);
  const [soundDesign, setSoundDesign] = useState(true);
  const [thumbnail, setThumbnail] = useState(true);

  // Base price per video
  let basePrice = 45; // default for shorts
  if (videoType.includes('Long-Form') || videoType.includes('Documentary')) basePrice = 120;
  if (videoType.includes('Gaming') || videoType.includes('Football') || videoType.includes('Anime')) basePrice = 60;
  if (videoType.includes('Commercial') || videoType.includes('eCommerce')) basePrice = 85;

  let unitPrice = basePrice;
  if (motionGraphics) unitPrice += 15;
  if (subtitles) unitPrice += 10;
  if (soundDesign) unitPrice += 15;
  if (thumbnail) unitPrice += 15;

  if (turnaround === '24h') unitPrice += 20;

  let subtotal = unitPrice * quantity;
  // Apply bundle discount for 8+ or 12+
  let discount = 0;
  if (quantity >= 12) discount = 0.20; // 20% off
  else if (quantity >= 8) discount = 0.15; // 15% off
  else if (quantity >= 4) discount = 0.10; // 10% off

  const finalTotal = Math.round(subtotal * (1 - discount));

  const handleBook = () => {
    playTick();
    const summary = `${quantity}x ${videoType} (${turnaround} Turnaround) - Addons: ${
      [
        motionGraphics && 'Motion FX',
        subtitles && 'Kinetic Captions',
        soundDesign && 'SFX Mixing',
        thumbnail && 'Thumbnail'
      ].filter(Boolean).join(', ')
    }`;
    onOpenBookingWithQuote(summary, finalTotal);
  };

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
          <Calculator className="w-3.5 h-3.5" />
          <span>TRANSPARENT INSTANT PRICING</span>
        </div>
        <h2 className="text-3xl font-black text-[#F4F0EA] tracking-tight">Project Scope & Instant Quote Calculator</h2>
        <p className="text-xs text-[#9E9BA8] mt-2 font-medium">
          Select your editing package parameters to calculate your estimated cost with bulk volume discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#131318] border border-[#26242E] shadow-xl space-y-6 text-[#F4F0EA]">
          
          {/* Video Type Selection */}
          <div>
            <label className="text-xs font-mono font-bold text-[#FF3333] block mb-2 uppercase">1. Select Video Format</label>
            <select
              value={videoType}
              onChange={(e) => { playTick(); setVideoType(e.target.value); }}
              className="w-full p-3 bg-[#0B0B0E] border border-[#26242E] rounded-xl text-xs text-[#F4F0EA] focus:outline-none focus:border-[#FF3333] font-medium"
            >
              <option value="Short-Form Reel (Reels/TikTok/Shorts)">Short-Form Reel (Reels/TikTok/Shorts) - Base $45</option>
              <option value="YouTube Long-Form Essay">YouTube Long-Form Essay (10-20 min) - Base $120</option>
              <option value="Gaming & Frag Edit">Gaming & Frag Montage - Base $60</option>
              <option value="Football & Sports Edit">Football & Sports Edit - Base $60</option>
              <option value="Anime AMV Beat-Sync">Anime AMV Beat-Sync - Base $60</option>
              <option value="eCommerce UGC Product Ad">eCommerce UGC Product Ad - Base $85</option>
              <option value="Vox Documentary Style">Vox Documentary Style - Base $120</option>
              <option value="Commercial Brand TVC">Commercial Brand TVC - Base $85</option>
            </select>
          </div>

          {/* Quantity Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold text-[#F4F0EA]">2. Monthly Video Volume</label>
              <span className="text-xs font-mono text-[#FF3333] font-bold">{quantity} Videos / Month</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={quantity}
              onChange={(e) => { playTick(); setQuantity(parseInt(e.target.value)); }}
              className="w-full accent-[#FF3333] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#9E9BA8] font-mono mt-1">
              <span>1 Video</span>
              <span>8 Videos (15% Off)</span>
              <span>12+ Videos (20% Off)</span>
            </div>
          </div>

          {/* Turnaround Time */}
          <div>
            <label className="text-xs font-mono font-bold text-[#F4F0EA] block mb-2">3. Turnaround Speed</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { playTick(); setTurnaround('24h'); }}
                className={`p-3 rounded-2xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                  turnaround === '24h'
                    ? 'bg-[#FF3333] text-white border-[#FF3333] shadow-md shadow-[#FF3333]/30'
                    : 'bg-[#0B0B0E] text-[#9E9BA8] border-[#26242E] hover:text-[#F4F0EA]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>24h Express Delivery</span>
              </button>

              <button
                type="button"
                onClick={() => { playTick(); setTurnaround('48h'); }}
                className={`p-3 rounded-2xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                  turnaround === '48h'
                    ? 'bg-[#FF3333] text-white border-[#FF3333] shadow-md shadow-[#FF3333]/30'
                    : 'bg-[#0B0B0E] text-[#9E9BA8] border-[#26242E] hover:text-[#F4F0EA]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Standard 48h Delivery</span>
              </button>
            </div>
          </div>

          {/* Add-on Features */}
          <div>
            <label className="text-xs font-mono font-bold text-[#F4F0EA] block mb-2">4. Add-on Production Polish</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B0E] border border-[#26242E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={motionGraphics}
                  onChange={(e) => { playTick(); setMotionGraphics(e.target.checked); }}
                  className="accent-[#FF3333]"
                />
                <span>Motion Graphics (+$15)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B0E] border border-[#26242E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={subtitles}
                  onChange={(e) => { playTick(); setSubtitles(e.target.checked); }}
                  className="accent-[#FF3333]"
                />
                <span>Kinetic Captions (+$10)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B0E] border border-[#26242E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={soundDesign}
                  onChange={(e) => { playTick(); setSoundDesign(e.target.checked); }}
                  className="accent-[#FF3333]"
                />
                <span>SFX Sound Design (+$15)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0B0B0E] border border-[#26242E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={thumbnail}
                  onChange={(e) => { playTick(); setThumbnail(e.target.checked); }}
                  className="accent-[#FF3333]"
                />
                <span>Custom Cover Thumbnail (+$15)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Summary Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#131318] border border-[#26242E] shadow-2xl flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#26242E] pb-3">
              <span className="text-xs font-mono font-bold text-[#FF3333] uppercase">Quote Summary</span>
              <span className="text-[10px] font-mono text-[#9E9BA8] font-bold">100% Satisfaction Guaranteed</span>
            </div>

            <div className="space-y-2 text-xs font-mono text-[#9E9BA8]">
              <div className="flex justify-between">
                <span>Selected Format:</span>
                <span className="text-[#F4F0EA] font-bold">{videoType.split('(')[0]}</span>
              </div>

              <div className="flex justify-between">
                <span>Volume:</span>
                <span className="text-[#F4F0EA] font-bold">{quantity} Videos / Month</span>
              </div>

              <div className="flex justify-between">
                <span>Per Video Rate:</span>
                <span className="text-[#F4F0EA] font-bold">${unitPrice} / video</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Volume Discount ({discount * 100}% Off):</span>
                  <span>-${Math.round(subtotal * discount)}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#26242E]">
              <div className="text-[10px] font-mono text-[#9E9BA8] uppercase">Total Estimated Monthly Quote</div>
              <div className="text-4xl font-display font-black text-[#FF3333] mt-1">
                ${finalTotal}
                <span className="text-xs text-[#9E9BA8] font-mono font-normal ml-1">/ mo</span>
              </div>
            </div>

            <ul className="text-xs text-[#9E9BA8] space-y-1.5 font-mono pt-2">
              <li className="flex items-center gap-1.5 text-[#F4F0EA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3333]" />
                <span>Includes DaVinci 4K HDR Color Grading</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#F4F0EA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3333]" />
                <span>Unlimited Revision Policy</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#F4F0EA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF3333]" />
                <span>Dedicated Slack/WhatsApp Channel</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-3.5 px-6 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-xs tracking-wide shadow-lg shadow-[#FF3333]/30 transition-all flex items-center justify-center gap-2 border border-[#FF3333]/40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Monthly Package with This Quote</span>
          </button>
        </div>

      </div>

    </motion.section>
  );
};

export default PricingCalculator;
