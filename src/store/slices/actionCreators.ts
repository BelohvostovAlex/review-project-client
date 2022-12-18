import { authSignIn } from "./authSlice/thunks/authSignInThunk";
import { authSignOut } from "./authSlice/thunks/authSignOutThunk";
import { authSignUp } from "./authSlice/thunks/authSignUpThunk";
import { like } from "./authSlice/authSlice";
import { addRatedArtItem } from "./authSlice/authSlice";
import { changeTheme } from "./authSlice/authSlice";
import { changeLang } from "./authSlice/authSlice";

export const allActionCreators = {
  authSignIn,
  authSignOut,
  authSignUp,
  like,
  addRatedArtItem,
  changeLang,
  changeTheme,
};
