import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, LayoutDashboard, User } from 'lucide-react';
import './UserMenu.css';

const UserMenu = ({ user, onLogout, variant = 'desktop' }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!user) return null;

  const initials = user.initials || user.name?.slice(0, 2).toUpperCase() || '?';

  const handleLogout = () => {
    setOpen(false);
    onLogout?.();
  };

  return (
    <div className={`user-menu user-menu--${variant}`} ref={rootRef}>
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="user-avatar" aria-hidden="true">{initials}</span>
        {variant === 'desktop' && (
          <span className="user-menu-label">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role || 'Candidate'}</span>
          </span>
        )}
        <ChevronDown size={16} className={`user-chevron${open ? ' is-open' : ''}`} />
      </button>

      {open && (
        <div className="user-dropdown" role="menu">
          <div className="user-dropdown-header">
            <span className="user-dropdown-avatar">{initials}</span>
            <div>
              <p className="user-dropdown-name">{user.name}</p>
              <p className="user-dropdown-email">{user.email}</p>
            </div>
          </div>
          <div className="user-dropdown-divider" />
          <a href="/hiresync.html" className="user-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
            <LayoutDashboard size={16} />
            Hire-Sync Dashboard
          </a>
          <a href="/analytics.html" className="user-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
            <User size={16} />
            My Analytics
          </a>
          <div className="user-dropdown-divider" />
          <button type="button" className="user-dropdown-item user-dropdown-logout" role="menuitem" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
