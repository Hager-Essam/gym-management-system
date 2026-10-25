/**
 * Utility to seed demo users for testing dashboards
 * Run this in browser console: import('./utils/seedUsers.js').then(m => m.seedDemoUsers())
 * Or call it from the app during development
 */

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function seedDemoUsers() {
  const demoUsers = [
    {
      id: 'member-1',
      fullName: 'Ahmed Hassan',
      email: 'ahmed@ironforge.com',
      password: 'password123',
      planId: '3', // Black Diamond VIP
      role: 'member',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'member-2',
      fullName: 'Sarah Jenkins',
      email: 'sarah@ironforge.com',
      password: 'password123',
      planId: '2', // CrossFit & Cond
      role: 'member',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'coach-1',
      fullName: 'Alex Rivera',
      email: 'alex@ironforge.com',
      password: 'coach123',
      planId: null,
      role: 'coach',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'coach-2',
      fullName: 'Maya Lin',
      email: 'maya@ironforge.com',
      password: 'coach123',
      planId: null,
      role: 'coach',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'manager-1',
      fullName: 'Marcus Vance',
      email: 'marcus@ironforge.com',
      password: 'manager123',
      planId: null,
      role: 'manager',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'admin-1',
      fullName: 'David Chen',
      email: 'admin@ironforge.com',
      password: 'admin123',
      planId: null,
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
  ];

  const usersWithHash = await Promise.all(
    demoUsers.map(async (user) => {
      const { password, ...userData } = user;
      return {
        ...userData,
        passwordHash: await hashPassword(password),
      };
    })
  );

  localStorage.setItem('ironforge_users', JSON.stringify(usersWithHash));
  
  console.log('✅ Demo users seeded!');
  console.log('Members:');
  console.log('  - ahmed@ironforge.com / password123 (Member)');
  console.log('  - sarah@ironforge.com / password123 (Member)');
  console.log('Coaches:');
  console.log('  - alex@ironforge.com / coach123 (Coach)');
  console.log('  - maya@ironforge.com / coach123 (Coach)');
  console.log('Management:');
  console.log('  - marcus@ironforge.com / manager123 (Manager)');
  console.log('  - admin@ironforge.com / admin123 (Admin)');
  
  return usersWithHash;
}

// Auto-seed in development if no users exist
export function autoSeedIfEmpty() {
  const existingUsers = localStorage.getItem('ironforge_users');
  if (!existingUsers || JSON.parse(existingUsers).length === 0) {
    console.log('📦 No users found, auto-seeding demo users...');
    return seedDemoUsers();
  }
}
