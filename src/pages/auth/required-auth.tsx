import type { ReactNode } from "react";
import { useAuth } from "./context";
import { Navigate, useLocation } from "react-router";

interface RequiredAuthProps {
  children: ReactNode;
}

function RequiredAuth({ children }: RequiredAuthProps) {
  const { isLogged } = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default RequiredAuth;
