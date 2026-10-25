/**
 * All the text/numbers shown on the home page live here.
 * Components receive this data as props, so you can edit content without touching layout code.
 * Photos go in /public/images/... (paths below). Until a photo exists, a placeholder is shown.
 */

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Facility & Equipment', href: '#facilities' },
  { label: 'Membership Plans', href: '#pricing' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'About', href: '#about' },
];

export const hero = {
  badge: 'Biomechanical Athletic Hub · Tier 4.2',
  titleLine1: 'Architect your strength.',
  titleHighlight: 'Calibrated',
  titleLine2: 'for human performance.',
  description:
    'Where Olympic lifting, biomechanical progression, and automated facility intelligence meet. Experience science-driven coaching, seamless NFC turnstile access, and customized hypertrophy splits calibrated to your neurological threshold.',
  primaryCta: { label: 'Start 7-Day Trial', to: '/register' },
  secondaryCta: { label: 'View Membership Plans', href: '#pricing' },
  trust: [
    { icon: 'contactless', label: 'Sub-50ms NFC Turnstiles' },
    { icon: 'verified', label: 'NSCA-CSCS Accredited Staff' },
  ],
  image: '/images/hero.jpg',
  barVelocity: { label: 'Bar velocity', value: '0.82', unit: 'm/s', zone: '100 RPM · Zone 4' },
  floorLoad: {
    label: 'Floor dynamic load',
    status: 'Optimal (44%)',
    percent: 44,
    footLeft: 'Power racks 3',
    footRight: 'Cryo-bay open',
  },
};

export const stats = [
  { id: 1, label: 'Cohort capacity', icon: 'groups', value: 1200, suffix: '+', caption: 'Active registered athletes' },
  { id: 2, label: 'Equipment telemetry', icon: 'fitness_center', value: 280, suffix: '+', caption: 'Calibrated instruments & sets' },
  { id: 3, label: 'Success rate', icon: 'trending_up', value: 98.4, decimals: 1, suffix: '%', caption: 'Member goal-attainment index' },
  { id: 4, label: 'Access', icon: 'door_front', text: '24/7/365', caption: 'Biometric smart turnstile access' },
];

export const featuresHeader = {
  eyebrow: 'Platform capabilities',
  title: 'Engineered for zero operational friction.',
  description:
    'We replaced outdated clipboard regimens and crowded front desks with real-time biometric telemetry, dedicated coaching nodes, and adaptive physical infrastructure.',
  status: 'Active systems: 5/5 online',
};

export const features = [
  {
    id: 1,
    icon: 'sports_gymnastics',
    title: 'Professional Trainers & CSCS Coaches',
    description:
      'Every coach is NSCA-CSCS or USAW credentialed. Program microcycles with precise loading parameters, periodized volume deltas, and auto-regulated load.',
    tags: [{ label: 'Periodized periods' }, { label: '1:1 dedicated', accent: true }],
  },
  {
    id: 2,
    icon: 'tune',
    title: 'Personalized Biomechanical Workouts',
    description:
      'Dynamic RPE auto-regulation, programmed eccentric tempo sequences (e.g., 3-1-X-1), and algorithmic exercise substitutions tuned to your anthropometry.',
    tags: [{ label: 'RPE / RIR telemetry' }, { label: 'Live sync', accent: true }],
  },
  {
    id: 3,
    icon: 'contactless',
    title: 'Automated Membership & Keyless Access',
    description:
      'Seamless NFC wristband or mobile pass authentication. Walk in 24/7 without desk sign-ins, punch cards, or queues.',
    tags: [{ label: 'Apple / Google Wallet' }, { label: '<10ms pass', accent: true }],
  },
  {
    id: 4,
    icon: 'monitor_weight',
    title: 'Precision Progress & InBody Telemetry',
    description:
      'Dual-frequency segmental bioelectrical impedance analysis. Monitor skeletal muscle mass, visceral adipose area, and unilateral strength symmetry directly in the member portal.',
    tags: [{ label: 'Clinical-grade composition' }, { label: 'Accuracy ±0.8%', accent: true }],
  },
  {
    id: 5,
    icon: 'radar',
    title: 'Turnstile & Attendance Intelligence',
    description:
      'Live floor density analytics. Check barbell platform availability, spot cardio stations, and projected quiet hours before you leave your front door.',
    tags: [{ label: 'Real-time density' }, { label: 'Radar active', accent: true }],
  },
];

export const telemetrySnapshot = {
  title: 'InBody 570 telemetry snapshot',
  delta: { label: 'Lean body mass', value: '+4.2 kg' },
  rows: [
    { label: 'Upper body symmetry', value: '98.2%', percent: 98.2 },
    { label: 'Lower body symmetry', value: '97.9%', percent: 97.9 },
  ],
};

export const pricingHeader = {
  eyebrow: 'Transparent subscriptions',
  title: 'Calibrated access for every objective',
  description:
    'No initiation fees, no predatory exit clauses. Every membership tier includes IronForge OS digital platform integration and full locker access.',
};

export const plans = [
  {
    id: 1,
    tier: 'Tier 01',
    name: 'Open Gym Core',
    price: 79,
    description: 'Autonomous floor access with biometric turnstile entry and full lifting equipment.',
    features: [
      { label: '24/7 keyless NFC access', included: true },
      { label: 'Downtown flagship floor access', included: true },
      { label: 'Full barbell & power racks', included: true },
      { label: 'IronForge mobile logging app', included: true },
      { label: 'Coached focus hours', included: false },
      { label: 'Recovery suite access', included: false },
    ],
    cta: 'Choose Core Pass',
  },
  {
    id: 2,
    tier: 'Tier 02',
    name: 'CrossFit & Cond.',
    price: 129,
    popular: true,
    description: 'High-intensity group programming backed by elite coaching and tracked scoring.',
    features: [
      { label: 'Unlimited coached daily WODs', included: true },
      { label: '3,000 sq ft functional turf', included: true },
      { label: 'Dynamic mobility warm-ups', included: true },
      { label: 'WOD leaderboard sync', included: true },
      { label: 'Open gym & group open', included: false },
    ],
    cta: 'Enroll in Conditioning',
  },
  {
    id: 3,
    tier: 'Tier 03',
    name: 'Black Diamond VIP',
    price: 199,
    description: 'All multi-region elevated facilities with contrast hydrotherapy suite.',
    features: [
      { label: 'Dedicated CSCS remote microcycles', included: true },
      { label: 'Infrared sauna & 38°F cold plunge', included: true },
      { label: 'Monthly InBody 770 body scan', included: true },
      { label: 'Priority bay reservations', included: true },
      { label: 'Weekly private 1-on-1 calls', included: true },
    ],
    cta: 'Claim Black Diamond',
  },
  {
    id: 4,
    tier: 'Tier 04',
    name: 'Elite 1-on-1',
    price: 349,
    description: 'Dedicated 1-on-1 coaches for competitive-caliber and pro athletes.',
    features: [
      { label: 'Full Black Diamond VIP tier', included: true },
      { label: 'Monthly private 1-on-1 coaching', included: true },
      { label: 'Weekly body composition scoring', included: true },
      { label: 'Prescriptive regimented macros', included: true },
      { label: 'Direct WhatsApp coach channel', included: true },
      { label: 'Complimentary laundry service', included: true },
    ],
    cta: 'Apply for Elite',
  },
];

export const coachesHeader = {
  eyebrow: 'Coaching cadre',
  title: 'Master biomechanists & strength directors',
  linkLabel: 'View all 14 staff bios',
  linkHref: '#coaches',
};

export const coaches = [
  {
    id: 1,
    name: 'Alex Rivera, CSCS',
    badge: '15+ yrs exp',
    role: 'Head of Strength & Powerlifting',
    bio: 'Former collegiate strength coach. Has prepared 140+ competitive lifters with custom-tuned block periodization.',
    image: '/images/trainers/alex.jpg',
  },
  {
    id: 2,
    name: 'Maya Lin',
    badge: 'USAW L2 · 8 yrs',
    role: 'Mobility & Functional Movement Director',
    bio: 'Specializes in thoracic mobility, hip stabilization for athletes, and dynamic stability for high-volume lifters.',
    image: '/images/trainers/maya.jpg',
  },
  {
    id: 3,
    name: 'David Miller',
    badge: 'Natl champion',
    role: 'Olympic Weightlifting Specialist',
    bio: 'National-level weightlifter. Expert in snatch and clean & jerk technique with hands-on bar path correction.',
    image: '/images/trainers/david.jpg',
  },
  {
    id: 4,
    name: 'Sean Keller',
    badge: 'Ex-physiologist',
    role: 'Athletic Recovery & Hypertrophy',
    bio: 'Exercise physiology veteran. Oversees contrast hydrotherapy, CNS fatigue management, and hypertrophy blocks.',
    image: '/images/trainers/sean.jpg',
  },
];

export const facilitiesHeader = {
  eyebrow: 'IronForge specifications',
  title: 'Industrial-grade training infrastructure',
  description:
    'Engineered without compromises. Over 28,000 square feet of competition-certified equipment, isolated acoustic vibration flooring, and clinical recovery systems.',
};

export const facilities = [
  {
    id: 1,
    title: '12 Eleiko Olympic Racks',
    description: 'Power racks fitted with calibrated competition plate sets, safety straps, and integrated velocity tracking.',
    image: '/images/facilities/racks.jpg',
  },
  {
    id: 2,
    title: 'Concept2 & Woodway Fleet',
    description: 'RowErgs, SkiErgs, and Woodway curved-belt treadmills for metabolic conditioning.',
    image: '/images/facilities/cardio.jpg',
  },
  {
    id: 3,
    title: '4,000 sq ft Functional Turf',
    description: 'Indoor turf lanes equipped with Rogue sleds, prowlers, climbing ropes, and battle ropes.',
    image: '/images/facilities/turf.jpg',
  },
];

export const recovery = {
  image: '/images/facilities/recovery.jpg',
  title: 'Thermal Contrast Recovery',
  description:
    'Scandinavian cedar saunas running at 195°F paired with continuously filtered 39°F ice-cold immersion tubs for rapid, systemic CNS reset.',
  specs: [{ label: 'Sauna: 195°F' }, { label: 'Plunge: 39°F' }, { label: 'Ozone purified', accent: true }],
};

export const lockers = {
  title: 'Executive Locker Hub',
  description: 'Keyless NFC smart lockers, high-pressure rain shower bays, premium grooming stations, and complimentary towel service.',
  tags: [{ label: 'Smart NFC lockers' }, { label: 'Wristband paired', accent: true }],
};

export const testimonialsHeader = {
  eyebrow: 'Athlete field notes',
  title: 'Calibrated results, verified.',
};

export const testimonials = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Competitive Powerlifter (63kg)',
    rating: 5,
    content:
      'The split builder and RPE logging transformed my training. Having trained coaches inside one calibrated platform means my fatigue is managed and my total keeps climbing.',
  },
  {
    id: 2,
    name: 'Marcus Aurelio',
    role: 'Tech Executive',
    rating: 5,
    content:
      'The 24/7 keyless turnstiles and the floor density tracking are a game changer. I tap my Apple Watch at 5 AM and hit the platform with zero friction.',
  },
  {
    id: 3,
    name: 'Sarah Jenkins',
    role: 'Hybrid Competitor & Marathoner',
    rating: 5,
    content:
      'The most professional gym environment I have ever experienced. Coaching staff is truly CSCS-certified, the cold plunge protocol is measurable, and the community is focused on the work.',
  },
];

export const cta = {
  eyebrow: 'Immediate onboarding',
  title: 'Ready to elevate your training standard?',
  description:
    'Claim your complimentary 7-day access pass and biometric body scan. Step into the next generation of athletic performance operations today.',
  primary: { label: 'Claim 7-Day Access Pass', to: '/register' },
  secondary: { label: 'Schedule Facility Walkthrough', href: '#facilities' },
};

export const footer = {
  description:
    'Industrial-grade strength facility & tactical human performance center. Powered by telemetry, calibrated for elite results.',
  status: '24/7 access active',
  columns: [
    {
      title: 'Memberships & hubs',
      links: [
        { label: 'Downtown Metro (Flagship)', href: '#pricing' },
        { label: 'East District Industrial Hub', href: '#pricing' },
        { label: 'Northside Barbell Compound', href: '#pricing' },
        { label: 'Olympic Lifting Bays', href: '#facilities' },
        { label: 'Cryo & Kinetic Recovery', href: '#facilities' },
      ],
    },
    {
      title: 'Features & services',
      links: [
        { label: 'Turnstile Telemetry', href: '#features' },
        { label: 'Tiered Access Passes', href: '#pricing' },
        { label: 'Strength & Conditioning Staff', href: '#coaches' },
        { label: 'Biometric Velocity Core', href: '#features' },
        { label: 'Member Mobile App', href: '#features' },
      ],
    },
  ],
  hours: {
    title: 'Hours of operation',
    rows: [
      { label: 'Keycard floor', value: '24/7 · 365 days' },
      { label: 'Front desk / gym', value: '06:00 – 22:00' },
      { label: 'Hydro & cryo suite', value: '06:00 – 22:00' },
      { label: 'Staff coaching', value: '06:00 – 21:00' },
    ],
  },
  contact: {
    title: 'Direct contact',
    lines: ['IronForge HQ & Flagship Floor', '482 Performance Way, District 9', 'Austin, TX 78701'],
    phone: '(512) 800-4491',
    email: 'ops@ironforge-athletics.com',
  },
  legal: [
    { label: 'Facility Bylaws', href: '#' },
    { label: 'Liability & Safety', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  copyright: 'IronForge Performance Facilities Inc. All rights reserved. Powered by IronForge OS.',
};
