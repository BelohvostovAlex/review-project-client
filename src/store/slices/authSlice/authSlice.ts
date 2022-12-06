import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "./interfaces";
import { IUser } from "../../../models/IUser";
import { authSignIn } from "./thunks/authSignInThunk";
import { authSignUp } from "./thunks/authSignUpThunk";
import { authSignOut } from "./thunks/authSignOutThunk";

const initialState: AuthState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
  isError: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      authSignIn.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isError = "";
        state.isLoading = false;
      }
    );
    builder.addCase(authSignIn.pending, (state) => {
      state.isAuth = false;
      state.isError = "";
      state.isLoading = true;
    });
    builder.addCase(authSignIn.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = action.payload || "Error with login";
      state.isLoading = false;
    });
    builder.addCase(
      authSignUp.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isError = "";
        state.isLoading = false;
      }
    );
    builder.addCase(authSignUp.pending, (state) => {
      state.isAuth = false;
      state.isError = "";
      state.isLoading = true;
    });
    builder.addCase(authSignUp.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = action.payload || "Error with registration";
      state.isLoading = false;
    });
    builder.addCase(authSignOut.fulfilled, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = "";
      state.isLoading = false;
    });
    builder.addCase(authSignOut.pending, (state) => {
      state.isError = "";
      state.isLoading = true;
    });
    builder.addCase(authSignOut.rejected, (state, action) => {
      state.isError = action.error.message || "Error with login";
      state.isLoading = false;
    });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
