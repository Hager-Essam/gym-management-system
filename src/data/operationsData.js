export const operationsData = {
  stats: {
    todayCheckins: 342,
    checkinChange: '+12%',
    activeMembers: 1142,
    memberChange: '+284',
    newMembers: 28,
    newMemberStatus: 'Pending: 180 At-Risk',
    expiringDays: 28,
    todayRevenue: '$4,280',
    floorOccupancy: 61,
    floorStatus: 'ON-FLOOR',
  },

  shiftInfo: {
    status: 'LIVE SHIFT ACTIVE - GENERAL MANAGERS ON DUTY',
    morning: 'Morning Shift (09:00 - 14:00)',
    evening: 'Evening Shift (14:00 - 23:00)',
  },

  quickActions: [
    { icon: 'person_add', label: 'Add Member', color: 'accent' },
    { icon: 'contactless', label: 'Quick Check-in / NFC Scan', color: 'default' },
    { icon: 'receipt', label: 'Record Payment', color: 'default' },
    { icon: 'card_membership', label: 'Create Subscription', color: 'default' },
    { icon: 'add', label: 'Add Trainer / Staff', color: 'default' },
    { icon: 'description', label: 'Shift Handover Report', color: 'default' },
  },

  zoneTelemetry: [
    {
      zone: 'Free Weights & Power Racks',
      current: 43,
      capacity: 60,
      percentage: 72,
      status: 'HIGH DEMAND',
      statusClass: 'warning',
    },
    {
      zone: 'Cardio Deck & Treadmills',
      current: 34,
      capacity: 70,
      percentage: 49,
      status: 'MODERATE',
      statusClass: 'default',
    },
    {
      zone: 'Functional CrossFit Box',
      current: 28,
      capacity: 40,
      percentage: 70,
      status: 'CLASS ACTIVE',
      statusClass: 'success',
    },
    {
      zone: 'Studio B (Hot Yoga & Pilates)',
      current: 20,
      capacity: 20,
      percentage: 100,
      status: '100% AT CAPACITY',
      statusClass: 'critical',
    },
    {
      zone: 'Recovery Suite & Cold Plunge',
      current: 12,
      capacity: 20,
      percentage: 60,
      status: 'NORMAL',
      statusClass: 'success',
    },
  ],

  terminal: {
    id: 'TER-01',
    member: {
      id: '#3301',
      name: 'Marcus Aurelius',
      tier: 'CROSSFIT UNLIMITED',
      status: 'Valid and Item',
      checkInTime: 'Check-In Button',
    },
    membership: {
      status: 'Membership Expires in 24 Hours',
      warning: 'Will OFFLINE turnstile training require session payment',
    },
  },

  urgentActions: [
    {
      priority: 'HIGH',
      member: 'Elena Rostova',
      issue: 'Premium Annual · Exp in 2 days',
      location: 'Platinum After Steam',
      action: 'Quick SMS',
    },
    {
      priority: 'MEDIUM',
      member: 'Michael Chen',
      issue: 'Standard Monthly · Exp Tomorrow',
      location: 'No Alternate Given',
      action: 'Renew now',
    },
    {
      priority: 'HIGH',
      member: 'Liam Watson',
      issue: 'CREDIT 10-days: 1 Left',
      location: 'Already on hold',
      action: '10 mt TIME',
    },
  ],

  attendancePeakData: {
    labels: ['MON', 'TUE', 'WED', 'THU (TODAY)', 'FRI', 'SAT', 'SUN'],
    morning: [180, 210, 190, 220, 200, 160, 140],
    evening: [280, 310, 300, 320, 290, 240, 200],
  },

  staffCoverage: [
    {
      name: 'Alex Rivera',
      role: 'Senior Strength & Conditioning',
      shift: '06:00 - 14:00 (Elite Zone A)',
      status: 'IN BY1 with ELENA R.',
      statusClass: 'active',
    },
    {
      name: 'Maya Lin',
      role: 'Mobility & Functional Lead',
      shift: '08:30 - 14:00 Studio C (Zone)',
      status: 'WOD CLASS (18 PAX)',
      statusClass: 'class',
    },
    {
      name: 'David Miller',
      role: 'Powerlifting & Technique',
      shift: '13:00 - 21:00 (6-hr: Wts Zone)',
      status: 'FLOOR PATROL & SPOTTING',
      statusClass: 'floor',
    },
    {
      name: 'Sean Keller',
      role: 'Wellness & Recovery',
      shift: '13:00 - 23:00 (Studio B+C)',
      status: 'BREAK (BACK 11:30)',
      statusClass: 'break',
    },
  ],

  liveActivity: [
    {
      time: '09:42 AM',
      member: 'David K.',
      action: 'Check-in',
      details: 'Elite 2: 16 Wk Hyb Athlete · Activity #1',
      icon: 'login',
    },
    {
      time: '09:38 AM',
      member: 'Sarah F.',
      action: 'POS Payment',
      details: '$16.00: Small Shake order + 1PT Session',
      icon: 'payments',
    },
    {
      time: '09:30 AM',
      member: 'Hot Vinyasa',
      action: 'Class Started',
      details: 'Studio B: Cristin Meg @ 30.00 (20 foll Roster)',
      icon: 'event',
    },
    {
      time: '09:28 AM',
      member: 'Locker Checkout',
      action: 'Locker #4 Master Key',
      details: 'Locker #4 Master Key returned to Front Desk.',
      icon: 'key',
    },
  ],
};
