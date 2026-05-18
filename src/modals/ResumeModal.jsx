import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseModal from './BaseModal';
import ResumeUploadFlow from './ResumeUploadFlow';
import {
  FileText, BarChart2, Cpu, FileSearch,
  Link, CheckCircle2, AlertTriangle, Zap, Building2,
  TrendingUp, Map, Tag, ChevronDown, ChevronUp,
} from 'lucide-react';

/* ── Helpers ── */
const chanceColor = (c) => c === 'High' ? 'text-emerald-400' : c === 'Medium' ? 'text-amber-400' : 'text-red-400';
const chanceBg    = (c) => c === 'High' ? 'bg-emerald-500/10 border-emerald-500/25' : c === 'Medium' ? 'bg-amber-500/10 border-amber-500/25' : 'bg-red-500/10 border-red-500/25';
const scoreBg     = (s) => s >= 75 ? 'from-emerald-500 to-teal-400' : s >= 50 ? 'from-amber-500 to-yellow-400' : 'from-red-500 to-rose-400';
const scoreGlow   = (s) => s >= 75 ? 'shadow-[0_0_30px_rgba(52,211,153,0.35)]' : s >= 50 ? 'shadow-[0_0_30px_rgba(251,191,36,0.35)]' : 'shadow-[0_0_30px_rgba(248,113,113,0.35)]';

/* ── Collapsible Section ── */
function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-black/40 rounded-[24px] border border-white/8 overflow-hidden backdrop-blur-xl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span className="flex items-center gap-3 text-white font-bold text-[15px] font-['Outfit']">
          <Icon className="w-5 h-5 text-[#2c95ff]" />
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Analytics Dashboard ── */
function AnalyticsDashboard({ data }) {
  const {
    file_name,
    placement_score,
    placement_label,
    ats_score,
    quality_label,
    summary,
    readability_grade = 'N/A',
    readability_pct = 0,
    parsing_pct = 100,
    links = {},
    page_count = 1,
    skills_detected = [],
    target_role_inferred,
    experience_level,
    company_fit = [],
    roadmap = [],
    ats_keywords_missing = [],
    ats_keywords_present = [],
    llm_strengths = [],
    llm_gaps = [],
    // fallbacks if LLM didn't run
    strengths: kw_strengths = [],
    missing: kw_missing = [],
  } = data;

  const score = placement_score ?? ats_score ?? 0;
  const label = placement_label ?? quality_label ?? 'Unknown';
  const hasDeep = data.deep?.success === true;

  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const itemVars = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } } };

  return (
    <motion.div
      key="analytics"
      variants={containerVars}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 10 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full"
    >
      {/* ── LEFT COLUMN ── */}
      <motion.div variants={itemVars} className="lg:col-span-4 flex flex-col gap-5">

        {/* Score Card */}
        <div className={`rounded-[28px] bg-gradient-to-br from-[#0a0f1e] to-black/80 border border-white/10 p-8 relative overflow-hidden ${scoreGlow(score)}`}>
          <div className="absolute -bottom-8 -right-8 text-[#2c95ff]/8 w-36 h-36 rotate-12 pointer-events-none"><Cpu className="w-full h-full" /></div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-[#2c95ff]" />
            <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Placement Score</span>
          </div>
          {/* Circular score */}
          <div className="flex items-center gap-6 mb-4">
            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${scoreBg(score)} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="text-3xl font-black text-white font-['Outfit']">{score}</span>
              <span className="absolute bottom-3.5 text-[10px] text-white/60 font-mono">/100</span>
            </div>
            <div>
              <p className={`text-2xl font-black font-['Outfit'] ${score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{label}</p>
              {experience_level && <p className="text-gray-500 text-xs font-mono mt-1">{experience_level}</p>}
              {target_role_inferred && <p className="text-gray-400 text-xs mt-1">🎯 {target_role_inferred}</p>}
            </div>
          </div>
          {summary && <p className="text-gray-400 text-xs leading-relaxed border-t border-white/8 pt-4">{summary}</p>}
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/40 rounded-2xl border border-white/8 p-4 flex flex-col gap-2">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Readability</span>
            <span className="text-3xl font-black text-green-400 font-['Outfit']">{readability_grade}</span>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-teal-400" style={{ width: `${readability_pct}%` }} />
            </div>
          </div>
          <div className="bg-black/40 rounded-2xl border border-white/8 p-4 flex flex-col gap-2">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">ATS Parse</span>
            <span className="text-3xl font-black text-orange-400 font-['Outfit']">{parsing_pct}%</span>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400" style={{ width: `${parsing_pct}%` }} />
            </div>
          </div>
        </div>

        {/* File + links */}
        <div className="bg-black/40 rounded-[24px] border border-white/8 p-5 flex flex-col gap-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2c95ff]/10 border border-[#2c95ff]/25 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[#2c95ff]" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">{file_name ?? 'resume.pdf'}</p>
              <p className="text-gray-500 text-xs font-mono">{page_count} page{page_count !== 1 ? 's' : ''} detected</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Detected Links</p>
            {[['GitHub', links.github], ['LeetCode', links.leetcode], ['LinkedIn', links.linkedin]].map(([label, val]) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono ${val ? 'bg-emerald-500/5 border border-emerald-500/20 text-emerald-400' : 'bg-white/[0.03] border border-white/8 text-gray-600'}`}>
                <Link className="w-3 h-3 flex-shrink-0" />
                <span className="w-14 text-gray-400 flex-shrink-0">{label}</span>
                <span className="truncate">{val ?? 'Not found'}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── RIGHT COLUMN ── */}
      <div className="lg:col-span-8 flex flex-col gap-5 overflow-y-auto max-h-[75vh] pr-1 custom-scroll">

        {/* AI Summary / Diagnostics header */}
        <motion.div variants={itemVars} className="bg-black/40 rounded-[24px] border border-white/8 p-5 flex items-center justify-between flex-wrap gap-3 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-3 font-['Outfit']">
            <FileSearch className="w-5 h-5 text-[#2c95ff]" />
            AI Intelligence Report
          </h3>
          <div className="flex items-center gap-2">
            {hasDeep && <span className="px-3 py-1 bg-[#2c95ff]/10 border border-[#2c95ff]/25 text-[#2c95ff] text-[10px] font-mono font-bold rounded-xl tracking-widest uppercase">LLM Powered</span>}
            {llm_gaps.length > 0 && <span className="px-3 py-1 bg-red-500/10 border border-red-500/25 text-red-400 text-[10px] font-mono font-bold rounded-xl tracking-widest uppercase">{llm_gaps.length} Issues</span>}
            {llm_strengths.length > 0 && <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold rounded-xl tracking-widest uppercase">{llm_strengths.length} Strengths</span>}
          </div>
        </motion.div>

        {/* Skills detected */}
        {skills_detected.length > 0 && (
          <motion.div variants={itemVars}>
            <Section title="Skills Detected" icon={Tag}>
              <div className="flex flex-wrap gap-2 pt-1">
                {skills_detected.map((s, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#2c95ff]/10 border border-[#2c95ff]/20 text-[#2c95ff] text-xs font-mono rounded-xl">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* ATS keywords */}
        {(ats_keywords_present.length > 0 || ats_keywords_missing.length > 0) && (
          <motion.div variants={itemVars}>
            <Section title="ATS Keyword Analysis" icon={Zap}>
              <div className="space-y-3 pt-1">
                {ats_keywords_present.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-2">✓ Present</p>
                    <div className="flex flex-wrap gap-2">
                      {ats_keywords_present.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono rounded-lg">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
                {ats_keywords_missing.length > 0 && (
                  <div>
                    <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest mb-2 mt-3">✗ Missing</p>
                    <div className="flex flex-wrap gap-2">
                      {ats_keywords_missing.map((kw, i) => (
                        <span key={i} className="px-2.5 py-1 bg-red-500/8 border border-red-500/20 text-red-400 text-[11px] font-mono rounded-lg">{kw}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>
          </motion.div>
        )}

        {/* LLM Strengths */}
        {llm_strengths.length > 0 && (
          <motion.div variants={itemVars}>
            <Section title="Verified Strengths" icon={CheckCircle2}>
              <div className="space-y-3 pt-1">
                {llm_strengths.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 hover:bg-emerald-500/10 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-bold mb-0.5">{s.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{s.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* LLM Gaps */}
        {llm_gaps.length > 0 && (
          <motion.div variants={itemVars}>
            <Section title="Gaps & Issues" icon={AlertTriangle}>
              <div className="space-y-3 pt-1">
                {llm_gaps.map((g, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                  >
                    <div className="flex gap-3 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-white text-sm font-bold">{g.title}</p>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed ml-7 mb-2">{g.detail}</p>
                    {g.fix && (
                      <div className="ml-7 flex items-start gap-2">
                        <span className="text-[10px] uppercase font-black tracking-widest text-[#2c95ff] bg-[#2c95ff]/10 px-2 py-0.5 rounded-md border border-[#2c95ff]/20 flex-shrink-0">Fix</span>
                        <span className="text-xs text-gray-300">{g.fix}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* Company Fit */}
        {company_fit.length > 0 && (
          <motion.div variants={itemVars}>
            <Section title="Company Fit Prediction" icon={Building2}>
              <div className="space-y-3 pt-1">
                {company_fit.map((cf, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-2xl border ${chanceBg(cf.chance)}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-white text-sm font-bold">{cf.category}</p>
                      <span className={`text-xs font-black font-mono flex-shrink-0 ${chanceColor(cf.chance)}`}>{cf.chance}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed mb-2">{cf.reason}</p>
                    {cf.improve && (
                      <p className="text-[11px] text-gray-500 italic">💡 {cf.improve}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* Roadmap */}
        {roadmap.length > 0 && (
          <motion.div variants={itemVars}>
            <Section title="30-Day Improvement Roadmap" icon={Map}>
              <div className="space-y-4 pt-1">
                {roadmap.map((week, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#2c95ff]/15 border border-[#2c95ff]/30 flex items-center justify-center flex-shrink-0 text-[#2c95ff] text-xs font-black">
                        {i + 1}
                      </div>
                      {i < roadmap.length - 1 && <div className="w-px flex-1 bg-white/8 mt-1" />}
                    </div>
                    <div className="pb-5 flex-1">
                      <p className="text-white font-bold text-sm mb-0.5">{week.week} — {week.focus}</p>
                      <ul className="space-y-1 mt-2">
                        {(week.tasks || []).map((t, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-400 text-xs">
                            <span className="text-[#2c95ff] flex-shrink-0 mt-0.5">→</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}

        {/* Fallback: keyword-only results if LLM didn't fire */}
        {!hasDeep && (kw_strengths.length > 0 || kw_missing.length > 0) && (
          <motion.div variants={itemVars}>
            <Section title="Keyword Scan Results" icon={FileSearch}>
              <div className="space-y-2 pt-1">
                {kw_strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{s}</span>
                  </div>
                ))}
                {kw_missing.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{m}</span>
                  </div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Root Modal ── */
export default function ResumeModal({ onClose }) {
  const [analyticsData, setAnalyticsData] = useState(null);

  return (
    <BaseModal
      onClose={onClose}
      title={analyticsData ? 'ATS Intelligence Simulator' : 'Resume AI Analysis'}
    >
      <AnimatePresence mode="wait">
        {!analyticsData ? (
          <ResumeUploadFlow key="upload-flow" onComplete={(d) => setAnalyticsData(d)} />
        ) : (
          <AnalyticsDashboard key="analytics" data={analyticsData} />
        )}
      </AnimatePresence>
    </BaseModal>
  );
}
