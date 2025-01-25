import { clearAppState } from "../store/app.slice";
import { clearAuthState } from "../store/auth.slice";
import { store } from "../store/store";
import { Api } from "./Api";

export const BASE_URL = "/api";

export const baseApi = new Api({ baseURL: BASE_URL });
export const authApi = new Api({ baseURL: BASE_URL });

export const ACCESS_TOKEN = "access_token";
export const USER_ROLE = "user_role";
export const USER_DATA = "user_data";

baseApi.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.setAuthorization(token);
  }
  return config;
});

baseApi.instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(clearAuthState());
      store.dispatch(clearAppState());

      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_DATA);
    }
    throw error;
  }
);
