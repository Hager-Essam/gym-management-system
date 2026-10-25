/**
 * Data Management Service
 * Handles all CRUD operations for members, managers, trainers, plans, etc.
 * Currently uses localStorage - replace with API calls for production
 */

const STORAGE_KEYS = {
  USERS: 'ironforge_users',
  PLANS: 'ironforge_plans',
  SUBSCRIPTIONS: 'ironforge_subscriptions',
  ATTENDANCE: 'ironforge_attendance',
  PAYMENTS: 'ironforge_payments',
};

// Helper: Read from localStorage
function readFromStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch {
    return defaultValue;
  }
}

// Helper: Write to localStorage
function writeToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Helper: Generate unique ID
function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== USERS ====================

export function getAllUsers() {
  return readFromStorage(STORAGE_KEYS.USERS);
}

export function getUserById(id) {
  const users = getAllUsers();
  return users.find(u => u.id === id);
}

export function getUsersByRole(role) {
  const users = getAllUsers();
  return users.filter(u => u.role === role);
}

export function getMembers() {
  return getUsersByRole('member');
}

export function getTrainers() {
  return getUsersByRole('coach');
}

export function getManagers() {
  return getUsersByRole('manager');
}

export function getAdmins() {
  return getUsersByRole('admin');
}

export async function createUser(userData) {
  const users = getAllUsers();
  
  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existingUser) {
    throw new Error('A user with this email already exists');
  }

  // Hash password (in production, this should be done on backend)
  const passwordHash = await hashPassword(userData.password);
  
  const newUser = {
    id: generateId('user'),
    fullName: userData.fullName,
    email: userData.email.toLowerCase(),
    role: userData.role || 'member',
    planId: userData.planId || null,
    status: 'active',
    createdAt: new Date().toISOString(),
    passwordHash,
    // Additional fields
    phone: userData.phone || '',
    address: userData.address || '',
    emergencyContact: userData.emergencyContact || '',
    dateOfBirth: userData.dateOfBirth || '',
    gender: userData.gender || '',
  };

  users.push(newUser);
  writeToStorage(STORAGE_KEYS.USERS, users);
  
  // Return user without password hash
  const { passwordHash: _, ...publicUser } = newUser;
  return publicUser;
}

export function updateUser(id, updates) {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    throw new Error('User not found');
  }

  // Don't allow email duplication
  if (updates.email) {
    const emailExists = users.some(u => 
      u.id !== id && u.email.toLowerCase() === updates.email.toLowerCase()
    );
    if (emailExists) {
      throw new Error('Email already in use');
    }
  }

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeToStorage(STORAGE_KEYS.USERS, users);
  
  const { passwordHash, ...publicUser } = users[index];
  return publicUser;
}

export function deleteUser(id) {
  const users = getAllUsers();
  const filteredUsers = users.filter(u => u.id !== id);
  
  if (users.length === filteredUsers.length) {
    throw new Error('User not found');
  }

  writeToStorage(STORAGE_KEYS.USERS, filteredUsers);
  return true;
}

export function suspendUser(id, reason = '') {
  return updateUser(id, { 
    status: 'suspended', 
    suspendedAt: new Date().toISOString(),
    suspensionReason: reason 
  });
}

export function activateUser(id) {
  return updateUser(id, { 
    status: 'active',
    suspendedAt: null,
    suspensionReason: null 
  });
}

// ==================== MEMBERSHIP PLANS ====================

export function getAllPlans() {
  return readFromStorage(STORAGE_KEYS.PLANS, getDefaultPlans());
}

export function getPlanById(id) {
  const plans = getAllPlans();
  return plans.find(p => p.id === id);
}

export function createPlan(planData) {
  const plans = getAllPlans();
  
  const newPlan = {
    id: generateId('plan'),
    name: planData.name,
    tier: planData.tier || 'Standard',
    price: parseFloat(planData.price),
    duration: planData.duration || 'monthly', // monthly, quarterly, annually
    description: planData.description || '',
    features: planData.features || [],
    accessLevel: planData.accessLevel || 'basic', // basic, premium, vip
    maxClasses: planData.maxClasses || null,
    personalTraining: planData.personalTraining || false,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  plans.push(newPlan);
  writeToStorage(STORAGE_KEYS.PLANS, plans);
  return newPlan;
}

export function updatePlan(id, updates) {
  const plans = getAllPlans();
  const index = plans.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Plan not found');
  }

  plans[index] = {
    ...plans[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeToStorage(STORAGE_KEYS.PLANS, plans);
  return plans[index];
}

export function deletePlan(id) {
  const plans = getAllPlans();
  const filteredPlans = plans.filter(p => p.id !== id);
  
  if (plans.length === filteredPlans.length) {
    throw new Error('Plan not found');
  }

  writeToStorage(STORAGE_KEYS.PLANS, filteredPlans);
  return true;
}

export function deactivatePlan(id) {
  return updatePlan(id, { isActive: false });
}

export function activatePlan(id) {
  return updatePlan(id, { isActive: true });
}

// ==================== SUBSCRIPTIONS ====================

export function getAllSubscriptions() {
  return readFromStorage(STORAGE_KEYS.SUBSCRIPTIONS);
}

export function getSubscriptionsByUser(userId) {
  const subscriptions = getAllSubscriptions();
  return subscriptions.filter(s => s.userId === userId);
}

export function getActiveSubscriptions() {
  const subscriptions = getAllSubscriptions();
  return subscriptions.filter(s => s.status === 'active');
}

export function createSubscription(subscriptionData) {
  const subscriptions = getAllSubscriptions();
  
  const newSubscription = {
    id: generateId('sub'),
    userId: subscriptionData.userId,
    planId: subscriptionData.planId,
    startDate: subscriptionData.startDate || new Date().toISOString(),
    endDate: subscriptionData.endDate,
    status: 'active', // active, expired, cancelled
    paymentMethod: subscriptionData.paymentMethod || 'card',
    autoRenew: subscriptionData.autoRenew !== false,
    createdAt: new Date().toISOString(),
  };

  subscriptions.push(newSubscription);
  writeToStorage(STORAGE_KEYS.SUBSCRIPTIONS, subscriptions);
  return newSubscription;
}

export function updateSubscription(id, updates) {
  const subscriptions = getAllSubscriptions();
  const index = subscriptions.findIndex(s => s.id === id);
  
  if (index === -1) {
    throw new Error('Subscription not found');
  }

  subscriptions[index] = {
    ...subscriptions[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeToStorage(STORAGE_KEYS.SUBSCRIPTIONS, subscriptions);
  return subscriptions[index];
}

export function cancelSubscription(id, reason = '') {
  return updateSubscription(id, {
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    cancellationReason: reason,
    autoRenew: false,
  });
}

// ==================== ATTENDANCE ====================

export function recordCheckIn(userId) {
  const attendance = readFromStorage(STORAGE_KEYS.ATTENDANCE);
  
  const checkIn = {
    id: generateId('checkin'),
    userId,
    checkInTime: new Date().toISOString(),
    checkOutTime: null,
    location: 'Main Gate',
  };

  attendance.push(checkIn);
  writeToStorage(STORAGE_KEYS.ATTENDANCE, attendance);
  return checkIn;
}

export function recordCheckOut(checkInId) {
  const attendance = readFromStorage(STORAGE_KEYS.ATTENDANCE);
  const index = attendance.findIndex(a => a.id === checkInId);
  
  if (index !== -1) {
    attendance[index].checkOutTime = new Date().toISOString();
    writeToStorage(STORAGE_KEYS.ATTENDANCE, attendance);
    return attendance[index];
  }
  
  throw new Error('Check-in record not found');
}

export function getAttendanceByUser(userId, startDate, endDate) {
  const attendance = readFromStorage(STORAGE_KEYS.ATTENDANCE);
  return attendance.filter(a => {
    const matchesUser = a.userId === userId;
    const inDateRange = (!startDate || new Date(a.checkInTime) >= new Date(startDate)) &&
                        (!endDate || new Date(a.checkInTime) <= new Date(endDate));
    return matchesUser && inDateRange;
  });
}

export function getTodayCheckIns() {
  const attendance = readFromStorage(STORAGE_KEYS.ATTENDANCE);
  const today = new Date().toDateString();
  return attendance.filter(a => new Date(a.checkInTime).toDateString() === today);
}

export function getCurrentlyInGym() {
  const attendance = readFromStorage(STORAGE_KEYS.ATTENDANCE);
  return attendance.filter(a => a.checkInTime && !a.checkOutTime);
}

// ==================== PAYMENTS ====================

export function recordPayment(paymentData) {
  const payments = readFromStorage(STORAGE_KEYS.PAYMENTS);
  
  const payment = {
    id: generateId('pay'),
    userId: paymentData.userId,
    subscriptionId: paymentData.subscriptionId,
    amount: parseFloat(paymentData.amount),
    method: paymentData.method || 'card',
    status: paymentData.status || 'completed', // pending, completed, failed, refunded
    description: paymentData.description || '',
    createdAt: new Date().toISOString(),
    processedAt: paymentData.status === 'completed' ? new Date().toISOString() : null,
  };

  payments.push(payment);
  writeToStorage(STORAGE_KEYS.PAYMENTS, payments);
  return payment;
}

export function getAllPayments() {
  return readFromStorage(STORAGE_KEYS.PAYMENTS);
}

export function getPaymentsByUser(userId) {
  const payments = getAllPayments();
  return payments.filter(p => p.userId === userId);
}

export function refundPayment(paymentId, reason = '') {
  const payments = getAllPayments();
  const index = payments.findIndex(p => p.id === paymentId);
  
  if (index !== -1) {
    payments[index].status = 'refunded';
    payments[index].refundedAt = new Date().toISOString();
    payments[index].refundReason = reason;
    writeToStorage(STORAGE_KEYS.PAYMENTS, payments);
    return payments[index];
  }
  
  throw new Error('Payment not found');
}

// ==================== HELPERS ====================

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function getDefaultPlans() {
  return [
    {
      id: '1',
      tier: 'Tier 01',
      name: 'Open Gym Core',
      price: 79,
      duration: 'monthly',
      description: 'Autonomous floor access with biometric turnstile entry and full lifting equipment.',
      features: [
        '24/7 keyless NFC access',
        'Downtown flagship floor access',
        'Full barbell & power racks',
        'IronForge mobile logging app',
      ],
      accessLevel: 'basic',
      isActive: true,
    },
    {
      id: '2',
      tier: 'Tier 02',
      name: 'CrossFit & Cond.',
      price: 129,
      duration: 'monthly',
      description: 'High-intensity group programming backed by elite coaching and tracked scoring.',
      features: [
        'Unlimited coached daily WODs',
        '3,000 sq ft functional turf',
        'Dynamic mobility warm-ups',
        'WOD leaderboard sync',
      ],
      accessLevel: 'premium',
      isActive: true,
    },
    {
      id: '3',
      tier: 'Tier 03',
      name: 'Black Diamond VIP',
      price: 199,
      duration: 'monthly',
      description: 'All multi-region elevated facilities with contrast hydrotherapy suite.',
      features: [
        'Dedicated CSCS remote microcycles',
        'Infrared sauna & 38°F cold plunge',
        'Monthly InBody 770 body scan',
        'Priority bay reservations',
        'Weekly private 1-on-1 calls',
      ],
      accessLevel: 'vip',
      personalTraining: true,
      isActive: true,
    },
    {
      id: '4',
      tier: 'Tier 04',
      name: 'Elite 1-on-1',
      price: 349,
      duration: 'monthly',
      description: 'Dedicated 1-on-1 coaches for competitive-caliber and pro athletes.',
      features: [
        'Full Black Diamond VIP tier',
        'Monthly private 1-on-1 coaching',
        'Weekly body composition scoring',
        'Prescriptive regimented macros',
        'Direct WhatsApp coach channel',
        'Complimentary laundry service',
      ],
      accessLevel: 'vip',
      personalTraining: true,
      maxClasses: null,
      isActive: true,
    },
  ];
}

// ==================== STATISTICS ====================

export function getStatistics() {
  const users = getAllUsers();
  const members = getMembers();
  const subscriptions = getAllSubscriptions();
  const payments = getAllPayments();
  const todayCheckIns = getTodayCheckIns();
  const currentlyInGym = getCurrentlyInGym();

  return {
    totalUsers: users.length,
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    suspendedMembers: members.filter(m => m.status === 'suspended').length,
    totalTrainers: getTrainers().length,
    totalManagers: getManagers().length,
    totalAdmins: getAdmins().length,
    
    activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
    expiredSubscriptions: subscriptions.filter(s => s.status === 'expired').length,
    cancelledSubscriptions: subscriptions.filter(s => s.status === 'cancelled').length,
    
    todayCheckIns: todayCheckIns.length,
    currentlyInGym: currentlyInGym.length,
    
    totalRevenue: payments.reduce((sum, p) => 
      p.status === 'completed' ? sum + p.amount : sum, 0
    ),
    
    totalPayments: payments.length,
    completedPayments: payments.filter(p => p.status === 'completed').length,
    pendingPayments: payments.filter(p => p.status === 'pending').length,
  };
}

// Initialize default plans if not exists
if (getAllPlans().length === 0) {
  writeToStorage(STORAGE_KEYS.PLANS, getDefaultPlans());
}
