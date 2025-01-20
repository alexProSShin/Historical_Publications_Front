import { RolesEnum } from "@/types/auth.types";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const enableAuth = true; /* TODO */

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRoles?: RolesEnum[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const role = RolesEnum.Guest; /* TODO */
  const location = useLocation();

  if (!enableAuth) {
    return children ?? <Outlet />;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
};
