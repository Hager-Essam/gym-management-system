# IronForge – Gym System (React + Vite)

A learning project: the IronForge landing page built with React, using the standard Vite project structure.
Plain JavaScript (JSX) and plain CSS – no extra libraries, so you can focus on React itself.

## Run it

```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # production build into /dist
```

Needs Node 18+.

## Folder structure

```
gym-system/
├── index.html              ← the single HTML page; React mounts into <div id="root">
├── vite.config.js          ← Vite + React plugin settings
├── package.json            ← dependencies and npm scripts
├── public/                 ← files served as-is (favicon, photos)
│   └── images/             ← put your photos here (see "Adding photos")
└── src/
    ├── main.jsx            ← entry point: renders <App /> into the page
    ├── App.jsx             ← root component
    ├── App.jsx             ← the route table (which URL shows which page)
    ├── pages/              ← one component per page: Home, Login, Register, Dashboard, NotFound
    ├── sections/           ← big blocks of the home page (Hero, Stats, Features, Pricing, ...)
    ├── components/
    │   ├── layout/         ← Navbar, Footer, Logo (shared across pages)
    │   ├── cards/          ← StatCard, PricingCard, CoachCard, ...
    │   ├── auth/           ← AuthLayout, FormField, CheckboxField, FormAlert
    │   ├── routing/        ← ProtectedRoute, GuestRoute, ScrollToHash
    │   └── ui/             ← tiny reusable pieces: Button, Icon, SectionHeading, ImageSlot...
    ├── context/            ← AuthContext.jsx (who is logged in + login/register/logout)
    ├── services/           ← authService.js (mock API – replace with your backend later)
    ├── hooks/              ← custom hooks (useCountUp)
    ├── utils/              ← validators.js (form validation functions)
    ├── data/               ← all page text/numbers (landing.js)
    └── styles/index.css    ← global CSS: color variables, reset, helpers
```

Each component has its own `.css` file next to it (`Button.jsx` + `Button.css`).

## Routes

| URL | Page | Who can see it |
|---|---|---|
| `/` | `HomePage` | everyone |
| `/login` | `LoginPage` | logged-out visitors only (`GuestRoute`) |
| `/register` | `RegisterPage` (`?plan=2` preselects a plan) | logged-out visitors only |
| `/dashboard` | `DashboardPage` | logged-in members only (`ProtectedRoute`) |
| anything else | `NotFoundPage` | everyone |

## How the app is built (read in this order)

1. `src/main.jsx` → wraps the app in `<BrowserRouter>` and `<AuthProvider>`, renders `App`.
2. `src/App.jsx` → the `<Routes>` table.
3. `src/pages/HomePage.jsx` → stacks the sections (Hero, Stats, Features, ...).
4. A section (e.g. `sections/Pricing.jsx`) loops over data with `.map()` and renders a card component for each item.
5. A card (e.g. `components/cards/PricingCard.jsx`) receives one item as a **prop** and returns JSX.

### The login flow, step by step

1. Visitor clicks **Member Portal Login** → `<Link to="/login">` changes the URL without reloading.
2. `GuestRoute` checks `useAuth()`; nobody is logged in, so `<Outlet />` shows `LoginPage`.
3. Typing updates the `values` state (controlled inputs). Submit runs `validateLogin()` first.
4. Valid → `login()` from `AuthContext` calls `authService.loginUser()`, saves the session, and updates `user` state.
5. `navigate('/dashboard')` – or back to the page they originally wanted, if `ProtectedRoute` sent them to `/login`.
6. Every component that calls `useAuth()` re-renders: the Navbar now shows **Dashboard / Log out**.

**Try it:** go to `/dashboard` while logged out → you're redirected to `/login`. Log in → you land on `/dashboard`.

> ⚠️ **The auth is a demo.** `services/authService.js` keeps accounts in the browser's `localStorage` so the UI works without a backend. Real authentication must happen on a server (hashed passwords, httpOnly cookie or token). When your Node/Express API is ready, only `authService.js` needs to change – the pages and context stay the same.

## React concepts you'll see (and where)

| Concept | Where to look |
|---|---|
| Components & JSX | every `.jsx` file |
| Props | `Button.jsx`, `PricingCard.jsx` |
| Rendering lists with `.map()` + `key` | `sections/Stats.jsx`, `sections/Pricing.jsx` |
| `useState` | `Navbar.jsx` (mobile menu), `ImageSlot.jsx` (image failed to load) |
| `useEffect`, `useRef` | `hooks/useCountUp.js` |
| Custom hook | `hooks/useCountUp.js` used in `StatCard.jsx` |
| Routes, `<Link>` | `App.jsx`, `Navbar.jsx`, `Button.jsx` |
| Layout routes + `<Outlet>` | `ProtectedRoute.jsx`, `GuestRoute.jsx` |
| `useNavigate`, `useLocation` | `LoginPage.jsx` (redirect after login) |
| `useSearchParams` | `RegisterPage.jsx` (`?plan=2`) |
| `<Navigate>` (redirect) | `ProtectedRoute.jsx` |
| Context (`createContext`, `useContext`) | `context/AuthContext.jsx` |
| Controlled forms & validation | `LoginPage.jsx`, `RegisterPage.jsx`, `utils/validators.js` |
| Async functions in handlers | `handleSubmit` in `LoginPage.jsx` |
| Conditional rendering (`&&`, ternary) | `Navbar.jsx`, `PricingCard.jsx` |
| Children prop | `ImageSlot.jsx` |
| Separating data from UI | `data/landing.js` |

## Adding photos

Photos are optional – a dark grid placeholder shows until a file exists. Drop images in `public/images/` using these names:

```
public/images/hero.jpg
public/images/trainers/alex.jpg  maya.jpg  david.jpg  sean.jpg
public/images/facilities/racks.jpg  cardio.jpg  turf.jpg  recovery.jpg
```

Different names? Change the paths in `src/data/landing.js`.

## Good next steps

- Build the Node/Express endpoints `POST /api/auth/register` and `POST /api/auth/login`, then rewrite `services/authService.js` to call them with `fetch`.
- Implement "Forgot password?" as a new route (`/forgot-password`).
- Grow `DashboardPage` into a real member area (nested routes: `/dashboard/bookings`, `/dashboard/progress`).
- Fetch plans/coaches from your backend with `fetch` inside `useEffect`, replacing `data/landing.js`.
