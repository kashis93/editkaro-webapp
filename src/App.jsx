import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import CategoryFilterBar from './components/CategoryFilterBar.jsx';
import VideoLightboxModal from './components/VideoLightboxModal.jsx';
import Carousel3D from './components/Carousel3D.jsx';
import MobileReelSimulator from './components/MobileReelSimulator.jsx';
import ColorGradeSlider from './components/ColorGradeSlider.jsx';
import AIHookGenerator from './components/AIHookGenerator.jsx';
import PricingCalculator from './components/PricingCalculator.jsx';
import PlatformComparisonStudio from './components/PlatformComparisonStudio.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import BottomShowcase from './components/BottomShowcase.jsx';
import BookingModal from './components/BookingModal.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [bgTheme, setBgTheme] = useState('dark');
  
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPrefills, setBookingPrefills] = useState({});

  const hasTriggeredExitIntent = useRef(false);

  // Exit-Intent Listener: Trigger Free Consultation modal when cursor moves toward top browser address bar
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 10 && !hasTriggeredExitIntent.current && !bookingModalOpen) {
        hasTriggeredExitIntent.current = true;
        setBookingPrefills({
          topic: 'Free Consultation',
          details: 'Special Exit-Intent Offer: Claim your 1-on-1 Free Editing Strategy Consultation & Free 30-Second Sample Edit Hook!'
        });
        setBookingModalOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [bookingModalOpen]);

  const handleOpenBooking = () => {
    setBookingPrefills({});
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithProject = (project) => {
    setBookingPrefills({
      projectTitle: project.title,
      details: `Project Reference: ${project.title} (${project.categoryLabel})\nClient Style: ${project.client}`
    });
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithDetails = (topic, scriptDetails) => {
    setBookingPrefills({
      topic,
      details: scriptDetails
    });
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithQuote = (quoteSummary, total) => {
    setBookingPrefills({
      details: `Calculated Quote Package:\n${quoteSummary}\n\nEstimated Monthly Total: $${total}`
    });
    setBookingModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${bgTheme === 'charcoal' ? 'bg-[#1A1A22]' : 'bg-[#0B0B0E]'} text-[#F4F0EA] font-sans selection:bg-[#FF3333] selection:text-white relative transition-colors duration-300`}>

      {/* Global Header / Navbar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenBooking={handleOpenBooking}
      />

      {/* HERO SECTION */}
      <HeroBanner
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenBooking={handleOpenBooking}
      />

      {/* DYNAMIC VIEW CONTAINER: Displays essential sections on initial load, or dedicated workstation when selected from navbar dropdown */}
      <main id="active-workstation-view" className="relative z-10 py-6 md:py-12 space-y-16 md:space-y-24 scroll-mt-24">
        
        {/* FIRST TIME / DEFAULT LANDING PAGE: Essential 3D Portfolio & Services ONLY */}
        {currentView === 'grid' && (
          <>
            {/* OUR PORTFOLIO (3D Cinema Deck ONLY) */}
            <div id="cinema-deck" className="space-y-8">
              <CategoryFilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <Carousel3D
                selectedCategory={selectedCategory}
                onSelectProject={setSelectedProject}
                onOpenBooking={handleOpenBooking}
              />
            </div>

            {/* OUR SERVICES */}
            <div id="services-section" className="pt-8 border-t border-[#26242E]">
              <ServicesSection setCurrentView={setCurrentView} onOpenBooking={handleOpenBooking} />
            </div>
          </>
        )}

        {/* NAVBAR DROPDOWN SELECTED VIEWS */}
        {currentView === 'carousel3d' && (
          <div className="space-y-8">
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Carousel3D
              selectedCategory={selectedCategory}
              onSelectProject={setSelectedProject}
              onOpenBooking={handleOpenBooking}
            />
          </div>
        )}

        {currentView === 'platform-compare' && (
          <PlatformComparisonStudio onOpenBooking={handleOpenBooking} />
        )}

        {currentView === 'mobile-reel' && (
          <MobileReelSimulator
            onOpenBookingWithProject={handleOpenBookingWithProject}
          />
        )}

        {currentView === 'color-grade' && (
          <ColorGradeSlider />
        )}

        {currentView === 'ai-generator' && (
          <AIHookGenerator
            onOpenBookingWithDetails={handleOpenBookingWithDetails}
          />
        )}

        {currentView === 'pricing' && (
          <PricingCalculator
            onOpenBookingWithQuote={handleOpenBookingWithQuote}
          />
        )}
      </main>

      {/* Bottom Showcase: Live Editing Showcase Marquee Reel & Total Client Views Agency Metrics */}
      <BottomShowcase
        setCurrentView={setCurrentView}
        onSelectProject={setSelectedProject}
        onOpenBooking={handleOpenBooking}
      />

      {/* Footer with Background Color Theme Toggle */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenBooking={handleOpenBooking}
        bgTheme={bgTheme}
        onToggleBgTheme={setBgTheme}
      />

      {/* Lightbox Video Cinema Modal */}
      <VideoLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBookingWithProject={handleOpenBookingWithProject}
      />

      {/* Booking / Sample Request Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        prefilledTopic={bookingPrefills.topic}
        prefilledDetails={bookingPrefills.details}
        prefilledProjectTitle={bookingPrefills.projectTitle}
      />

    </div>
  );
}
