import { RoutesEnum } from "@/router";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <Link to={RoutesEnum.Home}>go gome</Link>
    </>
  );
};
