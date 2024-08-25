import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const ProtectedRoute = () => {
  const { encodedToken } = useAuth();
  const location = useLocation();

  // If no token is present, redirect to login
  if (!encodedToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
