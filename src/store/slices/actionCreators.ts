import { authSignIn } from "./authSlice/thunks/authSignInThunk";
import { authSignOut } from "./authSlice/thunks/authSignOutThunk";
import { authSignUp } from "./authSlice/thunks/authSignUpThunk";
import { getReviewsThunk } from "./reviewSlice/thunks/getReviewsThunk";

export const allActionCreators = {
  authSignIn,
  authSignOut,
  authSignUp,
  getReviewsThunk,
};
