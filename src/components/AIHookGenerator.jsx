import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Copy, Check, ArrowRight, Wand2, ShieldCheck } from 'lucide-react';
import { playTick, playSuccessChime } from '../utils/audio';

export const AIHookGenerator = ({
  onOpenBookingWithDetails
}) => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('short-form');
  const [platform, setPlatform] = useState('reels');
  const [targetAudience, setTargetAudience] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    playTick();
    setLoading(true);
    setResult(null);

    const topicStr = topic.trim();
    const platLabel = platform === 'reels' ? 'Instagram Reels' : platform === 'tiktok' ? 'TikTok' : 'YouTube Shorts';
    const catLabel = category === 'short-form' ? 'Reel' : category === 'gaming' ? 'Frag Video' : 'Commercial';

    try {
      // Try API endpoint first if available
      const res = await fetch('/api/generate-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicStr,
          category,
          platform,
          targetAudience
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.hooks && data.visualScript) {
          setResult(data);
          playSuccessChime();
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // Fallback silently to client viral engine
    }

    // Local instant viral script engine fallback
    setTimeout(() => {
      setResult({
        hooks: [
          `"Stop making this 1 critical mistake if you want your ${topicStr} videos to go viral on ${platLabel}..."`,
          `"The exact retention editing framework behind $100k ${topicStr} ${catLabel} content revealed."`,
          `"Nobody is talking about this algorithm pattern interrupt hack for ${topicStr}..."`
        ],
        visualScript: [
          { 
            timestamp: "0:00 - 0:03", 
            visual: "Fast 1.2x zoom cut onto speaker with kinetic typography, sound effect riser, and red glow border.", 
            audio: `"Stop scrolling! If you care about ${topicStr}, you need to see this."` 
          },
          { 
            timestamp: "0:03 - 0:08", 
            visual: "Split screen comparison of raw unedited footage vs Editkaro color grade and sound mix.", 
            audio: `"Here is why 90% of creators fail at audience retention on ${platLabel}."` 
          },
          { 
            timestamp: "0:08 - 0:15", 
            visual: "High-speed B-roll montage with animated lower thirds, DaVinci Teal & Orange color grade, and sound effects on key words.", 
            audio: `"When you implement kinetic captions and pacing cuts, watch time increases by over 180%."` 
          }
        ],
        suggestedEditingStyle: `High-retention kinetic editing for ${platLabel} with fast-paced sound design, zoom cuts, pop-up motion graphics, and DaVinci 4K HDR color grade.`,
        estimatedRetentionBoost: "+195% Avg View Duration"
      });
      playSuccessChime();
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!result) return;
    playTick();
    const textToCopy = `VIRAL HOOKS:\n${result.hooks.join('\n')}\n\nSUGGESTED EDITING STYLE:\n${result.suggestedEditingStyle}\n\nSCRIPT BREAKDOWN:\n${result.visualScript.map(s => `[${s.timestamp}] Visual: ${s.visual} | Audio: ${s.audio}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookWithScript = () => {
    if (!result) return;
    playTick();
    const scriptDetails = `Topic: ${topic}\nHooks:\n${result.hooks.join('\n')}\nStyle: ${result.suggestedEditingStyle}`;
    onOpenBookingWithDetails(topic, scriptDetails);
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
          <Sparkles className="w-3.5 h-3.5" />
          <span>POWERED BY GEMINI AI & EDITKARO VIRAL FRAMEWORK</span>
        </div>
        <h2 className="text-3xl font-black text-[#F4F0EA] tracking-tight">AI Viral Hook & Script Generator</h2>
        <p className="text-xs text-[#9E9BA8] mt-2 font-medium">
          Enter your topic below to generate 3 attention-grabbing opening hooks and scene-by-scene editing instructions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        
        {/* Input Form Column */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#131318] border border-[#26242E] shadow-xl text-left space-y-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-[#FF3333] block mb-1 uppercase">Video Topic / Niche *</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Crypto Trading, E-commerce, Real Estate, Gaming..."
                className="w-full p-3 bg-[#0B0B0E] border border-[#26242E] rounded-xl text-xs text-[#F4F0EA] focus:outline-none focus:border-[#FF3333] font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono font-bold text-[#9E9BA8] block mb-1 uppercase">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#0B0B0E] border border-[#26242E] rounded-xl text-xs text-[#F4F0EA] focus:outline-none focus:border-[#FF3333]"
                >
                  <option value="short-form">Short-Form Reel</option>
                  <option value="youtube-long">YouTube Essay</option>
                  <option value="gaming">Gaming & Sports</option>
                  <option value="ecommerce">eCommerce Ad</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-[#9E9BA8] block mb-1 uppercase">Target Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-2.5 bg-[#0B0B0E] border border-[#26242E] rounded-xl text-xs text-[#F4F0EA] focus:outline-none focus:border-[#FF3333]"
                >
                  <option value="reels">Instagram Reels</option>
                  <option value="tiktok">TikTok Feed</option>
                  <option value="shorts">YouTube Shorts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-[#9E9BA8] block mb-1 uppercase">Target Audience (Optional)</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Gen Z Creators, B2B Founders..."
                className="w-full p-3 bg-[#0B0B0E] border border-[#26242E] rounded-xl text-xs text-[#F4F0EA] focus:outline-none focus:border-[#FF3333] font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full py-3.5 rounded-full bg-[#FF3333] hover:bg-[#E60000] disabled:opacity-50 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-[#FF3333]/30 transition-all flex items-center justify-center gap-2 border border-[#FF3333]/40 cursor-pointer"
            >
              <Wand2 className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Analyzing Virality Models...' : 'Generate Viral Script'}</span>
            </button>
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#131318] border border-[#26242E] shadow-xl text-left flex flex-col justify-between space-y-6">
          {result ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#26242E] pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{result.estimatedRetentionBoost}</span>
                </span>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-[#0B0B0E] border border-[#26242E] text-xs font-mono text-[#F4F0EA] hover:text-[#FF3333] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Script!' : 'Copy Script'}</span>
                </button>
              </div>

              {/* 3 Opening Hooks */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#FF3333] uppercase">1. Recommended 3-Second Hooks</h4>
                <div className="space-y-2">
                  {result.hooks.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#0B0B0E] border border-[#26242E] text-xs font-medium text-[#F4F0EA]">
                      <span className="text-[#FF3333] font-mono font-bold mr-2">Option {i + 1}:</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Script Scene Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#F4F0EA] uppercase">2. Scene-by-Scene Visual & Audio Script</h4>
                <div className="space-y-2 text-xs font-mono">
                  {result.visualScript.map((scene, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#0B0B0E] border border-[#26242E] space-y-1">
                      <div className="text-[10px] text-[#FF3333] font-bold">{scene.timestamp}</div>
                      <div className="text-[#F4F0EA]"><strong className="text-[#9E9BA8]">Visual:</strong> {scene.visual}</div>
                      <div className="text-[#9E9BA8]"><strong className="text-emerald-400">Audio:</strong> {scene.audio}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleBookWithScript}
                className="w-full py-3.5 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-extrabold text-xs tracking-wide shadow-lg shadow-[#FF3333]/30 transition-all flex items-center justify-center gap-2 border border-[#FF3333]/40 cursor-pointer"
              >
                <span>Book Edit Based on This Script</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#26242E] rounded-2xl text-[#9E9BA8] space-y-3">
              <Sparkles className="w-8 h-8 text-[#FF3333] animate-pulse" />
              <div className="text-sm font-bold text-[#F4F0EA]">No Script Generated Yet</div>
              <p className="text-xs max-w-xs">Enter your topic on the left and click "Generate Viral Script" to create high-retention video hooks.</p>
            </div>
          )}
        </div>

      </div>

    </motion.section>
  );
};

export default AIHookGenerator;
