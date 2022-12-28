import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { authSignIn } from "./thunks/authSignInThunk";
import { authSignUp } from "./thunks/authSignUpThunk";
import { authSignOut } from "./thunks/authSignOutThunk";
import { authSignInWithSocialMedia } from "./thunks/authSignInWithSocialMediaThunk";

import { AuthState } from "./interfaces";
import { IUser } from "../../../models/IUser";

const initialState: AuthState = {
  user: {} as IUser,
  mode: "light",
  lang: "en",
  isAuth: false,
  isLoading: false,
  isError: "",
  viaSocial: false,
  withGoogle: false,
  withTwitter: false,
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
    enteredViaSocial: (state, action: PayloadAction<boolean>) => {
      state.viaSocial = action.payload;
    },
    enteredWithGoogle: (state, action: PayloadAction<boolean>) => {
      state.withGoogle = action.payload;
    },
    enteredWithTwitter: (state, action: PayloadAction<boolean>) => {
      state.withTwitter = action.payload;
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
        state.viaSocial = false;
        state.withTwitter = false;
        state.withGoogle = false;
      }
    );
    builder.addCase(authSignIn.pending, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = "";
      state.isLoading = true;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(authSignIn.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = action.payload || "Error with login";
      state.isLoading = false;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(
      authSignInWithSocialMedia.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isError = "";
        state.isLoading = false;
        state.viaSocial = true;
        state.withTwitter = false;
        state.withGoogle = true;
      }
    );
    builder.addCase(authSignInWithSocialMedia.pending, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = "";
      state.isLoading = true;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(authSignInWithSocialMedia.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = action.payload || "Error with login";
      state.isLoading = false;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(
      authSignUp.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isError = "";
        state.isLoading = false;
        state.viaSocial = false;
      }
    );
    builder.addCase(authSignUp.pending, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = "";
      state.isLoading = true;
      state.viaSocial = false;
    });
    builder.addCase(authSignUp.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = action.payload || "Error with registration";
      state.isLoading = false;
      state.viaSocial = false;
    });
    builder.addCase(authSignOut.fulfilled, (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isError = "";
      state.isLoading = false;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(authSignOut.pending, (state) => {
      state.isError = "";
      state.isLoading = true;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
    builder.addCase(authSignOut.rejected, (state, action) => {
      state.isError = action.error.message || "Error with login";
      state.isLoading = false;
      state.viaSocial = false;
      state.withTwitter = false;
      state.withGoogle = false;
    });
  },
});

export const {
  like,
  addRatedArtItem,
  changeTheme,
  changeLang,
  enteredViaSocial,
  enteredWithTwitter,
  enteredWithGoogle,
} = authSlice.actions;

export default authSlice.reducer;
