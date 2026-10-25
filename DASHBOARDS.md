# IronForge Dashboards Documentation

## Overview

The IronForge gym system includes two comprehensive dashboard interfaces:

1. **Member Dashboard** - For gym members to track workouts, progress, and membership
2. **Coach Dashboard** - For trainers to manage clients, sessions, and programs

## Features Implemented

### Member Dashboard (`/dashboard/member`)

**Key Features:**
- **Membership Card** with NFC barcode and Apple Wallet integration
- **Stats Overview**
  - Attendance streak tracking
  - Monthly tonnage (total weight lifted)
  - Assigned coach information
  - Current weight vs goal tracking
- **Daily Workout Protocol**
  - Phase and microcycle tracking
  - Exercise list with sets, reps, and RPE targets
  - Mark exercises as done
  - Log custom sets and weights
- **Weekly Activity Calendar**
  - 7-day check-in visualization
  - Session duration tracking
  - Gate swipe timestamps
- **Body Composition**
  - InBody scan results
  - Weight and body fat percentage
  - Progress visualization
- **Upcoming Classes**
  - Class bookings with confirmation status
  - Schedule and instructor information
- **Billing & Receipts**
  - Invoice history
  - Auto-renewal status
  - Next billing date
  - Downloadable receipts

### Coach Dashboard (`/dashboard/coach`)

**Key Features:**
- **Coach Profile Header**
  - Active shift status
  - Station location
  - On-time protocol percentage
- **Stats Overview**
  - Assigned members count
  - Today's 1-on-1 sessions
  - Active split programs
  - Priority triggers/alerts
- **Priority Follow-Ups**
  - Critical client alerts (missed sessions, plateaus)
  - Direct action buttons (WhatsApp, SMS, invoicing)
  - Client notes and recommendations
- **Today's Training Schedule**
  - Session timeline with client details
  - Live status (Completed, In Session, Next Up, Upcoming)
  - Program information for each session
  - Quick action buttons (Start Session, View Logger)
- **Active Program Library**
  - Program categories (Strength, Hypertrophy, Conditioning)
  - Progress tracking per program
  - Athlete count per program
  - Edit and manage splits
- **Live Client Exercise Logs**
  - Real-time PR notifications
  - Heavy set alerts
  - Cardio achievements
  - Turnstile integration
- **Roster Metric Velocity**
  - Aggregate lean mass vs body fat chart
  - 30-day progress visualization
  - Client population analytics
- **Coach Shift Notes**
  - Session notes and observations
  - Equipment status updates
  - Client handoff information

## User Roles & Authentication

The system supports two user roles:
- **member** - Access to Member Dashboard
- **coach** - Access to Coach Dashboard

### Demo Users

You can seed demo users by opening the browser console and running:

```javascript
import('./src/utils/seedUsers.js').then(m => m.seedDemoUsers())
```

Or add this to your `main.jsx` during development:

```javascript
import { autoSeedIfEmpty } from './utils/seedUsers.js';
autoSeedIfEmpty();
```

**Demo Credentials:**

Members:
- Email: `ahmed@ironforge.com` / Password: `password123`
- Email: `sarah@ironforge.com` / Password: `password123`

Coaches:
- Email: `alex@ironforge.com` / Password: `coach123`
- Email: `maya@ironforge.com` / Password: `coach123`

## Routing

The app uses smart routing based on user role:

- `/dashboard` - Automatically redirects to appropriate dashboard based on role
- `/dashboard/member` - Direct access to Member Dashboard
- `/dashboard/coach` - Direct access to Coach Dashboard
- `/dashboard/simple` - Legacy simple dashboard (original implementation)

## Component Structure

### Pages
```
src/pages/
├── MemberDashboard.jsx       # Member dashboard component
├── MemberDashboard.css        # Member dashboard styles
├── CoachDashboard.jsx         # Coach dashboard component
├── CoachDashboard.css         # Coach dashboard styles
└── DashboardPage.jsx          # Legacy simple dashboard
```

### Data
```
src/data/
├── dashboardData.js           # Mock dashboard data
└── landing.js                 # Landing page data (plans, etc.)
```

### Components
```
src/components/layout/
├── DashboardNav.jsx           # Dashboard navigation bar
└── DashboardNav.css           # Navigation styles
```

## Styling

Both dashboards follow the IronForge design system:

- **Dark Mode** - Primary background with card-based layouts
- **Accent Color** - #00ff88 (neon green)
- **Typography** - System font stack with mono variants
- **Responsive** - Mobile-first design with breakpoints at 768px and 1024px
- **Animations** - Subtle transitions and hover effects
- **Status Badges** - Color-coded for different states (success, warning, critical)

## Data Management

Currently using mock data from `dashboardData.js`. In production, replace with:

1. **API Integration** - Fetch real data from backend endpoints
2. **State Management** - Consider Redux/Zustand for complex state
3. **Real-time Updates** - WebSocket connections for live data
4. **Caching** - React Query or SWR for data fetching

## Next Steps

### Phase 1: Backend Integration
- [ ] Connect to real API endpoints
- [ ] Implement data fetching hooks
- [ ] Add loading and error states
- [ ] Set up real-time WebSocket connections

### Phase 2: Enhanced Features
- [ ] Workout logger modal
- [ ] Calendar integration
- [ ] Messaging system
- [ ] File uploads (progress photos, documents)
- [ ] Payment processing integration
- [ ] Push notifications

### Phase 3: Analytics
- [ ] Advanced charts and graphs
- [ ] Export data to CSV/PDF
- [ ] Goal tracking and predictions
- [ ] AI-powered recommendations

### Phase 4: Mobile App
- [ ] React Native implementation
- [ ] NFC turnstile integration
- [ ] Offline mode
- [ ] Barcode scanning

## Testing

To test the dashboards:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Seed demo users** (see Demo Users section above)

3. **Login as a member** to see the Member Dashboard

4. **Logout and login as a coach** to see the Coach Dashboard

5. **Test responsive design** by resizing browser window

6. **Check routing** by navigating to different URLs

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Code Splitting** - Each dashboard loads separately
- **Lazy Loading** - Images and heavy components load on demand
- **Optimized Animations** - CSS transforms for smooth 60fps
- **Minimal Re-renders** - Proper React memoization

## Accessibility

- **WCAG 2.1 AA Compliant**
- Keyboard navigation support
- Screen reader friendly
- High contrast mode compatible
- Focus indicators on interactive elements

## License

This is a demo project for educational purposes.
