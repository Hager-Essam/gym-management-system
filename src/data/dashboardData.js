/**
 * Mock data for dashboard features
 * In production, this would come from API calls
 */

export const memberStats = {
  attendanceStreak: 14,
  streakContext: '11 check-ins this month, Top 5% in gym',
  monthlyTonnage: 48200,
  tonnageDelta: '+4.3%',
  tonnagePrevious: '+1 previous 30d',
  assignedCoach: {
    name: 'Coach Alex Rivera',
    credentials: 'CSCS',
    specialty: 'Strength & Powerlifting Lead',
    avatar: '/images/trainers/alex.jpg',
    status: 'AVAILABLE',
  },
  currentWeight: 78.6,
  goalWeight: 80.3,
  weightUnit: 'kg',
  weightChange: '+0.3 KG (93.5% Goal)',
  goalProgress: 0.935,
  goalDeadline: 'Start: 82.0 kg → -5.6 kg (87% to Goal)',
};

export const dailyProtocol = {
  phase: 'Phase 2 · Microcycle Week 3',
  programName: 'Chest & Triceps Hypertrophy',
  duration: '~55 mins · 5 Exercises · Mixed sets (21-45)',
  exercises: [
    {
      id: 1,
      order: '01',
      name: 'Incline Barbell Bench Press',
      specs: '4 Sets × 8–10 Reps · Target: 75 kg · RPE 8.0',
      sets: 4,
      reps: '8-10',
      weight: '75 kg',
      rpe: 8.0,
      status: 'Mark Done',
    },
    {
      id: 2,
      order: '02',
      name: 'Flat Dumbbell Chest Press',
      specs: '3 Sets × 10–12 Reps · Target: 32 kg · Tempo: 3-0-1',
      sets: 3,
      reps: '10-12',
      weight: '32 kg',
      tempo: '3-0-1',
      status: 'Mark Done',
    },
    {
      id: 3,
      order: '03',
      name: 'Cable Chest Flyes (Low-to-High)',
      specs: '3 Sets × 12 Reps · Target: 11 kg · 2:1 L+R',
      sets: 3,
      reps: '12',
      weight: '11 kg',
      status: 'Mark Done',
    },
    {
      id: 4,
      order: '04',
      name: 'Barbell Skull Crushers',
      specs: '4 Sets × 8–10 Reps · Target: 35 kg · Do not lock out',
      sets: 4,
      reps: '8-10',
      weight: '35 kg',
      status: 'Mark Done',
    },
    {
      id: 5,
      order: '05',
      name: 'Tricep Rope Pushdowns',
      specs: '3 Sets × 12 Reps · Target: 28 kg · Do not lock out (set adj)',
      sets: 3,
      reps: '12',
      weight: '28 kg',
      status: 'Mark Done',
    },
  ],
  footer: 'Log Custom Sets & Weights',
};

export const weeklyActivity = {
  title: 'Weekly Activity Rhythm',
  subtitle: 'Gate swipes reflect check-in, not sessionduration pacing',
  completedSessions: 4,
  totalSessions: 5,
  days: [
    { day: 'MON', time: '68 min', completed: true, checkIn: '07:14 AM' },
    { day: 'TUE', time: '54 min', completed: true, checkIn: '06:22 AM' },
    { day: 'WED', time: '64 min', completed: true, checkIn: '07:04 AM' },
    { day: 'THU', time: '72 min', completed: false, checkIn: '18:31 PM' },
    { day: 'FRIDAY', time: 'Ready', completed: false, checkIn: 'Next Ready' },
    { day: 'SAT', time: '-', completed: false, checkIn: '' },
    { day: 'SUN', time: '-', completed: false, checkIn: '' },
  ],
};

export const upcomingClasses = [
  {
    id: 1,
    icon: '🔥',
    name: 'Functional HIIT & Conditioning',
    date: 'Today, 9PM · Wes Zhoals',
    location: 'Coach Alex Lin',
    status: 'CONFIRMED',
    cta: 'Assign Workout Program',
  },
  {
    id: 2,
    icon: '💪',
    name: 'Hot Yoga & Muscle Recovery',
    date: 'Saturday, 09:00 · Studio B',
    location: 'Coach Sarah Early',
    status: 'SIGNED UP',
    cta: 'View Class Details',
  },
  {
    id: 3,
    icon: '⚡',
    name: '+ Reserve Additional Class',
    cta: 'Browse Schedule',
  },
];

export const billingReceipts = [
  {
    id: 'INV-8021',
    amount: 349.0,
    date: 'Feb 01 2025 · Visa ••7213',
    status: 'Next scheduled cycle',
    nextBilling: '$85.00 on Nov 26',
    downloadable: true,
  },
];

export const bodyComposition = {
  title: 'Body Composition',
  subtitle: 'InBody 770 · January Scan',
  weight: 78.6,
  bodyFat: 15.8,
  metrics: [
    { label: 'WEIGHT', value: '78.6 kg', sublabel: '-5.4 kg last' },
    { label: 'BODY FAT %', value: '15.8 %', sublabel: '-1.1% reduction' },
  ],
  cta: 'Commit Log',
};

export const quickMetricPunch = {
  title: 'QUICK ATHLETE METRIC PUNCH',
  athleteName: 'Athlete Name',
  weight: 'Weight (kg)',
  cta: 'Commit Log',
};

// Coach Dashboard Data

export const coachProfile = {
  name: 'Coach Alex Rivera',
  credentials: '1 HEAD S&C',
  status: 'Active Shift: 07:00 – 18:30 (Tue ↓ – 11 Hrs to go)',
  facility: 'Station: Iron Bay B',
  protocol: '98% On-Time Protocol',
};

export const coachStats = {
  activeAthletes: 24,
  retention: '98%',
  context: '+3 this month · Retention: 96%',
  bookedRoster: 6,
  done: 2,
  upcoming: 1,
  leftContext: '11 Left',
  todaySessions: 18,
  customBlueprints: 18,
  blocks: '8 Block A',
};

export const assignedMembers = [
  {
    id: 1,
    initials: 'SJ',
    name: 'Sarah Jenkins',
    program: 'Missed 2 Consecutive Sessions',
    status: 'CRITICAL',
    alert: true,
    message:
      'Rehab protocol cross Parallel: Hendon hips up start Thursday. Check swelling at line before re-routing time-flexion @ line',
    actions: ['WhatsApp', 'SMS Alert'],
  },
  {
    id: 2,
    initials: 'LW',
    name: 'Liam Watson',
    program: 'Renewed Cue in 48h',
    status: 'Alert',
    alert: true,
    message:
      'Has 1 session remaining on Current 12-pack. Client requested quote for 10-pack PT extension + body composition pack',
    actions: ['Send 10-Pack Invoice'],
  },
  {
    id: 3,
    initials: 'JW',
    name: 'James Wilson',
    program: 'Weight Plateau; Flag',
    status: 'Check',
    message:
      'Stalled at 84.0 kg for 3 consecutive weeks. Caloric target needs adjustment (current: 2840 Cal/d) or deficit ramping',
    actions: ['Review Nutrition Macros'],
  },
];

export const todaySchedule = [
  {
    id: 1,
    time: '08:00 - 09:00',
    client: 'Elena Bostova',
    status: 'COMPLETED',
    program: 'Strength & Hypertrophy • Block 4 · Day 22',
    session: 'Check-In (5G)',
    sets: '38-15',
    action: 'View Logger',
  },
  {
    id: 2,
    time: '09:30 - 10:30',
    client: 'Marcus Aurelius',
    status: 'IN SESSION',
    program: 'Functional Conditioning • EMOM • Zone 4',
    rpe: '38-15',
    action: 'Open Logger',
  },
  {
    id: 3,
    time: '11:30 - 12:30',
    client: 'David Miller',
    status: 'NEXT UP',
    program: 'Powerlifting Peaking • Heavy Squats + RPE Adjust',
    warmup: 'Pre-Brief',
    action: 'Start Session',
  },
  {
    id: 4,
    time: '14:00 - 15:00',
    client: 'Sarah Jenkins',
    status: 'UPCOMING',
    program: 'Post-Rehab Lumbar Stabilization & Core Activation',
    note: 'Pre-Brief',
  },
  {
    id: 5,
    time: '16:30 - 17:30',
    client: 'Michael Chen',
    status: 'SCHEDULED',
    program: 'Body Recomposition • Push Focus + Zone 2 Cardio',
    note: 'Pre-Brief',
  },
];

export const activeProgramLibrary = [
  {
    id: 1,
    category: 'STRENGTH',
    name: '4-Day Upper/Lower Block',
    athletes: 6,
    duration: 'WEEK 6/8',
    progress: 75,
    intensity: 'Hypertrophy · Split: Upper · Progressive Load · RPE 7.5-9.0',
    cycles: [
      { label: 'Cycle Progression', value: '75%', progress: 75 },
      { label: 'Cycle Progression', value: '45%', progress: 45 },
    ],
    edit: 'Edit Split',
  },
  {
    id: 2,
    category: 'HYPERTROPHY',
    name: 'PPL Hypertrophy Focus',
    athletes: 11,
    duration: 'WEEK 4/10',
    progress: 40,
    intensity: 'Push/Pull/Legs · 6-day periodization plan',
    cycles: [{ label: 'Cycle Progression', value: '40%', progress: 40 }],
    edit: 'Edit Split',
  },
  {
    id: 3,
    category: 'CONDITIONING',
    name: 'Metabolic 6-Wk Peak',
    athletes: 7,
    duration: 'RENEW DUE',
    progress: 90,
    intensity: 'High-density RFD (power output) threshold monitoring',
    cycles: [{ label: 'Cycle Progression', value: '90%', progress: 90 }],
    edit: 'Edit Split',
  },
];

export const liveClientExerciseLogs = {
  title: 'Live Client Exercise Logs & PR Feed',
  subtitle: 'Direct stream from turnstile app, barbell-velocity-tagged + NFC set-off)',
  activities: [
    {
      id: 1,
      initials: 'ER',
      name: 'Elena Bostova',
      status: 'NEW PR',
      exercise: 'Barbell Press: 100 kg × 5 Reps (1RM = 70.0)',
      time: '14 mins ago',
    },
    {
      id: 2,
      initials: 'DM',
      name: 'David Miller',
      status: 'HEAVY SET',
      exercise: 'Romanian Back Squat: 180 kg × 3 reps (RPE = 0.5)',
      time: '24 mins ago',
    },
    {
      id: 3,
      initials: 'TB',
      name: 'Tanya Brooks',
      status: 'CARDIO CAP',
      exercise: 'Assault Bike: 100 Cal sprint in 4:18 min',
      time: '37 mins ago',
    },
  ],
  syncStatus: 'Sync: Realtime',
};

export const rosterMetricVelocity = {
  title: 'Roster Metric Velocity',
  subtitle: 'Aggregate Fat Loss vs Lean Mass Curve',
  days: 30,
  chartData: [
    { week: 'WEEK 1', leanMass: 2.5, bodyFat: 3.4 },
    { week: 'WEEK 2', leanMass: 3.8, bodyFat: 3.1 },
    { week: 'WEEK 3', leanMass: 5.2, bodyFat: 2.8 },
    { week: 'CURRENT', leanMass: 6.8, bodyFat: 2.2 },
  ],
  legend: {
    leanMass: 'Lean Mass: +2.6 kg',
    bodyFat: 'Body Fat: -3.4%',
  },
};

export const coachShiftNotes = {
  title: 'COACH SHIFT NOTES',
  subtitle: 'Turnstile 2 Barcode: session "TRAIN/JO/resolved"',
  notes: [
    "Informed 2 barcode 'scanner latency' resolved | Have Roster Reva: 4 at 11:00 to David's peaking engine",
  ],
  cta: 'Add New Note',
};

export const memberAccessPass = {
  type: 'ALL-ACCESS BLACK-DIAMOND VIP',
  status: 'ACTIVE · 23 DAYS REMAINING',
  renewalDate: 'Renewal: Nov 24, 2024',
  barcode: 'AF38812890A',
  nfcInfo: '70 35 Down NFC',
  cta: 'Admit to Apple Wallet',
  membershipDetails: {
    terminal: 'OPERATIONAL MEMBER TERMINAL · TERMINAL 04',
    greeting: 'Good morning, Ahmed 👋',
    session: "Ready to conquer today's session! Upper body hypertrophy protocol is loaded.",
    protocol: 'Upper body',
  },
  velocity: {
    label: 'Goal Velocity',
    value: '82.0 of 80',
    progress: 'Crab Velocity: 82.0 of 80 · Completed',
  },
  daysRemaining: 23,
  turnstile: 'TURNSTILE FAST-LANE',
  rate: 'RATE 01:A',
  barcodeAlt: '75 35 Down NFC',
  admitButton: 'Admit to Apple Wallet',
  launchButton: 'Launch Workout Now',
};
