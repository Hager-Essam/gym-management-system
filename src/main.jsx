import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { seedDemoUsers } from './utils/seedUsers.js';
import './styles/index.css';

// Auto-seed demo users in development if localStorage is empty
if (import.meta.env.DEV) {
  const existingUsers = localStorage.getItem('ironforge_users');
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    console.log('📦 No users found, seeding demo users...');
    seedDemoUsers().then(() => {
      console.log('✅ Demo users ready! You can now login.');
    });
  } else {
    console.log('👤 Found existing users in localStorage');
  }
}

// Expose seedDemoUsers to window for manual seeding
if (import.meta.env.DEV) {
  window.seedDemoUsers = seedDemoUsers;
  console.log('💡 Tip: Run window.seedDemoUsers() in console to manually seed users');
}

// Order matters: the Router must wrap everything that uses <Link>/useNavigate,
// and AuthProvider must wrap everything that calls useAuth().
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
