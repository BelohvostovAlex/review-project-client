import { ITag } from "../../models/ITag";

export interface reviewServiceCreateReviewInput {
  creator: string;
  title: string;
  artItem: string;
  text: string;
  category: string;
  tags: ITag[];
  grade: number;
  image: string;
}

export interface reviewServiceGetReviewsInput {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  category?: string;
}
