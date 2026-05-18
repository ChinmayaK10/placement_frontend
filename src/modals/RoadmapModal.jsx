import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseModal from './BaseModal';
import { 
  Sparkles, BrainCircuit, Target, CheckCircle2, ChevronRight, Lock, 
  Activity, GitCommit, Clock, BarChart3, TrendingUp, AlertTriangle, Play 
} from 'lucide-react';

const roadmapData = [
  { 
    id: 'q1', type: 'completed', title: 'Frontend Architecture & Mastery', 
    duration: '4 Weeks', difficulty: 'Advanced', completion: 100,
    tech: ['React', 'Next.js', 'Vite', 'Framer Motion'], 
    ai_note: 'Exceptional pattern recognition demonstrated in component architecture.',
    desc: 'Mastered component composition, state trees, rendering optimizations, and fluid animations for next-gen UI.' 
  },
  { 
    id: 'q2', type: 'active', title: 'Data Structures & Algorithmic Patterns', 
    duration: '6 Weeks (In Progress)', difficulty: 'Mastery', completion: 68,
    tech: ['Graphs', 'Dynamic Programming', 'Tries', 'Advanced Trees'], 
    ai_note: 'Graph algorithms require 12% more focus. Redirecting next 3 study sessions to Dijkstra and A*.',
    desc: 'Mastering advanced algorithmic patterns tailored specifically for tier-1 product engineering rounds.' 
  },
  { 
    id: 'q3', type: 'locked', title: 'System Design: Scale & Architecture', 
    duration: '8 Weeks', difficulty: 'Expert', completion: 0,
    tech: ['Microservices', 'Distributed Caching', 'Kafka', 'Load Balancing'], 
    ai_note: 'Unlock pending completion of DSA module. Background reading recommended.',
    desc: 'Understanding scale, data replication, and high-availability backend system architecture and fault tolerance.' 
  },
  { 
    id: 'q4', type: 'locked', title: 'AI Integration & Applied LLMs', 
    duration: '4 Weeks', difficulty: 'Advanced', completion: 0,
    tech: ['Langchain', 'Vector DBs', 'RAG pipelines', 'OpenAI API'], 
    ai_note: 'Scheduled as final capstone project to consolidate all previous learnings.',
    desc: 'Applying modern foundational models and retrieval-augmented generation in real-world application contexts.' 
  },
];

export default function RoadmapModal({ onClose }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -30, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <BaseModal onClose={onClose} title="AI Career Command Center">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 relative z-10 w-full h-full pb-8">
        
        {/* LEFT MAIN SECTION (70%) - Interactive Roadmap Timeline */}
        <div className="lg:col-span-7 flex flex-col w-full relative h-[75vh] pr-4" style={{ overflowY: 'auto' }}>
          
          <h3 className="text-[#2c95ff]/80 font-['Orbitron'] font-semibold tracking-widest text-[11px] uppercase mb-8 flex items-center gap-3 drop-shadow-[0_0_8px_#2c95ff]">
             <GitCommit className="w-4 h-4 text-[#2c95ff]" /> Active Progression Path 
             <span className="w-full flex-1 h-[1px] bg-gradient-to-r from-[#2c95ff]/30 to-transparent ml-4"></span>
          </h3>
          
          <div className="relative pl-8 md:pl-12 pb-20">
            {/* Master timeline glowing line */}
            <div className="absolute top-4 bottom-0 left-[22px] md:left-[30px] w-[2px] bg-gradient-to-b from-[#2c95ff] via-[#2c95ff]/40 to-[#111827] rounded-full shadow-[0_0_15px_rgba(44,149,255,0.6)]">
               <div className="absolute top-1/4 left-0 w-full h-1/4 bg-white/50 blur-[2px] animate-[pulse_3s_infinite]"></div>
            </div>
            
            <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-12">
              {roadmapData.map((node) => (
                <motion.div key={node.id} variants={itemVars} className="relative group">
                  
                  {/* Node Connector Point */}
                  <div className={`absolute -left-[30px] md:-left-[39px] top-8 w-4 h-4 rounded-full flex items-center justify-center z-10 transition-all duration-500
                    ${node.type === 'completed' ? 'bg-[#2c95ff] shadow-[0_0_20px_#2c95ff]' : 
                      node.type === 'active' ? 'bg-white shadow-[0_0_20px_#fff,0_0_40px_#2c95ff]' : 
                      'bg-[#050810] border-2 border-white/20'}`}>
                    {node.type === 'active' && <div className="absolute inset-0 rounded-full border-2 border-[#2c95ff] animate-[ping_2s_infinite]"></div>}
                  </div>

                  {/* Milestone Card - Premium Glassmorphism */}
                  <div className={`p-6 md:p-8 rounded-[28px] border backdrop-blur-2xl transition-all duration-500 transform group-hover:-translate-y-1 relative overflow-hidden
                    ${node.type === 'completed' ? 'bg-black/40 border-[#2c95ff]/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 
                      node.type === 'active' ? 'bg-gradient-to-br from-[#2c95ff]/10 to-black/60 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:border-[#2c95ff]/50 group-hover:shadow-[0_20px_60px_rgba(44,149,255,0.15)]' : 
                      'bg-white/[0.02] border-white/5 opacity-60 group-hover:opacity-100'}`}>
                    
                    {node.type === 'active' && (
                       <>
                         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2c95ff]/10 blur-[80px] rounded-full pointer-events-none transition-colors"></div>
                         <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#2c95ff]/0 via-[#2c95ff] to-[#2c95ff]/0"></div>
                       </>
                    )}

                    {/* Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6 relative z-10">
                       <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-bold border flex items-center gap-1.5
                            ${node.type === 'completed' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                              node.type === 'active' ? 'bg-[#2c95ff]/10 border-[#2c95ff]/30 text-[#2c95ff] shadow-[0_0_10px_rgba(44,149,255,0.3)]' :
                              'bg-white/5 border-white/10 text-gray-500'}`}>
                            {node.type === 'completed' && <CheckCircle2 className="w-3 h-3"/>}
                            {node.type === 'active' && <Play className="w-3 h-3"/>}
                            {node.type === 'locked' && <Lock className="w-3 h-3"/>}
                            {node.type.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono"><Clock className="w-3.5 h-3.5"/> {node.duration}</span>
                       </div>
                       <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-gray-500">Difficulty:</span>
                          <span className={node.difficulty === 'Mastery' ? 'text-purple-400' : node.difficulty === 'Expert' ? 'text-orange-400' : 'text-blue-400'}>{node.difficulty}</span>
                       </div>
                    </div>

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-6 relative z-10">
                       <h4 className={`text-2xl md:text-3xl font-black tracking-wide font-['Outfit'] ${node.type === 'active' ? 'text-white' : 'text-gray-300'}`}>
                         {node.title}
                       </h4>
                       <div className="flex items-center gap-4 bg-black/50 px-5 py-3 rounded-2xl border border-white/10 shrink-0 w-full xl:w-auto">
                         <span className="text-gray-400 text-sm font-mono tracking-wider font-bold">{node.completion}%</span>
                         <div className="flex-1 xl:w-32 h-2 bg-[#050810] rounded-full overflow-hidden border border-white/5 shadow-inner">
                            <div className={`h-full rounded-full transition-all duration-1000 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] relative overflow-hidden
                               ${node.type === 'completed' ? 'bg-green-500' : node.type === 'active' ? 'bg-[#2c95ff]' : 'bg-transparent'}`} 
                               style={{ width: `${node.completion}%` }}>
                               {node.type === 'active' && <div className="absolute inset-0 bg-white/30 skew-x-12 animate-[shimmer_2s_infinite]"></div>}
                            </div>
                         </div>
                       </div>
                    </div>

                    {/* AI Recommendation Note */}
                    <div className="bg-[#2c95ff]/[0.03] border border-[#2c95ff]/20 rounded-xl p-4 mb-6 relative z-10 flex items-start gap-4">
                       <BrainCircuit className="w-5 h-5 text-[#2c95ff] shrink-0 mt-0.5" />
                       <div className="flex-1">
                          <span className="block text-[10px] text-[#2c95ff] uppercase tracking-widest font-bold mb-1">AI Recommendation</span>
                          <p className={`text-sm ${node.type === 'locked' ? 'text-gray-500' : 'text-gray-300'} leading-relaxed`}>{node.ai_note}</p>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 relative z-10">
                       {node.tech.map(t => (
                         <span key={t} className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border shadow-sm transition-colors
                            ${node.type === 'active' ? 'bg-[#2c95ff]/10 border-[#2c95ff]/30 text-blue-200 drop-shadow-[0_0_8px_rgba(44,149,255,0.3)]' : 
                            'bg-white/5 border-white/10 text-gray-500'}`}>
                           {t}
                         </span>
                       ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (30%) - AI Intelligence & Analytics Widgets */}
        <div className="lg:col-span-3 space-y-6 flex flex-col relative w-full h-[75vh]" style={{ overflowY: 'auto' }}>
           
           {/* Placement Probability Widget */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.1, type: 'spring' }}
             className="p-6 rounded-[24px] bg-gradient-to-br from-[#10b981]/10 to-black/60 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-3xl overflow-hidden relative"
           >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/20 blur-[50px] mix-blend-screen pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <div className="p-2 rounded-xl bg-[#10b981]/20 border border-[#10b981]/30">
                    <Target className="w-5 h-5 text-[#10b981]" />
                 </div>
                 <h4 className="text-gray-300 font-semibold tracking-wide">Placement Probability</h4>
              </div>
              
              <div className="relative z-10 flex items-baseline gap-3 mb-4">
                 <span className="text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">84%</span>
                 <span className="text-sm font-semibold text-green-400 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +4.2%</span>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed font-medium">Likelihood of clearing Tier-1 interviews based on current trajectory and DSA mastery.</p>
           </motion.div>

           {/* AI Insight Summary Widget */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, type: 'spring' }}
             className="p-6 rounded-[24px] bg-black/50 border border-[#2c95ff]/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative overflow-hidden group"
           >
              <div className="absolute -top-10 -right-10 opacity-20 text-[#2c95ff] group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="w-40 h-40" />
              </div>
              
              <h4 className="text-white font-['Orbitron'] font-semibold text-[15px] flex items-center gap-2.5 mb-5 relative z-10">
                <BrainCircuit className="w-5 h-5 text-[#2c95ff]" />
                AI Insight Summary
              </h4>
              
              <div className="space-y-4 relative z-10">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                   <h5 className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-2">Strengths Detected</h5>
                   <p className="text-sm text-gray-300 font-medium">Exceptional rendering optimization mechanics. Ready for Senior UI roles.</p>
                 </div>
                 <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/20 p-4 rounded-xl">
                   <h5 className="text-[11px] uppercase tracking-widest text-[#f59e0b] font-bold mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3"/> Critical Gap</h5>
                   <p className="text-sm text-gray-300 font-medium">Dynamic Programming recognition is sluggish. Pattern repetition needed.</p>
                 </div>
              </div>
           </motion.div>

           {/* Recommended Next Action */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, type: 'spring' }}
             className="p-6 rounded-[24px] bg-black/40 border border-white/10 backdrop-blur-xl relative"
           >
              <h4 className="text-gray-400 uppercase tracking-widest text-[11px] font-bold flex items-center gap-2 mb-5">
                 <Activity className="w-4 h-4 text-gray-500" /> Recommended Action
              </h4>

              <div className="bg-gradient-to-r from-[#2c95ff]/10 to-transparent border border-[#2c95ff]/20 rounded-xl p-4 flex gap-4">
                 <div className="w-10 h-10 rounded-lg bg-[#2c95ff] flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(44,149,255,0.4)]">
                    <Play className="w-4 h-4 fill-current"/>
                 </div>
                 <div>
                    <h5 className="text-white font-semibold text-sm mb-1">Knapsack Pattern Variations</h5>
                    <p className="text-xs text-gray-400">Complete 3 targeted LC Mediums to close the identified gap.</p>
                 </div>
              </div>
           </motion.div>

           {/* Readiness & Consistency */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, type: 'spring' }}
             className="grid grid-cols-2 gap-4"
           >
              <div className="p-5 rounded-[24px] bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                 <BarChart3 className="w-6 h-6 text-[#2c95ff] mb-3" />
                 <span className="text-2xl font-black text-white">B+</span>
                 <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">Readiness</span>
              </div>
              <div className="p-5 rounded-[24px] bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                 <Activity className="w-6 h-6 text-purple-400 mb-3" />
                 <span className="text-2xl font-black text-white">8<span className="text-sm font-medium text-gray-400 block -mt-1">days</span></span>
                 <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">Consistency</span>
              </div>
           </motion.div>

        </div>
      </div>
    </BaseModal>
  );
}
