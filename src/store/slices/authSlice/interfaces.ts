import { IUser } from "../../../models/IUser";
import { PaletteMode } from "../../../theme/interface";

export interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  isError: any;
  mode: PaletteMode;
  viaSocial: boolean;
  withGoogle: boolean;
  withTwitter: boolean;
}
