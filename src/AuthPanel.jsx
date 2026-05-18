import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  Briefcase,
  Terminal,
  Globe,
  Code2,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import {
  signInWithCredentials,
  signUpWithCredentials,
  signInWithProvider,
} from './auth/session';
import './AuthModal.css';

const emptySignup = {
  name: '',
  college: '',
  year: '3',
  degree: '',
  targetRole: '',
  github: '',
  leetcode: '',
  linkedin: '',
};

/* ── Password strength helper ── */
const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Elite'];
  const colors = ['', '#ff4444', '#ff8c00', '#f0c040', '#4caf50', '#00c3ff'];
  return { score, label: labels[score] || '', color: colors[score] || '' };
};

/* ── Stagger container variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 22, stiffness: 260 } },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.18 } },
};

const AuthPanel = ({ mode: initialMode = 'login', onSuccess, onModeChange, compact = false }) => {
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]         = useState(true);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [signup, setSignup]     = useState(emptySignup);

  useEffect(() => { setMode(initialMode); }, [initialMode]);

  const strength = useMemo(() => getStrength(password), [password]);

  const switchMode = (next) => {
    setMode(next);
    setError('');
    onModeChange?.(next);
  };

  const handleSocial = async (provider) => {
    setError('');
    setIsLoading(true);
    try {
      const user = await signInWithProvider(provider);
      onSuccess?.(user);
    } catch (err) {
      setError(err.message || 'Could not connect. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      let user;
      if (mode === 'login') {
        user = await signInWithCredentials({ email, password, remember });
      } else {
        user = await signUpWithCredentials({
          name: signup.name,
          email,
          password,
          college: signup.college,
          year: signup.year,
          targetRole: signup.targetRole || signup.degree,
        });
      }
      onSuccess?.(user);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field, val) => setSignup((prev) => ({ ...prev, [field]: val }));

  return (
    <div className={`auth-panel${compact ? ' auth-panel--compact' : ''}`}>

      <motion.div
        className="auth-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="auth-eyebrow">Placement Intelligence Network</p>
        <h2 className="auth-title">
          {mode === 'login'
            ? 'Enter the Future of Placement Intelligence'
            : 'Register Your Intelligence Profile'}
        </h2>
        <p className="auth-subtitle">
          {mode === 'login'
            ? 'Analyze your technical readiness with AI-powered career intelligence.'
            : 'Build your skill profile and get precise AI-driven placement insights.'}
        </p>
      </motion.div>

      {/* ── Mode tabs ── */}
      <motion.div
        className="auth-mode-tabs"
        role="tablist"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <button
          type="button" role="tab"
          aria-selected={mode === 'login'}
          className={`auth-mode-tab${mode === 'login' ? ' is-active' : ''}`}
          onClick={() => switchMode('login')}
        >
          Sign In
        </button>
        <button
          type="button" role="tab"
          aria-selected={mode === 'signup'}
          className={`auth-mode-tab${mode === 'signup' ? ' is-active' : ''}`}
          onClick={() => switchMode('signup')}
        >
          Create Account
        </button>
      </motion.div>

      {/* ── Error ── */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            className="auth-alert auth-alert--error"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Social buttons ── */}
      <motion.div
        className="auth-social-grid"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        <button
          type="button"
          className="social-btn google"
          disabled={isLoading}
          onClick={() => handleSocial('google')}
        >
          <Globe size={17} />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="social-btn github"
          disabled={isLoading}
          onClick={() => handleSocial('github')}
          title="Connect your real technical GitHub profile"
        >
          <Terminal size={17} />
          <span>GitHub</span>
          <div className="social-tag">Tech</div>
        </button>
      </motion.div>

      {/* ── Divider ── */}
      <motion.div
        className="auth-divider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <span>or use email</span>
      </motion.div>

      {/* ── Form ── */}
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Signup-only fields */}
            {mode === 'signup' && (
              <div className="signup-fields-scroll">
                <motion.div className="input-group" variants={itemVariants}>
                  <label><User size={12} /> Full Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={signup.name}
                    onChange={(e) => update('name', e.target.value)}
                    required autoComplete="name"
                  />
                </motion.div>

                <motion.div className="input-row" variants={itemVariants}>
                  <div className="input-group">
                    <label><GraduationCap size={12} /> College</label>
                    <input
                      type="text"
                      placeholder="IIT, BITS, etc."
                      value={signup.college}
                      onChange={(e) => update('college', e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Year</label>
                    <select value={signup.year} onChange={(e) => update('year', e.target.value)} required>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="grad">Graduate</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div className="input-group" variants={itemVariants}>
                  <label><Briefcase size={12} /> Target Role</label>
                  <input
                    type="text"
                    placeholder="SDE, Data Scientist, ML Engineer…"
                    value={signup.targetRole}
                    onChange={(e) => update('targetRole', e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div className="input-row" variants={itemVariants}>
                  <div className="input-group">
                    <label><Terminal size={12} /> GitHub</label>
                    <input
                      type="text"
                      placeholder="username"
                      value={signup.github}
                      onChange={(e) => update('github', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label><Code2 size={12} /> LeetCode</label>
                    <input
                      type="text"
                      placeholder="username"
                      value={signup.leetcode}
                      onChange={(e) => update('leetcode', e.target.value)}
                    />
                  </div>
                </motion.div>
              </div>
            )}

            {/* Email */}
            <motion.div className="input-group" variants={itemVariants} style={{ marginBottom: 0 }}>
              <label><Mail size={12} /> Email</label>
              <input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required autoComplete="email"
              />
            </motion.div>

            {/* Password */}
            <motion.div className="input-group" variants={itemVariants} style={{ marginTop: 0 }}>
              <div className="label-row">
                <label><Lock size={12} /> Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="forgot-link forgot-link-btn"
                    onClick={() => setError('Password reset available when backend is connected.')}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required minLength={6}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength bar (signup only) */}
              {mode === 'signup' && password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="auth-strength-bar">
                    <div
                      className="auth-strength-fill"
                      style={{
                        width: `${(strength.score / 5) * 100}%`,
                        background: strength.color,
                        boxShadow: `0 0 8px ${strength.color}`,
                      }}
                    />
                  </div>
                  {strength.label && (
                    <p className="auth-strength-label" style={{ color: strength.color }}>
                      {strength.label}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Remember me */}
            {mode === 'login' && (
              <motion.label className="auth-remember" variants={itemVariants}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Keep me signed in on this device</span>
              </motion.label>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading
                ? <Loader2 className="auth-spin" size={20} />
                : <>
                    <Shield size={15} />
                    <span>{mode === 'login' ? 'Access Intelligence Dashboard' : 'Initialize My Profile'}</span>
                    <ArrowRight size={16} />
                  </>
              }
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </form>

      {/* ── Trust footer ── */}
      <motion.p
        className="auth-trust"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <CheckCircle2 size={13} />
        Demo mode — credentials stored locally for this preview.
      </motion.p>
    </div>
  );
};

export default AuthPanel;
