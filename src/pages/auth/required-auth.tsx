import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../store";
import { getIsLogged } from "../../store/selectors";

interface RequiredAuthProps {
  children: ReactNode;
}

function RequiredAuth({ children }: RequiredAuthProps) {
  const isLogged = useAppSelector(getIsLogged);
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default RequiredAuth;
