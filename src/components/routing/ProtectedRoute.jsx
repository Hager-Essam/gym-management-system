import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Guards private pages. Not logged in? Send them to /login and remember where they wanted to go.
// <Outlet /> is where the child route (e.g. DashboardPage) is rendered.
export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
