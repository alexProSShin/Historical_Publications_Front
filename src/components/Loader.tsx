import { PropsWithChildren } from "react";

export const Loader = ({
  isLoading,
  children,
}: { isLoading: boolean } & PropsWithChildren) => {
  return isLoading ? <p>Загрузка</p> : children;
};
