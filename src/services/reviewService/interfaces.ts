import { ITag } from "../../models/ITag";

export interface reviewServiceCreateReviewInput {
  creator: string;
  title: string;
  artItem: string;
  text: string;
  category: string;
  tags: ITag[];
  grade: number;
}
