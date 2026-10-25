/**
 * MOCK authentication service  –  FOR LEARNING / DEMO ONLY.
 *
 * There is no backend yet, so accounts are kept in the browser's localStorage.
 * Everything the UI needs is behind these four async functions, so later you only
 * rewrite THIS file to call your real API, for example:
 *
 *   const res = await fetch('/api/auth/login', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ email, password }),
 *   });
 *   if (!res.ok) throw new Error((await res.json()).message);
 *   return res.json();
 *
 * Never do real authentication in the browser: a real server must hash passwords
 * (bcrypt / argon2), and return a session cookie (httpOnly) or token.
 */

const USERS_KEY = 'ironforge_users';
const SESSION_KEY = 'ironforge_session';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // fake network delay

// Hash so we don't store the plain password even in this demo.
async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback; // corrupted JSON or storage not available
  }
}

const readUsers = () => readJson(localStorage, USERS_KEY, []);

// The "public" user object: everything except the password hash.
const toPublicUser = ({ passwordHash, ...user }) => user;

export async function registerUser({ fullName, email, password, planId, role = 'member' }) {
  await wait(600);

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const user = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    fullName: fullName.trim(),
    email: normalizedEmail,
    planId: planId || null,
    role: role, // 'member' or 'coach'
    createdAt: new Date().toISOString(),
    passwordHash: await hashPassword(password),
  };

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return toPublicUser(user);
}

export async function loginUser({ email, password }) {
  await wait(600);

  const normalizedEmail = email.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === normalizedEmail);
  const passwordHash = await hashPassword(password);

  // Same message for "no such user" and "wrong password" so attackers can't tell which emails exist.
  if (!user || user.passwordHash !== passwordHash) {
    throw new Error('Invalid email or password.');
  }
  return toPublicUser(user);
}

// "Remember me" ticked  -> localStorage   (survives closing the browser)
// "Remember me" cleared -> sessionStorage (gone when the tab closes)
export function saveSession(user, remember = true) {
  clearSession();
  (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession() {
  return readJson(localStorage, SESSION_KEY, null) ?? readJson(sessionStorage, SESSION_KEY, null);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}
