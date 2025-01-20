import { createBrowserRouter } from "react-router-dom";

import { EventPage } from "@/pages/EventPage/EventPage";
import { HomePage } from "@/pages/HomePage/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { RootLayout } from "@/components/RootLayout/RootLayout";
import { EventsPage } from "@/pages/EventsPage/EventsPage";

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
  /* PublicationById = "/publication/:id", */
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: RoutesEnum.EventById, element: <EventPage /> },
      { path: RoutesEnum.Events, element: <EventsPage /> },
      /* {
        path: RoutesEnum.PublicationById,
        element: (
          <ProtectedRoute requiredRoles={[RolesEnum.Admin]}>
            <PublicationsPage />
          </ProtectedRoute>
        ),
      }, */
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
