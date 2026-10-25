import { createContext, useContext, useState } from 'react';
import { clearSession, getSession, loginUser, registerUser, saveSession } from '../services/authService.js';

/**
 * Context lets any component read "who is logged in" without passing props through every level.
 * 1) createContext   – makes the (empty) channel
 * 2) <AuthProvider>  – wraps the app and puts real values into the channel
 * 3) useAuth()       – any component calls this to read the values
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Passing a function to useState = "lazy initial state": it runs once, on first render.
  const [user, setUser] = useState(() => getSession());

  async function login({ email, password, remember }) {
    const loggedIn = await loginUser({ email, password });
    saveSession(loggedIn, remember);
    setUser(loggedIn);
    return loggedIn;
  }

  // Registering also logs the new member in.
  async function register(data) {
    const created = await registerUser(data);
    saveSession(created, true);
    setUser(created);
    return created;
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
}
