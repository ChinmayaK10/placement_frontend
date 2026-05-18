import React from 'react';
import { motion } from 'framer-motion';
import BaseModal from './BaseModal';
import { Building2, Percent, CheckCircle2, AlertTriangle, ArrowUpRight, TrendingUp, Radar, Cpu, Activity } from 'lucide-react';

const companies = [
  { id: 1, name: 'Stripe', role: 'Frontend Engineer', match: 94, gap: 'Low', salary: '$180k - $220k', logoStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  { id: 2, name: 'Vercel', role: 'Software Engineer II', match: 88, gap: 'Moderate', salary: '$160k - $190k', logoStyle: 'bg-white/5 text-white border-white/20' },
  { id: 3, name: 'OpenAI', role: 'UI Engineer', match: 65, gap: 'High', salary: '$200k - $300k', logoStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
];

export default function CompanyModal({ onClose }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } }
  };

  return (
    <BaseModal onClose={onClose} title="AI Matchmaking Intelligence">
      <div className="flex flex-col w-full gap-8 relative z-10 h-full">
        
        {/* Top Control Bar Area */}
        <div className="relative overflow-hidden p-6 md:p-8 bg-black/40 border border-white/10 rounded-[32px] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2c95ff]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/4 mix-blend-screen opacity-50"></div>
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 rounded-2xl bg-[#0a0f1e] border border-white/10 flex items-center justify-center text-[#2c95ff] shadow-[0_0_20px_rgba(44,149,255,0.15)] flex-shrink-0">
                    <Radar className="w-7 h-7" />
                 </div>
                 
                 <div className="flex flex-col">
                    <span className="text-[11px] text-[#2c95ff] font-['Orbitron'] uppercase tracking-widest font-bold mb-1.5 flex items-center gap-2">
                       Active scan region <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    </span>
                    <span className="text-white text-xl font-bold font-['Outfit'] tracking-wide">B2B SaaS / Infra</span>
                 </div>
                 
                 <div className="w-[1px] h-12 bg-white/10 hidden md:block"></div>
                 
                 <div className="flex flex-col hidden md:flex">
                    <span className="text-[11px] text-gray-500 font-mono uppercase tracking-widest font-bold mb-1.5">Network Average</span>
                    <span className="text-emerald-400 font-bold font-['Outfit'] text-lg drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">$185,000</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="px-5 py-2.5 bg-[#2c95ff]/10 hover:bg-[#2c95ff]/20 border border-[#2c95ff]/30 text-[#2c95ff] rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(44,149,255,0.15)] backdrop-blur-md">
                   Series B+ Only
                 </button>
                 <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-semibold transition-all flex items-center gap-2 backdrop-blur-md">
                   Urgently Hiring <TrendingUp className="w-4 h-4 text-emerald-400"/>
                 </button>
              </div>
           </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <motion.div variants={containerVars} initial="hidden" animate="show" className="contents">
             {companies.map((company, index) => (
                <motion.div 
                  key={company.id} 
                  variants={itemVars} 
                  className="bg-black/40 border border-white/10 hover:border-[#2c95ff]/40 rounded-[32px] p-8 flex flex-col group transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_60px_rgba(44,149,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.3)] relative overflow-hidden backdrop-blur-3xl"
                >
                  
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:bg-[#2c95ff]/15 group-hover:scale-150 transition-all duration-700 pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-10 relative z-10">
                     <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center text-3xl font-bold shadow-lg border ${company.logoStyle}`}>
                          {company.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-white font-['Outfit'] font-black text-2xl tracking-wide">{company.name}</h4>
                           <p className="text-gray-400 text-sm font-medium tracking-wide mt-1">{company.role}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8 flex-1 relative z-10">
                     
                     <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner">
                        <div className="flex items-end justify-between font-['Outfit'] mb-3">
                           <span className="text-gray-400 text-[11px] font-bold font-mono uppercase tracking-widest flex items-center gap-2"><Cpu className="w-3.5 h-3.5"/> Pipeline Affinity</span>
                           <span className="text-4xl font-black drop-shadow-md" style={{ color: company.match >= 90 ? '#4ade80' : company.match > 80 ? '#2c95ff' : '#fbbf24' }}>
                             {company.match}%
                           </span>
                        </div>
                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1px]">
                           <div className="h-full rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${company.match}%`, backgroundColor: company.match >= 90 ? '#4ade80' : company.match > 80 ? '#2c95ff' : '#fbbf24' }}>
                               <div className="absolute inset-0 bg-white/30 skew-x-12 animate-[shimmer_2s_infinite]"></div>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-5 pt-2">
                        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest font-bold mb-2">Target Comp</span>
                          <span className="text-white text-[15px] font-bold font-mono tracking-tight">{company.salary}</span>
                        </div>
                        <div className="bg-white/[0.03] rounded-xl p-4 border border-white/5">
                          <span className="block text-[9px] text-gray-500 font-mono uppercase tracking-widest font-bold mb-2">Skill Variance</span>
                          <span className={`text-[15px] font-bold tracking-wide flex items-center gap-1.5 ${
                            company.gap === 'Low' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' : company.gap === 'Moderate' ? 'text-[#2c95ff] drop-shadow-[0_0_8px_rgba(44,149,255,0.5)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]'
                          }`}>
                            {company.gap === 'Low' ? <CheckCircle2 className="w-4 h-4"/> : company.gap === 'High' ? <AlertTriangle className="w-4 h-4"/> : <Activity className="w-4 h-4"/>}
                            {company.gap}
                          </span>
                        </div>
                     </div>
                  </div>

                  <button className="w-full mt-8 py-3.5 rounded-2xl bg-white/5 hover:bg-[#2c95ff] text-gray-300 hover:text-white border border-white/10 hover:border-transparent hover:shadow-[0_0_20px_rgba(44,149,255,0.4)] transition-all duration-300 font-bold text-sm tracking-wide flex items-center justify-center gap-2 group/btn relative z-10 overflow-hidden">
                     <span className="relative z-10 flex items-center gap-2">Initiate Contact Protocol <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></span>
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                  </button>
                </motion.div>
             ))}
           </motion.div>
        </div>

      </div>
    </BaseModal>
  );
}
