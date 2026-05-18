import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BaseModal from './BaseModal';
import { Activity, Zap, TrendingUp, AlertOctagon, Target, Crosshair } from 'lucide-react';

const skills = [
  { name: 'Problem Solving', score: 92, color: '#3b82f6', hex: 'rgba(59,130,246,' },
  { name: 'Communication', score: 85, color: '#10b981', hex: 'rgba(16,185,129,' },
  { name: 'Data Structures', score: 70, color: '#f59e0b', hex: 'rgba(245,158,11,' },
  { name: 'Web Dev', score: 95, color: '#8b5cf6', hex: 'rgba(139,92,246,' },
  { name: 'System Design', score: 45, color: '#ef4444', hex: 'rgba(239,68,68,' }
];

export default function StrengthModal({ onClose }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
     // Delay slightly for effect
     const timer = setTimeout(() => setMounted(true), 200);
     return () => clearTimeout(timer);
  }, []);

  // SVG Radar Generation Math
  const numPoints = skills.length;
  const radius = 120; // Increased radius for premium look
  const center = 160;
  const angleStep = (Math.PI * 2) / numPoints;
  
  const generatePoints = (scale, offset = 0) => skills.map((skill, i) => {
    const val = scale ? (skill.score / 100) * radius : 10;
    const x = center + (val + offset) * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + (val + offset) * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(' ');

  const axes = skills.map((_, i) => {
    const x = center + (radius + 20) * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
    return { x, y };
  });

  return (
    <BaseModal onClose={onClose} title="Performance Intelligence Core">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 w-full z-10 relative h-full">
        
        {/* Core Radar Matrix (Col 1-5) */}
        <div className="xl:col-span-5 flex flex-col gap-6 relative">
          
          <div className="bg-black/40 border border-white/10 rounded-[32px] p-10 flex flex-col items-center relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex-1 min-h-[450px]">
            {/* Ambient Background Glow matching chart */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(44,149,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>

            <h3 className="text-[#2c95ff] font-['Orbitron'] tracking-widest text-xs font-bold uppercase self-start mb-8 w-full px-2 border-b border-white/10 pb-4 flex items-center justify-between z-10 relative">
              <span className="flex items-center gap-2"><Target className="w-4 h-4"/> Competency Matrix</span>
              <Activity className="w-4 h-4 animate-pulse" />
            </h3>

            {/* Premium Radar SVG Grid */}
            <div className="relative w-[320px] h-[320px] mt-4 z-10 flex items-center justify-center group">
              
              <svg width="320" height="320" className="drop-shadow-[0_0_30px_rgba(44,149,255,0.3)] transition-transform duration-1000 group-hover:scale-105">
                {/* Background Web Polygons */}
                {[0.2, 0.4, 0.6, 0.8, 1].map(level => {
                  const pts = skills.map((_, i) => {
                    const x = center + ((radius + 20) * level) * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + ((radius + 20) * level) * Math.sin(i * angleStep - Math.PI / 2);
                    return `${x},${y}`;
                  }).join(' ');
                  return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={level === 1 ? "1.5" : "1"} />
                })}
                {/* Axes Lines */}
                {axes.map((pt, i) => (
                  <line key={`axis-${i}`} x1={center} y1={center} x2={pt.x} y2={pt.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                ))}
                
                {/* Glowing Outer Polygon Outline for active state */}
                <polygon 
                  points={mounted ? generatePoints(true, 5) : generatePoints(false)} 
                  fill="none" 
                  stroke="rgba(44,149,255,0.3)" 
                  strokeWidth="1" 
                  style={{ transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  className="blur-[2px]"
                />
                
                {/* Main Data Polygon */}
                <polygon 
                  points={mounted ? generatePoints(true) : generatePoints(false)} 
                  fill="url(#radarGradient)" 
                  stroke="#2c95ff" 
                  strokeWidth="2.5" 
                  style={{ transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  className="drop-shadow-[0_0_15px_#2c95ff]"
                />
                <defs>
                   <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                     <stop offset="0%" stopColor="rgba(44,149,255,0.4)" />
                     <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
                   </linearGradient>
                </defs>

                {/* Plot Data Dots with Rings */}
                {skills.map((skill, i) => {
                  const val = mounted ? (skill.score / 100) * radius : 10;
                  const x = center + val * Math.cos(i * angleStep - Math.PI / 2);
                  const y = center + val * Math.sin(i * angleStep - Math.PI / 2);
                  return (
                    <g key={`dot-${i}`} style={{ transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} transform={`translate(${x ? 0 : 0}, ${y ? 0 : 0})`}>
                       <circle cx={x} cy={y} r="10" fill="transparent" stroke={skill.color} strokeWidth="1" opacity="0.5" className="animate-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
                       <circle cx={x} cy={y} r="5" fill={skill.color} className="drop-shadow-[0_0_10px_#fff]" />
                       <circle cx={x} cy={y} r="2" fill="#fff" />
                    </g>
                  )
                })}
              </svg>

              {/* Data Labels floating outside SVG */}
              {axes.map((pt, i) => {
                const isLeft = pt.x < center - 20;
                const isRight = pt.x > center + 20;
                // Calculate label position slightly further out
                const lx = center + (radius + 45) * Math.cos(i * angleStep - Math.PI / 2);
                const ly = center + (radius + 45) * Math.sin(i * angleStep - Math.PI / 2);

                return (
                  <div key={`label-${i}`} className={`absolute text-[11px] font-bold tracking-widest font-mono uppercase px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 whitespace-nowrap transition-all duration-1000 shadow-xl backdrop-blur-md ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ 
                    left: lx, top: ly, transform: 'translate(-50%, -50%)',
                    boxShadow: `0 0 20px ${skills[i].hex}0.2)`
                  }}>
                    <span style={{ color: skills[i].color, textShadow: `0 0 10px ${skills[i].hex}0.5)` }}>{skills[i].name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Intelligence Side Panels (Col 6-12) */}
        <div className="xl:col-span-7 flex flex-col gap-8 w-full h-full">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Top Tier Highlight Card */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-emerald-500/10 via-black/40 to-black/60 p-8 rounded-[32px] border border-emerald-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 blur-[80px] group-hover:scale-110 transition-all rounded-full pointer-events-none"></div>
                 <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 text-xs uppercase tracking-widest font-mono"><TrendingUp className="w-5 h-5" /> Unfair Advantage</h4>
                 <div className="text-4xl font-black text-white mb-3 font-['Outfit'] drop-shadow-md">95% Top Tier</div>
                 <p className="text-[15px] leading-relaxed text-gray-300 font-medium relative z-10">Web Development & Problem Solving strictly outperform 95% of equivalent tier engineers.</p>
              </motion.div>

              {/* Weakness Highlight Card */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-rose-500/10 via-black/40 to-black/60 p-8 rounded-[32px] border border-rose-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/20 blur-[80px] group-hover:scale-110 transition-all rounded-full pointer-events-none"></div>
                 <h4 className="flex items-center gap-2 text-rose-400 font-bold mb-4 text-xs uppercase tracking-widest font-mono"><AlertOctagon className="w-5 h-5" /> Liability Warning</h4>
                 <div className="text-4xl font-black text-white mb-3 font-['Outfit'] drop-shadow-md">Tier 2 Risk</div>
                 <p className="text-[15px] leading-relaxed text-gray-300 font-medium relative z-10">System Design latency detected. 55% gap against FAANG software engineer baselines.</p>
              </motion.div>
           </div>

           {/* Core Metrics Detail Panels */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-black/40 rounded-[32px] border border-white/10 p-10 flex-1 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
             
             <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
               <h4 className="text-white font-semibold text-lg flex items-center gap-3">
                 <Crosshair className="w-5 h-5 text-[#2c95ff]" /> Technical Calibration Heatmap
               </h4>
               <span className="text-xs font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">Accuracy: 99.2%</span>
             </div>
             
             <div className="space-y-8">
               {skills.map((s, i) => (
                 <div key={s.name} className="flex flex-col gap-3 relative group">
                   <div className="flex justify-between items-end">
                     <span className="font-semibold text-gray-300 text-[15px] group-hover:text-white transition-colors">{s.name}</span>
                     <span className="text-sm font-mono tracking-wider font-bold drop-shadow-[0_0_5px_currentColor]" style={{ color: s.color }}>{s.score}%</span>
                   </div>
                   
                   {/* Next-gen glowing progress bar */}
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${s.score}%` }} 
                        transition={{ delay: 0.5 + (0.1 * i), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full relative overflow-hidden" 
                        style={{ backgroundColor: s.color, boxShadow: `0 0 20px ${s.hex}0.5)` }}
                      >
                         {/* Bar highlight shine */}
                         <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-[shimmer_3s_infinite]"></div>
                      </motion.div>
                   </div>
                 </div>
               ))}
             </div>
           </motion.div>

        </div>
      </div>
    </BaseModal>
  );
}
