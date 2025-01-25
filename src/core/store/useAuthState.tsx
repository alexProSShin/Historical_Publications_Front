import { RolesEnum } from "@/types/auth.types";
import { useAppSelector } from "./store";
import { useDispatch } from "react-redux";
import { clearAppState } from "./app.slice";
import { clearAuthState } from "./auth.slice";
import { ACCESS_TOKEN, USER_DATA, USER_ROLE } from "../api/base";

export const useAuthState = () => {
  const { role, userData } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const IS_GUEST = role === RolesEnum.Guest;
  const IS_USER = role === RolesEnum.User;
  const IS_MODERATOR = role === RolesEnum.Moderator;

  const clearAllAppData = () => {
    dispatch(clearAppState());
    dispatch(clearAuthState());

    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER_ROLE);
    localStorage.removeItem(USER_DATA);
  };

  return { IS_MODERATOR, IS_USER, IS_GUEST, userData, role, clearAllAppData };
};
