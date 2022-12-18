import { IUser } from "../../../models/IUser";
import { PaletteMode } from "../../../theme/interface";

export interface AuthState {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  isError: any;
  mode: PaletteMode;
  lang: string;
}
