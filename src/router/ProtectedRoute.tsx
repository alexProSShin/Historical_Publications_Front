import { useAppSelector } from "@/core/store/store";
import { RolesEnum } from "@/types/auth.types";
import React, { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps extends PropsWithChildren {
  requiredRoles?: RolesEnum[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const role = useAppSelector((state) => state.auth.role);

  const location = useLocation();

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
};
