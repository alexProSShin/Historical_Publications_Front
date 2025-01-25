import { RolesEnum } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ModelsLoginResponseDTO,
  ModelsLoginUserDTO,
  ModelsRegisterUserDTO,
} from "../api/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../api/user.api";
import { AxiosError, isAxiosError } from "axios";
import { ACCESS_TOKEN, USER_DATA, USER_ROLE } from "../api/base";

export const loginThunk = createAsyncThunk<
  ModelsLoginResponseDTO,
  ModelsLoginUserDTO,
  { rejectValue: string }
>("auth/login", async (user: ModelsLoginUserDTO, { rejectWithValue }) => {
  try {
    const response = await loginUser(user);
    return response;
  } catch (error) {
    let errorMessage = "Неизвестная ошибка при авторизации";

    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        const status = axiosError.response.status;
        switch (status) {
          case 400:
            errorMessage =
              "Неверные данные. Пожалуйста, проверьте введённую информацию.";
            break;
          case 401:
            errorMessage = "Неверные учетные данные.";
            break;
          default:
            errorMessage = axiosError.response.data.message || errorMessage;
        }
      }
    }

    return rejectWithValue(errorMessage);
  }
});

export const registerThunk = createAsyncThunk<
  ModelsLoginResponseDTO,
  ModelsRegisterUserDTO,
  { rejectValue: string }
>("auth/register", async (user: ModelsRegisterUserDTO, { rejectWithValue }) => {
  try {
    const response = await registerUser(user);
    return response;
  } catch (error) {
    let errorMessage = "Неизвестная ошибка при регистрации";

    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response) {
        const status = axiosError.response.status;
        switch (status) {
          case 400:
            errorMessage =
              "Неверные данные. Пожалуйста, проверьте введённую информацию.";
            break;
          case 409:
            errorMessage = "Пользователь уже существует";
            break;
          default:
            errorMessage = axiosError.response.data.message || errorMessage;
        }
      }
    }

    return rejectWithValue(errorMessage);
  }
});

export interface IUserData {
  name: string;
  email: string;
  user_id: number;
}

interface AuthState {
  role: RolesEnum;
  userData?: IUserData;
  token?: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  role: RolesEnum.Guest,
  userData: undefined,
  token: undefined,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    saveUserData: (
      state,
      action: PayloadAction<{
        role: RolesEnum;
        userData: IUserData;
      }>
    ) => {
      state.role = action.payload.role;
      state.userData = action.payload.userData;
    },
    clearAuthState: (state) => {
      state.role = initialState.role;
      state.userData = initialState.userData;
      state.token = initialState.token;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      /* login */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { token, user } = action.payload;

        const userData = {
          email: user.email,
          name: user.name,
          user_id: user.user_id,
        };

        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(USER_ROLE, user.role);
        localStorage.setItem(USER_DATA, JSON.stringify(userData));

        state.token = token;
        state.userData = userData;

        state.role =
          user.role === "moderator" ? RolesEnum.Moderator : RolesEnum.User;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      /* register */
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { token, user } = action.payload;

        const userData = {
          email: user.email,
          name: user.name,
          user_id: user.user_id,
        };

        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(USER_ROLE, user.role);
        localStorage.setItem(USER_DATA, JSON.stringify(userData));

        state.token = token;
        state.userData = userData;

        state.role =
          user.role === "moderator" ? RolesEnum.Moderator : RolesEnum.User;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, saveUserData, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
