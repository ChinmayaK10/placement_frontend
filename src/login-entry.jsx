import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import LoginPage from './LoginPage';
import { getSession, AUTH_CHANGE_EVENT } from './auth/session';
import './AuthModal.css';

const LoginApp = () => {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    const onAuth = (e) => setUser(e.detail);
    window.addEventListener(AUTH_CHANGE_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, onAuth);
  }, []);

  useEffect(() => {
    if (user) {
      const params = new URLSearchParams(window.location.search);
      window.location.replace(params.get('redirect') || '/hiresync.html');
    }
  }, [user]);

  return (
    <StrictMode>
      <LoginPage onAuthSuccess={setUser} />
    </StrictMode>
  );
};

const root = document.getElementById('login-root');
if (root) {
  createRoot(root).render(<LoginApp />);
}
