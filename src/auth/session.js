const STORAGE_KEY = 'realityCheckSession';
export const AUTH_CHANGE_EVENT = 'reality-check-auth';

export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (!user?.email || !user?.name) return null;
    return user;
  } catch {
    return null;
  }
}

export function saveSession(user) {
  const session = {
    ...user,
    initials: getInitials(user.name),
    loggedInAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: session }));
  return session;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_CHANGE_EVENT, { detail: null }));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signInWithCredentials({ email, password, remember = true }) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Enter a valid email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const res = await fetch('http://localhost:8001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: normalizedEmail, password })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to sign in. Check your credentials.');
  }

  const data = await res.json();

  const user = saveSession({
    id: data.user_id,
    name: data.name,
    email: data.email,
    token: data.access_token,
    role: 'Placement Candidate',
    provider: 'email',
  });

  if (!remember) {
    sessionStorage.setItem('rc_ephemeral', '1');
  } else {
    sessionStorage.removeItem('rc_ephemeral');
  }

  return user;
}

export async function signUpWithCredentials(data) {
  const normalizedEmail = data.email.trim().toLowerCase();
  if (!data.name?.trim()) throw new Error('Full name is required.');
  if (!isValidEmail(normalizedEmail)) throw new Error('Enter a valid email address.');
  if (!data.password || data.password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const res = await fetch('http://localhost:8001/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name.trim(),
      email: normalizedEmail,
      password: data.password
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || 'Failed to register account.');
  }

  const apiData = await res.json();

  return saveSession({
    id: apiData.user_id,
    name: apiData.name,
    email: apiData.email,
    token: apiData.access_token,
    role: data.targetRole?.trim() || 'Placement Candidate',
    college: data.college?.trim() || '',
    year: data.year || '',
    provider: 'email',
  });
}

export async function signInWithProvider(provider) {
  await delay(500);
  const label = provider === 'github' ? 'GitHub Developer' : 'Google User';
  return saveSession({
    id: `rc_${provider}_${Date.now()}`,
    name: label,
    email: `${provider}@realitycheck.ai`,
    role: 'Placement Candidate',
    provider,
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
