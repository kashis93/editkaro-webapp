import React from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Smartphone, 
  Zap, 
  TrendingUp, 
  Sliders, 
  Tv, 
  Film,
  Sparkles,
  Video
} from 'lucide-react';
import { playTick } from '../utils/audio';

export const CategoryFilterBar = ({
  selectedCategory,
  setSelectedCategory
}) => {
  const categories = [
    { id: 'all', label: 'All Categories', icon: Flame },
    { id: 'short-form', label: 'Short Form Reels', icon: Smartphone },
    { id: 'gaming', label: 'Gaming', icon: Zap },
    { id: 'football', label: 'Football', icon: TrendingUp },
    { id: 'anime', label: 'Anime', icon: Sparkles },
    { id: 'ecommerce', label: 'eCommerce Ads', icon: Tv },
    { id: 'color-grading', label: 'Color Grading', icon: Sliders },
    { id: 'long-form', label: 'Long Form', icon: Video },
    { id: 'documentary', label: 'Documentary', icon: Film },
  ];

  const handleCategorySelect = (cat) => {
    playTick();
    setSelectedCategory(cat);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      id="category-filter-bar" 
      className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-[#26242E] text-center"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131318] border border-[#26242E] text-xs font-mono font-bold text-[#FF3333] mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>FILTER PORTFOLIO CATEGORIES</span>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-mono transition-all duration-200 border ${
                isActive
                  ? 'bg-[#FF3333] text-white border-[#FF3333] shadow-lg shadow-[#FF3333]/30 scale-105'
                  : 'bg-[#131318] text-[#9E9BA8] hover:text-[#F4F0EA] hover:bg-[#1A1A22] border-[#26242E]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#FF3333]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryFilterBar;
