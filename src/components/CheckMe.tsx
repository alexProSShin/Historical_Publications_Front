import { ACCESS_TOKEN, USER_DATA, USER_ROLE } from "@/core/api/base";
import { IUserData, saveUserData } from "@/core/store/auth.slice";
import { useAppDispatch } from "@/core/store/store";
import { RolesEnum } from "@/types/auth.types";

export const CheckMe = () => {
  console.log("check me");

  const dispath = useAppDispatch();

  const token = localStorage.getItem(ACCESS_TOKEN);
  const userDataString = localStorage.getItem(USER_DATA);
  const userRole = localStorage.getItem(USER_ROLE) as RolesEnum;

  if (userDataString && token) {
    const userData = JSON.parse(userDataString) as IUserData;

    dispath(saveUserData({ userData: userData, role: userRole }));
  }

  return null;
};
