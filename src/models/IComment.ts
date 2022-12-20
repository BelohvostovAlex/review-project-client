import { IUser } from "./IUser";

export interface IComment {
  _id?: string;
  sender: IUser;
  review: string;
  text: string;
  time: Date;
}
