# Quick Start Guide - IronForge Dashboards

## 🚀 Getting Started

### Step 1: Start the Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173` (or another port if 5173 is busy)

### Step 2: Create Demo Users

You have **three options** to create demo users:

#### Option A: Use the Login Page Button (Easiest!)
1. Go to `http://localhost:5173/login`
2. Click the **"🌱 Create Demo Users"** button (only visible in development mode)
3. You'll see a confirmation with the credentials

#### Option B: Browser Console
1. Open browser DevTools (F12)
2. Go to the Console tab
3. Type: `window.seedDemoUsers()`
4. Press Enter

#### Option C: Clear localStorage (Force Auto-seed)
1. Open browser DevTools (F12)
2. Go to Application tab → Local Storage
3. Clear the `ironforge_users` key
4. Refresh the page - users will auto-seed

### Step 3: Login

After creating demo users, use these credentials:

**Members:**
- Email: `ahmed@ironforge.com`
- Password: `password123`

OR

- Email: `sarah@ironforge.com`
- Password: `password123`

**Coaches:**
- Email: `alex@ironforge.com`
- Password: `coach123`

OR

- Email: `maya@ironforge.com`
- Password: `coach123`

## 📱 What You'll See

### As a Member
- Digital membership card with barcode
- Attendance streak and tonnage stats
- Daily workout protocol
- Weekly activity calendar
- Body composition tracking
- Upcoming classes
- Billing information

### As a Coach
- Active athlete roster
- Priority client alerts
- Today's training schedule
- Program management
- Live exercise logs
- Performance analytics
- Session notes

## 🔄 Switching Between Dashboards

To test both dashboards:

1. **Logout** from current dashboard (top-right corner)
2. **Login** with different credentials (member or coach)
3. You'll be automatically routed to the appropriate dashboard

## 🐛 Troubleshooting

### "Invalid email or password" Error

**Solution 1: Use the seed button**
- Go to `/login` page
- Click "🌱 Create Demo Users" button
- Try logging in again

**Solution 2: Check localStorage**
1. Open DevTools (F12) → Application → Local Storage
2. Look for `ironforge_users` key
3. If empty or missing, run `window.seedDemoUsers()` in console

**Solution 3: Manual reset**
```javascript
// Run this in browser console
localStorage.clear();
window.location.reload();
// Then click "Create Demo Users" button
```

### Users Not Auto-Seeding

The app should auto-seed users on first load. If it doesn't:

1. Check the browser console for messages
2. Manually seed using the login page button
3. Or use `window.seedDemoUsers()` in console

### Wrong Dashboard Showing

The system routes based on user role:
- Users with `role: 'member'` → Member Dashboard
- Users with `role: 'coach'` → Coach Dashboard

If you see the wrong dashboard, check:
1. You're logged in with the correct account type
2. The user object has the correct `role` field

## 📂 Key Files

```
src/
├── pages/
│   ├── LoginPage.jsx          # Has the seed button
│   ├── MemberDashboard.jsx    # Member dashboard
│   └── CoachDashboard.jsx     # Coach dashboard
├── utils/
│   └── seedUsers.js           # User seeding utility
└── main.jsx                   # Auto-seed logic
```

## 🎨 Testing Features

### Member Dashboard
- Click exercises to mark as done
- Check responsive design on mobile
- View stats and progress metrics
- Browse upcoming classes

### Coach Dashboard  
- Review priority follow-ups
- Check today's schedule
- Monitor live exercise logs
- View program progress

## 💡 Development Tips

### View Current Users
```javascript
// Run in console
JSON.parse(localStorage.getItem('ironforge_users'))
```

### Clear All Data
```javascript
// Run in console
localStorage.clear();
location.reload();
```

### Add Custom User
```javascript
// Register through the UI at /register
// Or modify seedUsers.js to add more users
```

## 🔗 Routes

- `/` - Home page
- `/login` - Login page (with seed button)
- `/register` - Registration page
- `/dashboard` - Auto-routes to appropriate dashboard
- `/dashboard/member` - Member dashboard (direct)
- `/dashboard/coach` - Coach dashboard (direct)
- `/dashboard/simple` - Legacy simple dashboard

## ✅ Checklist

Before reporting issues:

- [ ] Dev server is running (`npm run dev`)
- [ ] Clicked "Create Demo Users" button on login page
- [ ] Saw success confirmation
- [ ] Using exact credentials listed above
- [ ] Email is all lowercase (e.g., `ahmed@ironforge.com` not `Ahmed@ironforge.com`)
- [ ] Password matches exactly (copy-paste recommended)
- [ ] Checked browser console for errors

## 🎯 Next Steps

Once logged in successfully:

1. **Explore the dashboard** - Click around and test features
2. **Test responsive design** - Resize browser window
3. **Switch roles** - Logout and login as different user type
4. **Check documentation** - Read `DASHBOARDS.md` for full details

## 📞 Need Help?

If you're still having issues:

1. Check the browser console (F12) for error messages
2. Verify localStorage has users: `localStorage.getItem('ironforge_users')`
3. Try clearing localStorage and re-seeding
4. Make sure you're using the exact credentials (case-sensitive!)

---

**Pro Tip:** The easiest way to start is:
1. Run `npm run dev`
2. Go to login page
3. Click "🌱 Create Demo Users"
4. Login with `ahmed@ironforge.com` / `password123`

That's it! 🎉
