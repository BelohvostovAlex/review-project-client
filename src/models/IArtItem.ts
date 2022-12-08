import { IRating } from "./IRating";

export interface IArtItem {
  _id?: string;
  title: string;
  rating?: IRating[];
  averageRating?: string;
  inputValue?: string;
}
