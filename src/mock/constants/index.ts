import { AppPathes } from "../../components/AppRouter/interfaces";
import TextsmsIcon from "@mui/icons-material/Textsms";

export const APP_TITLE = "Reviews blog";
export const APP_LOGO = TextsmsIcon;

export const APP_LANGUAGES = ["en", "ru"];

export const APP_NAV_MENU = [{ text: "Reviews", path: AppPathes.MAIN }];

export const APP_PROFILE_MENU = [
  { text: "Profile", path: AppPathes.PROFILE },
  { text: "New Review", path: AppPathes.NEW_REVIEW },
];

export const APP_CLOUDINARY_CLOUD_NAME = "dujpbjyhd";
