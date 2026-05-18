import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import UserMenu from './UserMenu';
import './PillNav.css';

const PillItem = ({ item, index, activeHref, onEnter, onLeave, circleRef }) => {
  const isActive = activeHref === item.href;
  const navigate = (e, href) => {
    e.preventDefault();
    window.location.assign(href);
  };

  return (
    <a
      role="menuitem"
      href={item.href}
      className={`pill${isActive ? ' is-active' : ''}`}
      aria-label={item.ariaLabel || item.label}
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={() => onLeave(index)}
      onClick={(e) => navigate(e, item.href)}
      rel="noopener"
    >
      <span className="hover-circle" aria-hidden="true" ref={circleRef} />
      <span className="label-stack">
        <span className="pill-label">{item.label}</span>
        <span className="pill-label-hover" aria-hidden="true">{item.label}</span>
      </span>
    </a>
  );
};

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  ease = 'power3.out',
  baseColor = '#050810',
  pillColor = 'rgba(44, 149, 255, 0.1)',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#2c95ff',
  onMobileMenuClick,
  initialLoadAnimation = true,
  showAuth = true,
  onAuthClick,
  user = null,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  const isHome =
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname.endsWith('/') ||
    (!window.location.pathname.includes('.') && window.location.pathname.length <= 1);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const hoverLabel = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: h + 12, opacity: 0 });
        }

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 1.2, ease, overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 1.2, ease, overwrite: 'auto' }, 0);
        if (hoverLabel) {
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 1.2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const timer = setTimeout(layout, 100); // safety bounce
    window.addEventListener('resize', layout);
    
    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;
      if (logoEl) { gsap.set(logoEl, { scale: 0, opacity: 0 }); gsap.to(logoEl, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }); }
      if (navItems) { gsap.set(navItems, { opacity: 0, y: -10 }); gsap.to(navItems, { opacity: 1, y: 0, duration: 0.8, ease, delay: 0.2 }); }
    }

    return () => {
      window.removeEventListener('resize', layout);
      clearTimeout(timer);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.4, ease, overwrite: 'auto' });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.3, ease, overwrite: 'auto' });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.fromTo(img, { rotate: 0 }, { rotate: 360, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    const menu = mobileMenuRef.current;

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible', display: 'block' });
        gsap.fromTo(menu, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4, ease });
      } else {
        gsap.to(menu, { opacity: 0, y: -10, duration: 0.3, ease, onComplete: () => {
          gsap.set(menu, { visibility: 'hidden', display: 'none' });
        }});
      }
    }
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor
  };

  return (
    <div className="pill-nav-container" style={cssVars}>
      <nav className={`pill-nav ${className}`} aria-label="Primary navigation">
        {/* Back button — visible on non-home and non-specific pages */}
        {activeHref !== '/' &&
        !['/analytics.html', '/about.html', '/realitycheck.html'].includes(activeHref) ? (
          <button
            type="button"
            className="pill-nav-back-btn"
            onClick={() => (window.history.length > 1 ? window.history.back() : window.location.assign('/'))}
            aria-label="Go back"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            BACK
          </button>
        ) : (
          <div style={{ minWidth: 80 }} />
        )}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || i} role="none">
                <PillItem
                  item={item}
                  index={i}
                  activeHref={activeHref}
                  onEnter={handleEnter}
                  onLeave={handleLeave}
                  circleRef={el => { circleRefs.current[i] = el; }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="pill-nav-auth desktop-only">
          {user ? (
            <UserMenu user={user} onLogout={onLogout} variant="desktop" />
          ) : (
            <button
              type="button"
              className="auth-pill-btn login-premium"
              onClick={() => { window.location.assign('/login.html'); }}
            >
              LOG IN
            </button>
          )}
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={{ display: 'none' }}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={`mobile-${item.href || i}`}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.location.assign(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mobile-auth-row">
            {user ? (
              <UserMenu
                user={user}
                variant="mobile"
                onLogout={() => {
                  setIsMobileMenuOpen(false);
                  onLogout?.();
                }}
              />
            ) : (
              <button
                type="button"
                className="mobile-menu-link mobile-menu-auth"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAuthClick?.('login');
                }}
              >
                Log In
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
