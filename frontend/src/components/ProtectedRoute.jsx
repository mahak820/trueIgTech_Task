import { Navigate } from 'react-router-dom';
import { isAuthenticated, getAuthUser } from '../utils/auth';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const authenticated = isAuthenticated();
 const {user} = useSelector(state => state.auth)

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
