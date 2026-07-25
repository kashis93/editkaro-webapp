import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  ChevronDown, 
  Sliders, 
  Sparkles, 
  Calculator, 
  Layers, 
  Smartphone, 
  Grid, 
  Wand2,
  Play,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { playWoosh, playTick } from '../utils/audio';

export const Header = ({
  currentView,
  setCurrentView,
  onOpenBooking
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Track scroll for enhanced glassmorphism header depth
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTool = (view, customAnchorId) => {
    playWoosh();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setCurrentView(view);
    const targetId = customAnchorId || 'active-workstation-view';
    setTimeout(() => {
      scrollToSection(targetId);
    }, 120);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B0B0E]/90 backdrop-blur-2xl border-b border-[#FF3333]/25 py-2.5 shadow-2xl shadow-black/80' 
          : 'bg-[#0B0B0E]/70 backdrop-blur-xl border-b border-white/10 py-3.5'
      } px-4 sm:px-8 text-[#F4F0EA]`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative" ref={dropdownRef}>
        
        {/* Brand Logo (Left) */}
        <button
          onClick={() => { 
            playWoosh(); 
            setCurrentView('grid'); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group text-left transition-all hover:scale-105 flex-shrink-0"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF3333] via-[#E60000] to-[#FF6666] flex items-center justify-center text-white shadow-lg shadow-[#FF3333]/40 border border-white/20 group-hover:shadow-[#FF3333]/70 transition-all">
              <Play className="w-4.5 h-4.5 fill-white text-white translate-x-0.5" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0B0E] animate-pulse" />
          </div>

          <div className="flex items-center">
            <span className="font-display font-black text-2xl tracking-tight text-[#FF3333]">
              Edit
            </span>
            <span className="font-display font-black text-2xl tracking-tight text-white">
              Karo
            </span>
            <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-[#FF3333]/15 text-[#FF3333] border border-[#FF3333]/30 ml-1.5 uppercase tracking-wider hidden sm:inline-block">
              AGENCY
            </span>
          </div>
        </button>

        {/* Navigation & Contact CTA Container (Desktop) - ALL NAV ITEMS USE UNIFORM ACTIVE SELECTION STYLING */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 ml-auto">
          
          <nav className="flex items-center gap-1.5 p-1 rounded-full bg-[#131318]/90 border border-[#26242E] shadow-inner backdrop-blur-md">
            
            {/* 1. WORK */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('work')}
            >
              <button
                onClick={() => {
                  playWoosh();
                  handleSelectTool('carousel3d', 'cinema-deck');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentView === 'carousel3d' || currentView === 'grid' || currentView === 'mobile-reel'
                    ? 'bg-[#FF3333] text-white shadow-md shadow-[#FF3333]/30 border border-[#FF3333]/40'
                    : 'text-[#9E9BA8] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Work</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'work' ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* Megamenu for WORK */}
              <AnimatePresence>
                {activeDropdown === 'work' && (
                  <motion.div 
                    key="work-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-0 mt-3 w-[520px] rounded-3xl bg-[#101426]/95 border border-[#2B355A] shadow-2xl shadow-black/90 p-6 grid grid-cols-2 gap-6 z-50 text-left backdrop-blur-2xl"
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#FF3333] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <Tv className="w-3.5 h-3.5 text-[#FF3333]" />
                        <span>Portfolio Showcase</span>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleSelectTool('carousel3d', 'cinema-deck')}
                          className="w-full text-left p-3 rounded-2xl bg-[#181F38] border-2 border-[#FF3333] hover:bg-[#202A4A] transition-all group flex items-start gap-3 shadow-md"
                        >
                          <div className="p-2 rounded-xl bg-[#FF3333] text-white group-hover:scale-110 transition-transform">
                            <Tv className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-white group-hover:text-[#FF3333]">3D Cinema Deck</div>
                            <div className="text-[10px] text-[#A0A9C9] mt-0.5">3D video carousel stage</div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleSelectTool('mobile-reel', 'active-workstation-view')}
                          className="w-full text-left p-3 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:border-cyan-400 hover:bg-[#202A4A] transition-all group flex items-start gap-3 shadow-md"
                        >
                          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-cyan-400">Mobile Reel Feed</div>
                            <div className="text-[10px] text-[#A0A9C9] mt-0.5">Vertical smartphone simulator</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="border-l border-[#232B4A] pl-6 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono font-bold text-[#A0A9C9] uppercase tracking-widest mb-3">
                          Categories
                        </div>
                        <ul className="text-xs text-[#B0B8D8] space-y-2 font-mono">
                          <li className="hover:text-white cursor-pointer flex items-center gap-2" onClick={() => handleSelectTool('carousel3d', 'cinema-deck')}>
                            <span className="w-2 h-2 rounded-full bg-[#FF3333]" /> Short Form Reels & Shorts
                          </li>
                          <li className="hover:text-white cursor-pointer flex items-center gap-2" onClick={() => handleSelectTool('carousel3d', 'cinema-deck')}>
                            <span className="w-2 h-2 rounded-full bg-amber-400" /> YouTube Essays
                          </li>
                          <li className="hover:text-white cursor-pointer flex items-center gap-2" onClick={() => handleSelectTool('carousel3d', 'cinema-deck')}>
                            <span className="w-2 h-2 rounded-full bg-purple-400" /> DaVinci 4K Color Grading
                          </li>
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          playTick();
                          onOpenBooking();
                        }}
                        className="mt-4 p-3 rounded-2xl bg-[#FF3333] hover:bg-[#E60000] text-white text-xs font-mono font-bold transition-all flex items-center justify-between shadow-md"
                      >
                        <span>Book Sample Edit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. SERVICES */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
            >
              <button
                onClick={() => {
                  playWoosh();
                  handleSelectTool('platform-compare', 'services-section');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  currentView === 'platform-compare' || currentView === 'color-grade' || currentView === 'ai-generator' || currentView === 'pricing'
                    ? 'bg-[#FF3333] text-white shadow-md shadow-[#FF3333]/30 border border-[#FF3333]/40'
                    : 'text-[#9E9BA8] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* Megamenu for SERVICES */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div 
                    key="services-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] rounded-3xl bg-[#101426]/95 border border-[#2B355A] shadow-2xl shadow-black/90 p-6 grid grid-cols-2 gap-6 z-50 text-left backdrop-blur-2xl"
                  >
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono font-bold text-[#FF3333] uppercase tracking-widest mb-3">
                        Workstations
                      </div>

                      <button
                        onClick={() => handleSelectTool('color-grade', 'active-workstation-view')}
                        className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border-2 border-[#FF3333] hover:bg-[#202A4A] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-xl bg-[#FF3333] text-white">
                            <Sliders className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white group-hover:text-[#FF3333]">Color Grading Studio</span>
                        </div>
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#FF3333] text-white uppercase">LIVE</span>
                      </button>

                      <button
                        onClick={() => handleSelectTool('ai-generator', 'active-workstation-view')}
                        className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:border-amber-400 hover:bg-[#202A4A] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white group-hover:text-amber-400">AI Viral Script Generator</span>
                        </div>
                        <span className="text-[9px] font-mono text-amber-400">AI</span>
                      </button>

                      <button
                        onClick={() => handleSelectTool('platform-compare', 'services-section')}
                        className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:border-cyan-400 hover:bg-[#202A4A] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-xl bg-cyan-400/20 text-cyan-400">
                            <Layers className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white group-hover:text-cyan-400">2-Side Platform Safe Zone</span>
                        </div>
                        <span className="text-[9px] font-mono text-cyan-400">SAFEZONE</span>
                      </button>
                    </div>

                    <div className="border-l border-[#232B4A] pl-6 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono font-bold text-[#A0A9C9] uppercase tracking-widest mb-3">
                          Guarantees
                        </div>
                        <ul className="text-xs text-[#B0B8D8] space-y-2 font-mono">
                          <li className="text-white font-bold">✓ 24h Express Turnaround</li>
                          <li className="text-white font-bold">✓ DaVinci Resolve 4K HDR</li>
                          <li className="text-white font-bold">✓ Unlimited Revisions</li>
                        </ul>
                      </div>

                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          playTick();
                          onOpenBooking();
                        }}
                        className="mt-4 p-3 rounded-2xl bg-[#FF3333] hover:bg-[#E60000] text-white text-xs font-mono font-bold transition-all flex items-center justify-between shadow-md"
                      >
                        <span>Book Edit Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. TOOLS (Uses exact same active selection style) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('tools')}
            >
              <button
                onClick={() => {
                  playWoosh();
                  handleSelectTool(currentView, 'interactive-tools');
                  setActiveDropdown(activeDropdown === 'tools' ? null : 'tools');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeDropdown === 'tools'
                    ? 'bg-[#FF3333] text-white shadow-md shadow-[#FF3333]/30 border border-[#FF3333]/40'
                    : 'text-[#9E9BA8] hover:text-white hover:bg-white/5'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5 text-[#FF3333]" />
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'tools' ? 'rotate-180 text-white' : ''}`} />
              </button>

              {/* Quick Tools Dropdown */}
              <AnimatePresence>
                {activeDropdown === 'tools' && (
                  <motion.div 
                    key="tools-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full right-0 mt-3 w-[300px] rounded-3xl bg-[#101426]/95 border border-[#2B355A] shadow-2xl shadow-black/90 p-3 z-50 text-left backdrop-blur-2xl space-y-2"
                  >
                    <button
                      onClick={() => handleSelectTool('color-grade', 'active-workstation-view')}
                      className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:bg-[#202A4A] transition-colors flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-white">Color Grading Studio</span>
                      <Sliders className="w-3.5 h-3.5 text-[#FF3333]" />
                    </button>

                    <button
                      onClick={() => handleSelectTool('ai-generator', 'active-workstation-view')}
                      className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:bg-[#202A4A] transition-colors flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-white">AI Script Generator</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </button>

                    <button
                      onClick={() => handleSelectTool('pricing', 'active-workstation-view')}
                      className="w-full text-left p-2.5 rounded-2xl bg-[#181F38] border border-[#2B365A] hover:bg-[#202A4A] transition-colors flex items-center justify-between"
                    >
                      <span className="text-xs font-bold text-white">Pricing Calculator</span>
                      <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. ABOUT (Uses exact same active selection style) */}
            <button
              onClick={() => {
                playWoosh();
                scrollToSection('about-agency');
              }}
              className="px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#9E9BA8] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              About
            </button>

            {/* 5. CONTACT (Uses exact same active selection style when active, default red CTA) */}
            <button
              onClick={() => {
                playTick();
                onOpenBooking();
              }}
              className="px-5 py-2 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md shadow-[#FF3333]/30 border border-[#FF3333]/40 transition-all cursor-pointer hover:scale-105"
            >
              Contact
            </button>

          </nav>

        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => {
              playTick();
              onOpenBooking();
            }}
            className="px-3.5 py-1.5 rounded-full bg-[#FF3333] text-white font-mono font-extrabold text-[11px] uppercase shadow-md shadow-[#FF3333]/30"
          >
            Contact
          </button>

          <button
            onClick={() => {
              playTick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-[#131318] border border-[#26242E] text-white hover:bg-[#1A1A22] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Enhanced Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mt-3 pt-3 border-t border-[#26242E] bg-[#101426]/95 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold uppercase">
              <button
                onClick={() => handleSelectTool('carousel3d', 'cinema-deck')}
                className="p-3 rounded-2xl bg-[#181F38] border border-[#2B355A] text-white flex items-center justify-between"
              >
                <span>Work</span>
                <Tv className="w-4 h-4 text-[#FF3333]" />
              </button>

              <button
                onClick={() => handleSelectTool('platform-compare', 'services-section')}
                className="p-3 rounded-2xl bg-[#181F38] border border-[#2B355A] text-white flex items-center justify-between"
              >
                <span>Services</span>
                <Sliders className="w-4 h-4 text-[#FF3333]" />
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                playTick();
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-[#FF3333] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#FF3333]/30 flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Header;
