import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, User, Globe, Terminal,
  ArrowRight, Loader2, Eye, EyeOff,
  AlertCircle, CheckCircle2, Shield,
  Zap, BarChart2, Brain,
} from 'lucide-react';
import {
  signInWithCredentials,
  signUpWithCredentials,
  signInWithProvider,
} from './auth/session';
import './LoginPage.css';

/* ─── Particle canvas ─── */
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, W, H;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: -Math.random() * 0.35 - 0.08,
      alpha: Math.random() * 0.55 + 0.08,
      hue: Math.random() > 0.55 ? 207 : 195,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of dots) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,72%,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
};

/* ─── Platform feature cards (left panel) ─── */
const features = [
  { icon: Brain, label: 'AI Placement Score', desc: 'Real-time readiness analysis across 50+ parameters' },
  { icon: BarChart2, label: 'Skill Gap Detection', desc: 'Know exactly what separates you from your dream role' },
  { icon: Zap, label: 'Career Intelligence', desc: 'Personalized roadmaps powered by placement data' },
];

/* ─── Password strength ─── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Elite'];
  const colors = ['', '#ff4444', '#ff9900', '#f0d020', '#44cc77', '#00c3ff'];
  return { score: s, label: labels[s], color: colors[s] };
};

const emptySignup = { name: '' };

/* ─── Variants ─── */
const panel = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, filter: 'blur(6px)', transition: { duration: 0.3 } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const row = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 22, stiffness: 260 } },
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const LoginPage = ({ onAuthSuccess }) => {
  const [tab, setTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup] = useState(emptySignup);
  const strength = useMemo(() => getStrength(password), [password]);

  /* read ?tab= from URL */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('tab') === 'signup') setTab('signup');
  }, []);

  const switchTab = (t) => { setTab(t); setError(''); setShowPw(false); };
  const update = (k, v) => setSignup(p => ({ ...p, [k]: v }));

  const handleSocial = async (provider) => {
    setError(''); setIsLoading(true);
    try { const u = await signInWithProvider(provider); onAuthSuccess?.(u); }
    catch (e) { setError(e.message || 'Could not connect.'); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setIsLoading(true);
    try {
      let u;
      if (tab === 'login') {
        u = await signInWithCredentials({ email, password, remember });
      } else {
        u = await signUpWithCredentials({ name: signup.name, email, password });
      }
      onAuthSuccess?.(u);
      const redirect = new URLSearchParams(window.location.search).get('redirect') || '/hiresync.html';
      window.location.assign(redirect);
    } catch (e) { setError(e.message || 'Something went wrong.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="lp-root">
      {/* ── Background ── */}
      <div className="lp-bg">
        <ParticleField />
        <div className="lp-bg-mesh" />
        <div className="lp-bg-grid" />
        <div className="lp-orb lp-orb--a" />
        <div className="lp-orb lp-orb--b" />
        <div className="lp-orb lp-orb--c" />
        {/* Scan line */}
        <div className="lp-scan" />
      </div>

      {/* ── Two-column layout ── */}
      <div className="lp-layout">

        {/* ═══ LEFT: Feature panel ═══ */}
        <motion.aside
          className="lp-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >

          <div className="lp-brand">
            <div className="lp-brand-text">
              <h1 className="lp-brand-name">REALITY CHECK AI</h1>
              <p className="lp-brand-tag">Placement Intelligence Network</p>
            </div>
          </div>

          <div className="lp-hero-text">
            <h2 className="lp-hero-h">Enter the Future of<br /><span className="lp-hero-accent">Placement Intelligence</span></h2>
            <p className="lp-hero-sub">AI-powered career readiness platform trusted by top engineering candidates.</p>
          </div>

          <div className="lp-features">
            {features.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="lp-feature-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="lp-feature-icon"><Icon size={18} /></div>
                <div>
                  <p className="lp-feature-label">{label}</p>
                  <p className="lp-feature-desc">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lp-testimonial">
            <p className="lp-testimonial-quote">"Got my SDE-2 offer at a FAANG after using Reality Check AI for 6 weeks."</p>
            <p className="lp-testimonial-author">— Priya S., IIT Bombay · CS 2024</p>
          </div>
        </motion.aside>

        {/* ═══ RIGHT: Auth panel ═══ */}
        <motion.main
          className="lp-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="lp-card">
            {/* Card decorations */}
            <div className="lp-card-shimmer" />
            <div className="lp-card-scan" />
            <div className="lp-card-glow-a" />
            <div className="lp-card-glow-b" />

            {/* ── Tabs ── */}
            <div className="lp-tabs" role="tablist">
              <button
                type="button" role="tab"
                className={`lp-tab${tab === 'login' ? ' lp-tab--active' : ''}`}
                onClick={() => switchTab('login')}
                aria-selected={tab === 'login'}
              >Sign In</button>
              <button
                type="button" role="tab"
                className={`lp-tab${tab === 'signup' ? ' lp-tab--active' : ''}`}
                onClick={() => switchTab('signup')}
                aria-selected={tab === 'signup'}
              >Create Account</button>
            </div>

            {/* ── Heading ── */}
            <AnimatePresence mode="wait">
              <motion.div key={`h-${tab}`} variants={panel} initial="hidden" animate="visible" exit="exit">
                <h2 className="lp-card-title">
                  {tab === 'login' ? 'Welcome Back' : 'Join the Network'}
                </h2>
                <p className="lp-card-sub">
                  {tab === 'login'
                    ? 'Access your placement intelligence dashboard.'
                    : 'Set up your AI-powered career profile in minutes.'}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ── Error ── */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="lp-alert"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>


            {/* ── Form ── */}
            <form onSubmit={handleSubmit} noValidate>
              <AnimatePresence mode="wait">
                <motion.div key={tab} variants={stagger} initial="hidden" animate="visible" exit="hidden">

                  {/* Signup: name only */}
                  {tab === 'signup' && (
                    <motion.div className="lp-field" variants={row}>
                      <label className="lp-label"><User size={11} /> Full Name</label>
                      <input
                        className="lp-input"
                        type="text"
                        placeholder="Your full name"
                        value={signup.name}
                        onChange={e => update('name', e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </motion.div>
                  )}

                  {/* Email */}
                  <motion.div className="lp-field" variants={row}>
                    <label className="lp-label"><Mail size={11} /> Email</label>
                    <input className="lp-input" type="email" placeholder="you@college.edu" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                  </motion.div>

                  {/* Password */}
                  <motion.div className="lp-field" variants={row}>
                    <div className="lp-label-row">
                      <label className="lp-label"><Lock size={11} /> Password</label>
                      {tab === 'login' && (
                        <button type="button" className="lp-forgot" onClick={() => setError('Password reset available when backend is connected.')}>Forgot?</button>
                      )}
                    </div>
                    <div className="lp-pw-wrap">
                      <input
                        className="lp-input lp-input--pw"
                        type={showPw ? 'text' : 'password'}
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required minLength={6}
                        autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                      />
                      <button type="button" className="lp-pw-toggle" onClick={() => setShowPw(v => !v)} aria-label="Toggle password">
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {tab === 'signup' && password.length > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="lp-strength-track">
                          <motion.div
                            className="lp-strength-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${(strength.score / 5) * 100}%`, backgroundColor: strength.color, boxShadow: `0 0 8px ${strength.color}` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        {strength.label && <span className="lp-strength-label" style={{ color: strength.color }}>{strength.label}</span>}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Remember */}
                  {tab === 'login' && (
                    <motion.label className="lp-remember" variants={row}>
                      <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                      <span>Keep me signed in</span>
                    </motion.label>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="lp-submit"
                    disabled={isLoading}
                    variants={row}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading
                      ? <Loader2 className="lp-spin" size={20} />
                      : <>
                        <Shield size={14} />
                        <span>{tab === 'login' ? 'Access Intelligence Dashboard' : 'Initialize My Profile'}</span>
                        <ArrowRight size={15} />
                      </>
                    }
                  </motion.button>

                </motion.div>
              </AnimatePresence>
            </form>

            {/* Footer */}
            <p className="lp-trust">
              <CheckCircle2 size={12} />
              Demo mode — credentials stored locally for this preview.
            </p>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default LoginPage;
