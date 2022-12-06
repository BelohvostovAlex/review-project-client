import { IUser } from "./IUser";

export interface IRating {
  _id: string;
  rate: number;
  user: IUser;
}
