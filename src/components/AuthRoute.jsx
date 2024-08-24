import { Navigate, useLocation, Outlet } from "react-router-dom";
import {useAuth} from "../context/authContext";

export const AuthRoute = () => {
  const { encodedToken } = useAuth();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/home";

  return encodedToken ? (
    <Navigate to={from} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
