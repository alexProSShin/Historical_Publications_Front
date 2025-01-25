import { createHashRouter } from "react-router-dom";

import { EventPage } from "@/pages/EventPage/EventPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { RootLayout } from "@/components/RootLayout/RootLayout";
import { EventsPage } from "@/pages/EventsPage/EventsPage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { RolesEnum } from "@/types/auth.types";
import { PublicationPage } from "@/pages/PublicationPage/PublicationPage";
import { PublicationsPage } from "@/pages/PublicationsPage/PublicationsPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { UserPage } from "@/pages/UserPage/UserPage";

export const getRoute = (
  pathTemplate: string,
  ...args: (string | number)[]
) => {
  const paramsArray =
    pathTemplate.match(/:[^/]+/g)?.map((param) => param.slice(1)) || [];

  let resultPath = pathTemplate;
  args.forEach((arg, i) => {
    resultPath = resultPath.replace(`:${paramsArray[i]}`, String(arg));
  });
  return resultPath;
};

export enum RoutesEnum {
  Home = "/",
  Events = "/events",
  EventById = "/events/:id",
  Login = "/login",
  Register = "/register",
  PublicationById = "/publications/:id",
  Publications = "/publications",
  User = "/user",
}

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutesEnum.Register, element: <RegisterPage /> },
      { path: RoutesEnum.Login, element: <LoginPage /> },
      { path: RoutesEnum.EventById, element: <EventPage /> },
      { path: RoutesEnum.Events, element: <EventsPage /> },
      {
        element: (
          <ProtectedRoute
            requiredRoles={[RolesEnum.User, RolesEnum.Moderator]}
          />
        ),
        children: [
          { path: RoutesEnum.PublicationById, element: <PublicationPage /> },
          { path: RoutesEnum.Publications, element: <PublicationsPage /> },
          { path: RoutesEnum.User, element: <UserPage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
