import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// The opposite guard: /login and /register make no sense for someone already logged in.
export default function GuestRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // Go back to the page they were trying to reach, or the dashboard by default.
    return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />;
  }
  return <Outlet />;
}
