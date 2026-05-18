import React, { StrictMode, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import PillNav from './PillNav';
import { getSession, clearSession, AUTH_CHANGE_EVENT } from './auth/session';
import logoUrl from '/assets/9026a31c-LOGO.svg';

const App = () => {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    const onAuth = (e) => setUser(e.detail);
    window.addEventListener(AUTH_CHANGE_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, onAuth);
  }, []);

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <StrictMode>
      <PillNav
        logo={logoUrl}
        logoAlt="Reality Check AI"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Reality Check AI', href: '/realitycheck.html' },
          { label: 'Analytics', href: '/analytics.html' },
          { label: 'About', href: '/about.html' },
        ]}
        activeHref={
          window.location.pathname === '/' || window.location.pathname.endsWith('index.html')
            ? '/'
            : window.location.pathname
        }
        ease="power3.out"
        baseColor="#0a0f1e"
        pillColor="#111827"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#2c95ff"
        initialLoadAnimation={false}
        user={user}
        onLogout={handleLogout}
      />
    </StrictMode>
  );
};

const mountNav = () => {
  try {
    const existingNav = document.querySelector('#ipj4');
    if (existingNav) existingNav.style.display = 'none';

    const isHome =
      window.location.pathname === '/' ||
      window.location.pathname.endsWith('index.html') ||
      window.location.pathname === '';

    let mountEl = document.getElementById('pill-nav-root-container');
    if (!mountEl) {
      mountEl = document.createElement('div');
      mountEl.id = 'pill-nav-root-container';
      Object.assign(mountEl.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '9999',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 4rem',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: 'none',
        boxShadow: 'none',
        boxSizing: 'border-box',
        opacity: isHome ? '0' : '1',
        transform: isHome ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      });
      document.body.prepend(mountEl);
    }

    createRoot(mountEl).render(<App />);

    let revealed = false;
    const revealNav = (delay = 0) => {
      if (revealed) return;
      revealed = true;
      setTimeout(() => {
        const onHome =
          window.location.pathname === '/' ||
          window.location.pathname.endsWith('index.html') ||
          window.location.pathname === '';

        const showNav = () => {
          mountEl.style.opacity = '1';
          mountEl.style.transform = 'translateY(0)';
          mountEl.style.pointerEvents = 'auto';
        };

        if (onHome) {
          const scrollRevealSec =
            document.getElementById('pwb-chatbot-sec') || document.querySelector('footer');
          if (scrollRevealSec) {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  showNav();
                  mountEl.dataset.revealed = 'true';
                } else if (mountEl.dataset.revealed !== 'true') {
                  mountEl.style.opacity = '0';
                  mountEl.style.transform = 'translateY(-100%)';
                }
              });
            }, { threshold: 0.1 });
            observer.observe(scrollRevealSec);
          }
        } else {
          showNav();
        }
      }, delay);
    };

    const loadingWrap = document.querySelector('#pwb-loading-wrap');
    const isLoaderHidden = (el) => {
      if (!el || !el.isConnected) return true;
      const cs = window.getComputedStyle(el);
      return (
        el.style.display === 'none' ||
        el.style.opacity === '0' ||
        cs.display === 'none' ||
        cs.visibility === 'hidden' ||
        parseFloat(cs.opacity) < 0.05
      );
    };

    if (loadingWrap) {
      if (isLoaderHidden(loadingWrap)) {
        revealNav(400);
      } else {
        const styleObserver = new MutationObserver(() => {
          if (isLoaderHidden(loadingWrap)) {
            styleObserver.disconnect();
            revealNav(600);
          }
        });
        styleObserver.observe(loadingWrap, {
          attributes: true,
          attributeFilter: ['style', 'class'],
        });
      }
    } else {
      revealNav(100);
    }

    setTimeout(() => revealNav(0), 1500);
  } catch (err) {
    console.error('mountNav:', err);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountNav);
} else {
  mountNav();
}
