import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AuthPanel from './AuthPanel';
import './AuthModal.css';

/* ─── Animated particle canvas ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const count = 60;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.6 ? 200 : 210,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="auth-particle-canvas"
      aria-hidden="true"
    />
  );
};

/* ─── Holographic grid lines ─── */
const HoloGrid = () => (
  <div className="auth-holo-grid" aria-hidden="true">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="auth-holo-line" style={{ '--i': i }} />
    ))}
  </div>
);

/* ─── Main modal ─── */
const AuthModal = ({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSuccess = (user) => {
    onAuthSuccess?.(user);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="auth-overlay">
          {/* Backdrop */}
          <motion.div
            className="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Particle canvas */}
          <div className="auth-particle-wrap" aria-hidden="true">
            <ParticleCanvas />
          </div>

          {/* Holographic orbs */}
          <div className="auth-orb-field" aria-hidden="true">
            <div className="auth-orb auth-orb--a" />
            <div className="auth-orb auth-orb--b" />
            <div className="auth-orb auth-orb--c" />
          </div>

          {/* Holo grid */}
          <HoloGrid />

          {/* Floating card */}
          <motion.div
            className="auth-modal-container"
            initial={{ opacity: 0, scale: 0.88, y: 32, rotateX: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280, mass: 0.9 }}
          >
            <div className="auth-glass-card">
              {/* Animated shimmer border */}
              <div className="auth-card-shimmer" aria-hidden="true" />
              {/* Scan line */}
              <div className="auth-scan-line" aria-hidden="true" />
              {/* Glow orbs inside card */}
              <div className="auth-glow-1" aria-hidden="true" />
              <div className="auth-glow-2" aria-hidden="true" />
              <div className="auth-glow-3" aria-hidden="true" />

              {/* Eyebrow */}
              <div className="auth-card-eyebrow" aria-hidden="true">
                <span className="auth-eyebrow-dot" />
                PLACEMENT INTELLIGENCE NETWORK
                <span className="auth-eyebrow-dot" />
              </div>

              <button
                type="button"
                className="auth-close-btn"
                onClick={onClose}
                aria-label="Close authentication modal"
              >
                <X size={18} />
              </button>

              <AuthPanel
                key={initialMode}
                mode={initialMode}
                onSuccess={handleSuccess}
                compact
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
