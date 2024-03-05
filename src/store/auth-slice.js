import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serializeError } from "serialize-error";
import { api } from "../api/axiosInstance";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
     try {
      const response = await api.post("api/Identity/Login", credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeError(error));
    }
  }
);

const initialState = {
  isAuthenticated: Cookies.get("token") || false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearToken: (state) => {
      Cookies.remove("token");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.status === 200) {
          Cookies.set("token", payload.data.token, {});
          state.isAuthenticated = true;
        } else {
          // Handle other success cases (if needed)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.status) {
          switch (action.payload.status) {
            case 400:
              state.error = "خطأ فى اسم المستخدم او كلمه المرور";
              break;
            case 500:
              state.error = "حدث خطا ما فى السيرفر";
              break;
            default:
              state.error = "حدث خطا ما .. حاول مره اخرى";
          }
        } else {
          state.error = "حدث خطا ما .. حاول مره اخرى";
        }
      });
  },
});

export const { clearToken } = authSlice.actions;

export default authSlice.reducer;
