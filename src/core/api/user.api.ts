import {
  ModelsLoginUserDTO,
  ModelsRegisterUserDTO,
  ModelsUpdateUserDTO,
} from "./Api";
import { authApi, baseApi } from "./base";

export async function registerUser(user: ModelsRegisterUserDTO) {
  try {
    const response = await authApi.users.registerCreate(user);
    return response.data;
  } catch (error) {
    console.error("Error register user:", error);
    throw error;
  }
}

export async function loginUser(user: ModelsLoginUserDTO) {
  try {
    const response = await authApi.users.loginCreate(user);
    return response.data;
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await baseApi.users.logoutCreate();
    return response.data;
  } catch (error) {
    console.error("Error logout user:", error);
    throw error;
  }
}

export async function updateUser(user: ModelsUpdateUserDTO) {
  try {
    const response = await baseApi.users.updateUpdate(user);
    return response.data;
  } catch (error) {
    console.error("Error update user:", error);
    throw error;
  }
}
