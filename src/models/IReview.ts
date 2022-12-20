import { IArtItem } from "./IArtItem";
import { IComment } from "./IComment";
import { ITag } from "./ITag";

export interface IReview {
  _id: string;
  creator: string;
  title: string;
  artItem: IArtItem;
  text: string;
  category: string;
  comments: IComment[];
  image: string;
  tags: ITag[];
  grade: number;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
