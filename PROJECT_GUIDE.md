# IronForge Gym System - Complete File Structure Guide

This comprehensive guide explains every file in the project, what it does, and how to modify it.

---

## 📁 Project Root Files

### `package.json`
**Purpose:** Defines project dependencies and scripts  
**Contains:** List of npm packages, scripts to run the app  
**Edit when:** Adding new packages or changing scripts  
**Example modifications:**
```json
{
  "dependencies": {
    "react": "^18.3.1",  // Add new packages here
  },
  "scripts": {
    "dev": "vite",  // Modify run commands here
  }
}
```

### `package-lock.json`
**Purpose:** Locks exact versions of dependencies  
**Contains:** Detailed dependency tree  
**Edit when:** Never manually edit - auto-generated  

### `vite.config.js`
**Purpose:** Vite bundler configuration  
**Contains:** Build settings, plugins, aliases  
**Edit when:** Changing build behavior or adding path aliases  

### `index.html`
**Purpose:** Main HTML entry point  
**Contains:** Root div where React mounts, meta tags  
**Edit when:** Changing page title, adding meta tags, fonts  

### `.gitignore`
**Purpose:** Tells Git which files to ignore  
**Contains:** node_modules, build files, env files  
**Edit when:** Adding new files/folders to ignore  

---

## 📂 `/src` Directory - Application Source Code

### `main.jsx`
**Purpose:** Application entry point  
**Contains:** React initialization, provider wrappers, auto-seeding  
**Edit when:** Adding global providers (theme, i18n), changing initialization logic  
**Key responsibilities:**
- Renders the root React component
- Wraps app with BrowserRouter for routing
- Wraps app with AuthProvider for authentication
- Auto-seeds demo users in development

```jsx
// Structure:
ReactDOM.render(
  <BrowserRouter>      // Enables routing
    <AuthProvider>     // Provides auth context
      <App />
    </AuthProvider>
  </BrowserRouter>
)
```

### `App.jsx`
**Purpose:** Main routing configuration  
**Contains:** All route definitions and role-based routing logic  
**Edit when:** Adding new pages/routes, changing access control  
**Key components:**
- `DashboardRouter` - Routes users based on role
- Public routes (home, login, register)
- Protected routes (dashboards)

**How to add a new route:**
```jsx
<Route path="/new-page" element={<NewPage />} />
```

---

## 📂 `/src/pages` - Page Components

### Landing & Auth Pages

#### `HomePage.jsx`
**Purpose:** Public landing page  
**Contains:** Hero, features, pricing, testimonials  
**Edit when:** Changing landing content, adding sections  
**Data source:** `/src/data/landing.js`  

#### `LoginPage.jsx`
**Purpose:** User login form  
**Contains:** Email/password form, remember me, seed users button  
**Edit when:** Changing login UI, adding OAuth, modifying validation  
**Key features:**
- Validates credentials
- Calls `login()` from AuthContext
- Redirects to appropriate dashboard

#### `RegisterPage.jsx`
**Purpose:** New member registration  
**Contains:** Registration form with plan selection  
**Edit when:** Adding fields, changing validation  
**Key features:**
- Collects: fullName, email, password, planId
- Calls `register()` from AuthContext
- Auto-logs in after registration

#### `NotFoundPage.jsx`
**Purpose:** 404 error page  
**Contains:** Simple "page not found" message  
**Edit when:** Customizing 404 design  

---

### Dashboard Pages

#### `MemberDashboard.jsx`
**Purpose:** Member's personal dashboard  
**Contains:** Workout protocols, stats, attendance, billing  
**Edit when:** Adding member features, changing layout  
**CSS:** `MemberDashboard.css`  
**Data:** `dashboardData.js`  
**Structure:**
```jsx
- DashboardNav (top navigation)
- Header (greeting, launch button)
- Stats Grid (4 stat cards)
- Main Grid (2 columns)
  - Left: Workouts, Weekly Activity
  - Right: Membership, Body Comp, Classes, Billing
```

#### `CoachDashboard.jsx`
**Purpose:** Coach's management interface  
**Contains:** Client roster, schedule, programs, activity feed  
**Edit when:** Adding coach tools, modifying client management  
**CSS:** `CoachDashboard.css`  
**Data:** `dashboardData.js`  
**Structure:**
```jsx
- DashboardNav
- Header (profile, shift status)
- Stats (4 metric cards)
- Grid:
  - Priority Follow-ups
  - Today's Schedule
  - Program Library
  - Live Activity Feed
  - Analytics Charts
```

#### `AdminDashboard.jsx`
**Purpose:** System administrator control panel  
**Contains:** Overview, user management, billing, settings  
**Edit when:** Adding admin features, new management sections  
**CSS:** `AdminDashboard.css`  
**Data:** `adminDashboardData.js`  
**Structure:**
```jsx
- DashboardNav
- Sidebar (14 navigation sections)
- Main Content (dynamic sections):
  - Overview (stats, quick actions, activity)
  - Members, Trainers, Managers, Users
  - Plans, Subscriptions, Payments
  - Attendance, Analytics
  - Gym Settings, Roles, System Config
```

**How to add a new admin section:**
```jsx
// 1. Add navigation button in sidebar
<button onClick={() => setActiveSection('new-section')}>
  <Icon name="icon_name" />
  <span>New Section</span>
</button>

// 2. Create section component
function NewSection() {
  return (
    <div className="admin-section">
      <header className="admin-section__header">
        <h1>Section Title</h1>
      </header>
      {/* Content here */}
    </div>
  );
}

// 3. Add to main content switch
{activeSection === 'new-section' && <NewSection />}
```

#### `MemberDirectoryPage.jsx`
**Purpose:** Operations page for member management  
**Contains:** Full member roster with search, filters, bulk actions  
**Edit when:** Adding directory features, changing table columns  
**CSS:** `MemberDirectoryPage.css`  
**Data:** `memberDirectoryData.js`  
**Features:**
- Sidebar navigation (operations menu)
- Stats cards (total, active, expiring, suspended)
- Search and filtering
- Member table with checkboxes
- Status tabs
- Scanner status indicator

#### `DashboardPage.jsx`
**Purpose:** Legacy simple dashboard  
**Contains:** Basic member info, plan display  
**Edit when:** Keeping for backwards compatibility  
**Note:** Use MemberDashboard instead for new features  

---

## 📂 `/src/components` - Reusable UI Components

### `/auth` Components

#### `AuthLayout.jsx`
**Purpose:** Wrapper for login/register pages  
**Contains:** Consistent layout, logo, form container  
**Edit when:** Changing auth page design  
**Props:**
- `title` - Page heading
- `subtitle` - Description text
- `footer` - Bottom links
- `children` - Form content

#### `FormField.jsx`
**Purpose:** Reusable form input with label and error  
**Contains:** Input, label, error message display  
**Edit when:** Adding input types, changing styling  
**Props:**
```jsx
<FormField
  id="email"
  name="email"
  type="email"
  label="Email"
  placeholder="you@example.com"
  value={value}
  onChange={handleChange}
  error={errors.email}
/>
```

#### `CheckboxField.jsx`
**Purpose:** Styled checkbox with label  
**Edit when:** Changing checkbox design  

#### `FormAlert.jsx`
**Purpose:** Error/success message display  
**Edit when:** Changing alert styling  

---

### `/cards` Components

#### `StatCard.jsx`
**Purpose:** Displays a single metric  
**Contains:** Icon, number, label, trend  
**Edit when:** Changing stat card design  

#### `CoachCard.jsx`
**Purpose:** Coach profile card for homepage  
**Props:** name, role, bio, image, badge  

#### `FeatureCard.jsx`
**Purpose:** Feature display on homepage  
**Props:** icon, title, description, tags  

#### `PricingCard.jsx`
**Purpose:** Membership plan card  
**Props:** tier, name, price, features, popular  

#### `FacilityCard.jsx`
**Purpose:** Gym facility showcase  
**Props:** title, description, image  

#### `TestimonialCard.jsx`
**Purpose:** Member testimonial  
**Props:** name, role, rating, content  

#### `TelemetryCard.jsx`
**Purpose:** Body metrics display  
**Props:** title, delta, rows  

---

### `/layout` Components

#### `Navbar.jsx`
**Purpose:** Main site navigation (homepage)  
**Contains:** Logo, nav links, auth buttons  
**Edit when:** Adding nav items, changing layout  
**CSS:** `Navbar.css`  

#### `Footer.jsx`
**Purpose:** Site footer  
**Contains:** Links, contact info, hours  
**Edit when:** Changing footer content  
**CSS:** `Footer.css`  

#### `Logo.jsx`
**Purpose:** Site logo component  
**Contains:** IronForge branding  
**Edit when:** Changing logo design  

#### `DashboardNav.jsx`
**Purpose:** Navigation bar for dashboards  
**Contains:** Logo, role-based nav links, user menu, logout  
**Edit when:** Adding dashboard nav items  
**CSS:** `DashboardNav.css`  
**Features:**
- Shows different links based on user role
- Displays user name and role badge
- Logout button

---

### `/ui` Components

#### `Button.jsx`
**Purpose:** Reusable button component  
**Variants:** primary, outline, ghost  
**Sizes:** sm, md, lg  
**Usage:**
```jsx
<Button variant="primary" size="lg">
  <Icon name="add" />
  Click Me
</Button>
```

#### `Icon.jsx`
**Purpose:** Material Symbols icon wrapper  
**Usage:**
```jsx
<Icon name="check_circle" size={24} />
```

#### `IconBadge.jsx`
**Purpose:** Icon with background badge  

#### `ImageSlot.jsx`
**Purpose:** Image with placeholder fallback  

---

### `/routing` Components

#### `GuestRoute.jsx`
**Purpose:** Redirects logged-in users away from auth pages  
**Used for:** Login, Register pages  
**Logic:** If user logged in → redirect to dashboard  

#### `ProtectedRoute.jsx`
**Purpose:** Requires authentication to access  
**Used for:** All dashboard pages  
**Logic:** If user not logged in → redirect to login  

#### `ScrollToHash.jsx`
**Purpose:** Handles anchor link scrolling  
**Used for:** Homepage navigation (#features, #pricing)  

---

## 📂 `/src/context` - React Context

### `AuthContext.jsx`
**Purpose:** Global authentication state  
**Provides:**
- `user` - Current user object or null
- `login(credentials)` - Login function
- `register(data)` - Register function
- `logout()` - Logout function

**Edit when:** Adding auth methods (OAuth), changing user structure  

**How components use it:**
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  if (!user) return <p>Not logged in</p>;
  return <p>Hello {user.fullName}</p>;
}
```

---

## 📂 `/src/services` - Business Logic

### `authService.js`
**Purpose:** Authentication API (currently mock)  
**Functions:**
- `registerUser(data)` - Creates new user
- `loginUser(credentials)` - Authenticates user
- `saveSession(user, remember)` - Stores session
- `getSession()` - Retrieves session
- `clearSession()` - Removes session

**Edit when:** Connecting to real backend API  

**Current implementation:** localStorage mock  
**Production change:**
```javascript
// Current (mock):
export async function loginUser({ email, password }) {
  const user = readUsers().find(u => u.email === email);
  return user;
}

// Production (real API):
export async function loginUser({ email, password }) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}
```

---

## 📂 `/src/data` - Static Data Files

### `landing.js`
**Purpose:** Homepage content  
**Contains:** All text, prices, features, testimonials  
**Edit when:** Updating homepage content  
**Sections:**
```javascript
export const hero = { titleLine1, description, cta... }
export const features = [{ id, icon, title, description }]
export const plans = [{ id, name, price, features }]
export const coaches = [{ id, name, role, bio }]
export const testimonials = [{ id, name, content }]
```

**How to add a new pricing plan:**
```javascript
{
  id: 5,
  tier: 'Tier 05',
  name: 'Student Special',
  price: 59,
  description: 'Budget-friendly for students',
  features: [
    { label: 'Basic gym access', included: true },
    { label: 'Personal training', included: false },
  ],
  cta: 'Choose Student Plan',
}
```

### `dashboardData.js`
**Purpose:** Member & Coach dashboard data  
**Contains:** Stats, workouts, schedules, activity  
**Edit when:** Adding features, changing mock data  

### `memberDirectoryData.js`
**Purpose:** Member roster data  
**Contains:** Member list, stats  
**Edit when:** Adding members, changing fields  

### `adminDashboardData.js`
**Purpose:** Admin dashboard metrics  
**Contains:** System stats, recent activity  
**Edit when:** Adding admin features  

### `operationsData.js`
**Purpose:** Floor operations data  
**Contains:** Zone telemetry, staff coverage  
**Edit when:** Building operations page  

---

## 📂 `/src/utils` - Helper Functions

### `validators.js`
**Purpose:** Form validation logic  
**Functions:**
- `validateLogin(values)` - Login form validation
- `validateRegister(values)` - Register form validation

**Edit when:** Adding validation rules  

**Example:**
```javascript
export function validateLogin({ email, password }) {
  const errors = {};
  
  if (!email) errors.email = 'Email is required';
  if (!email.includes('@')) errors.email = 'Invalid email';
  if (!password) errors.password = 'Password is required';
  
  return errors;
}
```

### `seedUsers.js`
**Purpose:** Creates demo users in localStorage  
**Contains:** Default user accounts  
**Edit when:** Adding roles, changing demo data  

**How to add a new demo user:**
```javascript
{
  id: 'user-7',
  fullName: 'Jane Doe',
  email: 'jane@ironforge.com',
  password: 'password123',
  planId: '2',
  role: 'member',
  createdAt: new Date().toISOString(),
}
```

---

## 📂 `/src/styles` - Global CSS

### `index.css`
**Purpose:** Global styles and CSS variables  
**Contains:**
- CSS custom properties (colors, fonts)
- CSS reset
- Utility classes

**Edit when:** Changing theme colors, typography, global styles  

**Key sections:**
```css
:root {
  --bg: #0c1112;           /* Background color */
  --text: #c4d0d1;         /* Text color */
  --accent: #2fe38f;       /* Accent/brand color */
  --border: #1c2627;       /* Border color */
}

.container { /* Max-width wrapper */ }
.card { /* Card component base */ }
.mono { /* Monospace text */ }
```

**How to change theme colors:**
```css
:root {
  --accent: #ff6b6b;  /* Change to red accent */
  --bg: #1a1a2e;      /* Change background */
}
```

---

## 📂 Page-Specific CSS Files

Each page component has a matching CSS file:

### `MemberDashboard.css`
**Controls:** Member dashboard layout and styling  
**Edit when:** Changing member dashboard design  

### `CoachDashboard.css`
**Controls:** Coach dashboard layout  
**Edit when:** Changing coach dashboard design  

### `AdminDashboard.css`
**Controls:** Admin dashboard layout  
**Edit when:** Changing admin dashboard design  

### `MemberDirectoryPage.css`
**Controls:** Member directory table and filters  
**Edit when:** Changing directory layout  

### `DashboardNav.css`
**Controls:** Dashboard navigation bar  
**Edit when:** Changing nav styling  

---

## 🔑 User Roles & Permissions

### Role Definitions

```javascript
// Defined in seedUsers.js
role: 'member'   // Regular gym member
role: 'coach'    // Trainer/coach
role: 'manager'  // Operations manager
role: 'admin'    // System administrator
```

### Role-Based Routing (in App.jsx)

```javascript
function DashboardRouter() {
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'manager') return <Navigate to="/operations/members" />;
  if (user.role === 'coach') return <CoachDashboard />;
  return <MemberDashboard />;
}
```

### How to Add a New Role

1. **Add to seedUsers.js:**
```javascript
{
  role: 'receptionist',
  // other user data
}
```

2. **Update App.jsx routing:**
```javascript
if (user.role === 'receptionist') return <ReceptionistDashboard />;
```

3. **Create new dashboard:**
```jsx
// src/pages/ReceptionistDashboard.jsx
export default function ReceptionistDashboard() {
  return <div>Receptionist Interface</div>;
}
```

---

## 🔄 Data Flow Architecture

### Authentication Flow
```
LoginPage → authService.loginUser() 
         → AuthContext.login() 
         → saves to localStorage
         → updates React state
         → triggers re-render
         → App.jsx checks role
         → redirects to appropriate dashboard
```

### Component Data Flow
```
data/*.js (static data)
    ↓
Page Component (imports data)
    ↓
Renders UI Components (passes data as props)
    ↓
UI Components display data
```

---

## 🛠️ Common Modification Scenarios

### 1. Adding a New Page

**Steps:**
```jsx
// 1. Create page component
// src/pages/NewPage.jsx
export default function NewPage() {
  return <div>New Page Content</div>;
}

// 2. Import in App.jsx
import NewPage from './pages/NewPage.jsx';

// 3. Add route
<Route path="/new-page" element={<NewPage />} />

// 4. Add navigation link (if needed)
<Link to="/new-page">New Page</Link>
```

### 2. Adding a Form Field

**Steps:**
```jsx
// 1. Add to state
const [values, setValues] = useState({
  email: '',
  newField: '',  // Add here
});

// 2. Add FormField component
<FormField
  id="newField"
  name="newField"
  label="New Field"
  value={values.newField}
  onChange={handleChange}
  error={errors.newField}
/>

// 3. Add validation (utils/validators.js)
if (!values.newField) {
  errors.newField = 'New field is required';
}
```

### 3. Changing Colors/Theme

**Steps:**
```css
/* src/styles/index.css */
:root {
  --accent: #ff6b6b;      /* Change brand color */
  --bg: #1a1a2e;          /* Change background */
  --text: #ffffff;        /* Change text color */
}
```

### 4. Adding a Dashboard Section

**For Admin Dashboard:**
```jsx
// 1. Add navigation button
<button onClick={() => setActiveSection('reports')}>
  <Icon name="assessment" />
  <span>Reports</span>
</button>

// 2. Create section function
function ReportsSection() {
  return (
    <div className="admin-section">
      <h1>Reports</h1>
      {/* Content */}
    </div>
  );
}

// 3. Add to content switch
{activeSection === 'reports' && <ReportsSection />}
```

### 5. Connecting to Real Backend

**Replace mock authService:**
```javascript
// src/services/authService.js

// Change from localStorage to API calls
export async function loginUser({ email, password }) {
  const response = await fetch('https://your-api.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // For cookies
  });
  
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  
  return response.json();
}
```

---

## 📋 File Naming Conventions

- **Pages:** `PageName.jsx` (PascalCase)
- **Components:** `ComponentName.jsx` (PascalCase)
- **Styles:** `ComponentName.css` (matches component)
- **Data:** `dataName.js` (camelCase)
- **Utils:** `utilName.js` (camelCase)
- **Services:** `serviceName.js` (camelCase)

---

## 🎯 Quick Reference: What File to Edit

**Want to change...**
- Landing page content → `/src/data/landing.js`
- Theme colors → `/src/styles/index.css`
- User roles → `/src/utils/seedUsers.js`
- Login logic → `/src/services/authService.js`
- Member dashboard → `/src/pages/MemberDashboard.jsx`
- Admin features → `/src/pages/AdminDashboard.jsx`
- Form validation → `/src/utils/validators.js`
- Routes → `/src/App.jsx`
- Navigation → `/src/components/layout/DashboardNav.jsx`

---

## 📂 Complete File Tree

```
gym-system/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
├── README.md
├── DASHBOARDS.md
├── QUICK_START.md
├── PROJECT_GUIDE.md (this file)
├── public/
│   ├── favicon.svg
│   └── images/
├── src/
│   ├── main.jsx ⭐ Entry point
│   ├── App.jsx ⭐ Routing
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── MemberDashboard.jsx ⭐
│   │   ├── MemberDashboard.css
│   │   ├── CoachDashboard.jsx ⭐
│   │   ├── CoachDashboard.css
│   │   ├── AdminDashboard.jsx ⭐
│   │   ├── AdminDashboard.css
│   │   ├── MemberDirectoryPage.jsx ⭐
│   │   ├── MemberDirectoryPage.css
│   │   ├── DashboardPage.jsx (legacy)
│   │   └── DashboardPage.css
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── CheckboxField.jsx
│   │   │   └── FormAlert.jsx
│   │   ├── cards/
│   │   │   ├── StatCard.jsx
│   │   │   ├── CoachCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── PricingCard.jsx
│   │   │   ├── FacilityCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   └── TelemetryCard.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── DashboardNav.jsx ⭐
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Icon.jsx
│   │   │   ├── IconBadge.jsx
│   │   │   └── ImageSlot.jsx
│   │   └── routing/
│   │       ├── GuestRoute.jsx
│   │       ├── ProtectedRoute.jsx
│   │       └── ScrollToHash.jsx
│   ├── context/
│   │   └── AuthContext.jsx ⭐ Auth state
│   ├── services/
│   │   └── authService.js ⭐ Auth API
│   ├── data/
│   │   ├── landing.js ⭐ Homepage content
│   │   ├── dashboardData.js
│   │   ├── memberDirectoryData.js
│   │   ├── adminDashboardData.js
│   │   └── operationsData.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── seedUsers.js ⭐ Demo users
│   └── styles/
│       └── index.css ⭐ Global styles & theme
```

⭐ = Most frequently edited files

---

This guide covers every aspect of the project. Use it as your reference whenever you need to make changes! 🚀
