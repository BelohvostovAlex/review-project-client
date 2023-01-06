import { AppPathes } from "../../components/AppRouter/interfaces";
import TextsmsIcon from "@mui/icons-material/Textsms";

export const APP_TITLE = "Reviews blog";
export const APP_LOGO = TextsmsIcon;

export const APP_LANGUAGES = [
  { lang: "en-EN", title: "en" },
  { lang: "ru-RU", title: "ru" },
];

export const APP_NAV_MENU = [{ text: "Reviews", path: AppPathes.MAIN }];

export const APP_PROFILE_MENU = [
  { text: "New Review", path: AppPathes.NEW_REVIEW },
];

export enum USER_STATUS {
  ACTIVE = "Active",
  BLOCKED = "Blocked",
}

export enum USER_ROLE {
  ADMIN = 1,
  REGULAR_USER = 0,
}
