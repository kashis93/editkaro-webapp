import React from 'react';
import { motion } from 'motion/react';

export const CardSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <motion.div
          key={`skeleton-${idx}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          className="rounded-3xl bg-[#131318] border border-[#26242E] h-[460px] w-full flex flex-col overflow-hidden shadow-xl"
        >
          {/* Skeleton Media Area (220px) */}
          <div className="relative w-full h-[220px] bg-[#0B0B0E] p-4 flex flex-col justify-between overflow-hidden">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            {/* Top Badges */}
            <div className="flex justify-between items-center z-10">
              <div className="h-5 w-24 rounded-full bg-[#26242E] animate-pulse" />
              <div className="h-5 w-14 rounded-full bg-[#26242E] animate-pulse" />
            </div>

            {/* Play Button Skeleton */}
            <div className="self-center my-auto z-10 w-11 h-11 rounded-full bg-[#26242E]/80 animate-pulse border border-white/5" />
          </div>

          {/* Skeleton Body Area */}
          <div className="p-6 flex-1 flex flex-col justify-between bg-[#131318] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            
            <div className="space-y-3 z-10">
              {/* Client row */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#26242E] animate-pulse" />
                <div className="h-3 w-32 rounded bg-[#26242E] animate-pulse" />
              </div>

              {/* Title */}
              <div className="h-5 w-3/4 rounded bg-[#26242E] animate-pulse" />

              {/* Description (2 lines) */}
              <div className="space-y-1.5 pt-1">
                <div className="h-3 w-full rounded bg-[#1A1822] animate-pulse" />
                <div className="h-3 w-4/5 rounded bg-[#1A1822] animate-pulse" />
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="pt-3 border-t border-[#26242E] flex items-center justify-between z-10">
              <div className="h-6 w-24 rounded-full bg-[#1A1822] animate-pulse border border-[#26242E]" />
              <div className="h-6 w-20 rounded-full bg-[#1A1822] animate-pulse border border-[#26242E]" />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default CardSkeleton;
