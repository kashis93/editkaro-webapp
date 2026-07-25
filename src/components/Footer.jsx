import React from 'react';
import { 
  Instagram, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Play
} from 'lucide-react';
import { playWoosh, playTick } from '../utils/audio';

export const Footer = ({ 
  setCurrentView, 
  onOpenBooking,
}) => {
  const scrollToTop = () => {
    playWoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    playWoosh();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setCurrentView('grid');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F1221] text-[#A2A9C5] relative pt-16 pb-12 border-t border-[#1E243A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* 4 Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-[#1E243A]">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 group text-left transition-opacity hover:opacity-90"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF3333] to-[#FF6666] flex items-center justify-center text-white shadow-lg shadow-[#FF3333]/30">
                <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
              </div>
              <div className="flex items-center">
                <span className="font-display font-black text-2xl tracking-tight text-[#FF3333]">
                  Edit
                </span>
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  Karo
                </span>
              </div>
            </button>

            <p className="text-sm text-[#8F97B7] leading-relaxed font-normal max-w-sm">
              Professional video editing and social media marketing agency helping brands create engaging content.
            </p>

            {/* Social Media Circular Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/in/editkaro_official"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="w-10 h-10 rounded-full bg-[#181D33] border border-[#2A314E] flex items-center justify-center text-white hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-200 shadow-md group"
                title="Instagram @editkaro_official"
              >
                <Instagram className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.youtube.com/in/editkaro_official"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="w-10 h-10 rounded-full bg-[#181D33] border border-[#2A314E] flex items-center justify-center text-white hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-200 shadow-md group"
                title="YouTube @editkaro_official"
              >
                <Youtube className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.facebook.com/in/editkaro_official"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="w-10 h-10 rounded-full bg-[#181D33] border border-[#2A314E] flex items-center justify-center text-white hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-200 shadow-md group"
                title="Facebook @editkaro_official"
              >
                <Facebook className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://twitter.com/editkaro_official"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="w-10 h-10 rounded-full bg-[#181D33] border border-[#2A314E] flex items-center justify-center text-white hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-200 shadow-md group"
                title="Twitter / X @editkaro_official"
              >
                <Twitter className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/editkaro_official"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playTick}
                className="w-10 h-10 rounded-full bg-[#181D33] border border-[#2A314E] flex items-center justify-center text-white hover:bg-[#FF3333] hover:border-[#FF3333] transition-all duration-200 shadow-md group"
                title="LinkedIn @editkaro_official"
              >
                <Linkedin className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white relative inline-block pb-1">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FF3333] rounded-full" />
            </h4>
            <ul className="space-y-3 text-sm text-[#8F97B7] font-medium pt-1">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cinema-deck')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about-agency')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white relative inline-block pb-1">
              Services
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FF3333] rounded-full" />
            </h4>
            <ul className="space-y-3 text-sm text-[#8F97B7] font-medium pt-1">
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block text-left"
                >
                  Video Editing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block text-left"
                >
                  Color Grading
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block text-left"
                >
                  Motion Graphics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block text-left"
                >
                  Social Media Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-overview')}
                  className="hover:text-white hover:translate-x-1 transition-all duration-200 block text-left"
                >
                  Content Strategy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white relative inline-block pb-1">
              Contact
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#FF3333] rounded-full" />
            </h4>
            <div className="space-y-3.5 text-sm text-[#8F97B7] pt-1">
              <a
                href="mailto:info@editkaro.in"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF3333]/15 border border-[#FF3333]/30 flex items-center justify-center text-[#FF3333] group-hover:bg-[#FF3333] group-hover:text-white transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@editkaro.in</span>
              </a>

              <a
                href="tel:+918767084269"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF3333]/15 border border-[#FF3333]/30 flex items-center justify-center text-[#FF3333] group-hover:bg-[#FF3333] group-hover:text-white transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+91 87670 84269</span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF3333]/15 border border-[#FF3333]/30 flex items-center justify-center text-[#FF3333] flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>123 Creative Hub, Mumbai, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Floating Back to Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F789C]">
          <p>© 2026 EditKaro. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenBooking}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#2A314E]">•</span>
            <button
              onClick={onOpenBooking}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

      {/* Back to Top Red Floating Button (Bottom Right) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#FF3333] hover:bg-[#E60000] text-white flex items-center justify-center shadow-xl shadow-[#FF3333]/30 hover:scale-110 active:scale-95 transition-all duration-200 border border-white/20"
        title="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
