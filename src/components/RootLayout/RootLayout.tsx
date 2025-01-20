import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export const RootLayout = ({ children }: PropsWithChildren) => {
  console.log("root layout rendered");

  return (
    <>
      <Navbar />
      {children ?? <Outlet />}
    </>
  );
};
