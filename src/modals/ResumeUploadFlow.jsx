/**
 * ResumeUploadFlow.jsx
 *
 * 3-stage flow:
 *   Stage 1 – "upload"     → Drag-and-drop / file picker
 *   Stage 2 – "processing" → Calls POST /ats-analyze (real backend)
 *   Stage 3 → parent receives structured analytics via onComplete(data)
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud, FileText, CheckCircle2, X, Cpu, Zap,
  ScanLine, BrainCircuit, Layers, ChevronRight, AlertTriangle,
} from 'lucide-react';

const API_BASE = 'http://localhost:8001';

function getAuthToken() {
  try {
    const raw = localStorage.getItem('realityCheckSession');
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.token ?? null;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────
   STAGE 1 — Premium Drag-and-Drop Upload
───────────────────────────────────────────── */
function UploadStage({ onFileAccepted }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateAndSet = (file) => {
    setError('');
    if (!file) return;
    if (file.type !== 'application/pdf') { setError('Only PDF files are accepted.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('File must be under 10 MB.'); return; }
    setSelectedFile(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSet(e.dataTransfer.files[0]);
  }, []);

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center w-full h-full gap-10 px-4"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2c95ff]/10 border border-[#2c95ff]/25 mb-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2c95ff] animate-pulse shadow-[0_0_8px_#2c95ff]" />
          <span className="text-[11px] text-[#2c95ff] tracking-[0.2em] uppercase font-mono font-semibold">
            ATS Intelligence Engine
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-['Outfit'] leading-tight">
          Upload Your Resume
        </h2>
        <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
          ATS optimization, recruiter analysis, and placement intelligence — powered by AI.
        </p>
      </div>

      {/* Drop Zone */}
      <motion.div
        onClick={() => !selectedFile && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        animate={{
          borderColor: isDragging ? 'rgba(44,149,255,0.8)' : selectedFile ? 'rgba(74,222,128,0.5)' : 'rgba(255,255,255,0.1)',
          boxShadow: isDragging
            ? '0 0 60px rgba(44,149,255,0.25), inset 0 0 40px rgba(44,149,255,0.05)'
            : selectedFile ? '0 0 40px rgba(74,222,128,0.15)' : '0 20px 60px rgba(0,0,0,0.4)',
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl rounded-[32px] border-2 border-dashed bg-black/30 backdrop-blur-2xl overflow-hidden cursor-pointer select-none"
        style={{ minHeight: '260px' }}
      >
        {/* Corner accents */}
        {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2c95ff]/50" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-[#2c95ff]/50" />
          </div>
        ))}
        <motion.div
          animate={{ opacity: isDragging ? 1 : 0.4 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(44,149,255,0.08) 0%, transparent 70%)' }}
        />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-6 p-12 h-full min-h-[260px]"
            >
              <motion.div
                animate={{ y: isDragging ? -8 : [0, -6, 0] }}
                transition={isDragging ? { duration: 0.3 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-20 h-20 rounded-3xl bg-[#2c95ff]/10 border border-[#2c95ff]/25 flex items-center justify-center shadow-[0_0_30px_rgba(44,149,255,0.2)]">
                  <UploadCloud className="w-9 h-9 text-[#2c95ff]" />
                </div>
                {isDragging && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl border border-[#2c95ff]"
                  />
                )}
              </motion.div>
              <div className="text-center">
                <p className="text-xl font-bold text-white mb-2">
                  {isDragging ? 'Release to upload' : 'Drop your resume here'}
                </p>
                <p className="text-gray-500 text-sm">
                  or <span className="text-[#2c95ff] font-semibold">click to browse</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600 font-mono">
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/[0.08] text-gray-400">PDF only</span>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/[0.08] text-gray-400">Max 10 MB</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selected"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="flex items-center gap-6 p-10 min-h-[260px]"
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_25px_rgba(74,222,128,0.2)]"
              >
                <FileText className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-lg truncate mb-1">{selectedFile.name}</p>
                <p className="text-gray-500 text-sm font-mono">{(selectedFile.size / 1024).toFixed(1)} KB · PDF Document</p>
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold tracking-wide">Ready for AI analysis</span>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef} type="file" accept="application/pdf"
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files[0])}
        />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-400 text-sm font-mono -mt-4"
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => selectedFile && onFileAccepted(selectedFile)}
        disabled={!selectedFile}
        whileHover={selectedFile ? { scale: 1.03 } : {}}
        whileTap={selectedFile ? { scale: 0.97 } : {}}
        className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 ${
          selectedFile
            ? 'bg-[#2c95ff] text-white shadow-[0_0_30px_rgba(44,149,255,0.4),0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(44,149,255,0.6)]'
            : 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed'
        }`}
      >
        <BrainCircuit className="w-5 h-5" />
        Analyze with AI
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STAGE 2 — Processing (real API call)
───────────────────────────────────────────── */
const STEPS = [
  { icon: ScanLine,     label: 'Extracting Resume Text'            },
  { icon: Layers,       label: 'Running ATS Keyword Scan'          },
  { icon: Cpu,          label: 'Analyzing Skills & Experience'     },
  { icon: BrainCircuit, label: 'Running LLM Deep Analysis'         },
  { icon: Zap,          label: 'Generating Placement Intelligence' },
];

function ProcessingStage({ file, onComplete, onError }) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [apiDone, setApiDone] = useState(false);
  const apiResult = useRef(null);

  // Animate steps while API runs in parallel
  React.useEffect(() => {
    let cancelled = false;

    // ── Real API call ──────────────────────────────────────────
    const callApi = async () => {
      const token = getAuthToken();
      if (!token) {
        onError('You must be logged in to analyze a resume.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch(`${API_BASE}/ats-analyze`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          onError(err.detail || 'Analysis failed. Please try again.');
          return;
        }

        const data = await res.json();
        if (!cancelled) {
          apiResult.current = data;
          setApiDone(true);
        }
      } catch (e) {
        if (!cancelled) onError('Could not reach the backend. Is it running?');
      }
    };

    // ── Step animation — 0.8s each, 5 steps = 4s to cover ~4-6s LLM response ─
    const STEP_DURATION = 800;
    const timers = [];

    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => {
        if (!cancelled) setActiveStep(i);
      }, i * STEP_DURATION));
    });

    // Smooth progress — caps at 88% until API responds
    const totalDuration = STEPS.length * STEP_DURATION;
    let startTime = null;
    let rafId;
    const animateProgress = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const pct = Math.min((elapsed / totalDuration) * 88, 88);
      if (!cancelled) setProgress(pct);
      if (elapsed < totalDuration && !cancelled) rafId = requestAnimationFrame(animateProgress);
    };
    rafId = requestAnimationFrame(animateProgress);

    callApi();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [file, onError]);

  // When API finishes → snap to 100% and complete
  React.useEffect(() => {
    if (!apiDone) return;
    setActiveStep(STEPS.length);
    setProgress(100);
    const t = setTimeout(() => onComplete(apiResult.current), 600);
    return () => clearTimeout(t);
  }, [apiDone, onComplete]);


  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full h-full gap-10 px-4"
    >
      {/* Pulsing orb */}
      <div className="relative flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1 + i * 0.25], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-28 h-28 rounded-full border border-[#2c95ff]/40"
          />
        ))}
        <div className="w-28 h-28 rounded-full bg-[#2c95ff]/10 border border-[#2c95ff]/30 flex items-center justify-center shadow-[0_0_60px_rgba(44,149,255,0.3)]">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>
            <BrainCircuit className="w-12 h-12 text-[#2c95ff]" />
          </motion.div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-3xl font-black text-white font-['Outfit']">Analyzing Resume…</h3>
        <p className="text-gray-500 text-sm font-mono tracking-widest uppercase">AI Engine Processing</p>
      </div>

      <div className="w-full max-w-md space-y-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < activeStep;
          const active = i === activeStep;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i <= activeStep ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl border transition-all duration-500 ${
                active  ? 'bg-[#2c95ff]/10 border-[#2c95ff]/30 shadow-[0_0_20px_rgba(44,149,255,0.1)]'
                : done  ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-white/[0.03] border-white/[0.08]'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                active ? 'bg-[#2c95ff]/20' : done ? 'bg-emerald-500/15' : 'bg-white/5'
              }`}>
                {done
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  : <Icon className={`w-4 h-4 ${active ? 'text-[#2c95ff]' : 'text-gray-600'}`} />
                }
              </div>
              <span className={`text-sm font-semibold flex-1 ${active ? 'text-white' : done ? 'text-gray-400' : 'text-gray-600'}`}>
                {step.label}
              </span>
              {active && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#2c95ff]"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs font-mono text-gray-500 mb-2">
          <span className="truncate max-w-[70%]">{file?.name}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/[0.08]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2c95ff] to-purple-500 rounded-full shadow-[0_0_10px_#2c95ff]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Root Export — Flow Controller
───────────────────────────────────────────── */
export default function ResumeUploadFlow({ onComplete }) {
  const [stage, setStage] = useState('upload'); // 'upload' | 'processing'
  const [uploadedFile, setUploadedFile] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleFileAccepted = (file) => {
    setApiError('');
    setUploadedFile(file);
    setStage('processing');
  };

  const handleError = (msg) => {
    setApiError(msg);
    setStage('upload'); // Send back to upload with error
    setUploadedFile(null);
  };

  const handleProcessingComplete = (apiData) => {
    onComplete(apiData); // Pass full structured API response up
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold backdrop-blur-xl shadow-xl"
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === 'upload' && (
          <UploadStage key="upload" onFileAccepted={handleFileAccepted} />
        )}
        {stage === 'processing' && (
          <ProcessingStage
            key="processing"
            file={uploadedFile}
            onComplete={handleProcessingComplete}
            onError={handleError}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
