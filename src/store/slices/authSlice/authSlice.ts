import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { authSignIn } from "./thunks/authSignInThunk";
import { authSignUp } from "./thunks/authSignUpThunk";
import { authSignOut } from "./thunks/authSignOutThunk";

import { AuthState } from "./interfaces";
import { IUser } from "../../../models/IUser";

const initialState: AuthState = {
  user: {} as IUser,
  mode: "light",
  lang: "en",
  isAuth: false,
  isLoading: false,
  isError: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    like: (state, action: PayloadAction<string>) => {
      if (state.user.likedReviews.includes(action.payload)) {
        state.user.likedReviews = state.user.likedReviews.filter(
          (item) => item !== action.payload
        );
      } else {
        state.user.likedReviews.push(action.payload);
      }
    },
    addRatedArtItem: (state, action: PayloadAction<string>) => {
      !state.user.ratedArtItems.includes(action.payload) &&
        state.user.ratedArtItems.push(action.payload);
    },
    changeTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    changeLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
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
      state.user = {} as IUser;
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
      state.user = {} as IUser;
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

export const { like, addRatedArtItem, changeTheme, changeLang } =
  authSlice.actions;

export default authSlice.reducer;
