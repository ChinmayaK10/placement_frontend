import React from 'react';
import { motion } from 'framer-motion';
import { X, Cpu } from 'lucide-react';

export default function BaseModal({ children, onClose, title }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-6 lg:p-8 overflow-hidden"
    >
      {/* Immersive Dark Glass Backdrop */}
      <motion.div 
        initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,4,8,0)' }}
        animate={{ backdropFilter: 'blur(40px)', backgroundColor: 'rgba(0,4,8,0.7)' }}
        exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,4,8,0)' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Ambient Animated Glow Behind Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 180 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[60vw] h-[60vh] bg-gradient-to-tr from-[#2c95ff]/10 to-purple-500/10 rounded-[100%] blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative w-full h-full max-w-[1920px] max-h-[1080px] flex flex-col rounded-[32px] md:rounded-[48px] border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden bg-[#050810]/60 backdrop-blur-3xl saturate-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Shimmering Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#2c95ff]/50 to-transparent opacity-80"></div>

        {/* Premium Frosted Header */}
        <div className="flex-none flex items-center justify-between px-8 md:px-12 py-6 md:py-8 bg-white/[0.02] border-b border-white/[0.05] z-50">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-wide font-['Outfit'] flex items-center gap-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              {title}
            </h2>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#2c95ff]/10 border border-[#2c95ff]/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#2c95ff] animate-pulse shadow-[0_0_10px_#2c95ff]"></span>
              <span className="text-[10px] text-[#2c95ff] tracking-widest uppercase font-mono font-semibold">Live Sync</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Optional Sub-Actions could go here */}
             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-mono tracking-wider">
               <Cpu className="w-4 h-4 text-[#2c95ff]" />
               AI Engine Active
             </div>

             <button
               onClick={onClose}
               className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-[#2c95ff]/10 hover:border-[#2c95ff]/30 text-gray-400 hover:text-white transition-all duration-300 backdrop-blur-md outline-none relative overflow-hidden"
             >
               <span className="absolute inset-0 bg-gradient-to-tr from-[#2c95ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
               <X className="w-5 h-5 relative z-10 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
             </button>
          </div>
        </div>

        {/* Scrollable Dynamic Content Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-12 font-['Outfit'] text-white relative">
          {/* Subtle noise texture overlay for extreme realism */}
          <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
