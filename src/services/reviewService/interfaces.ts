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

interface reviewServiceGetReviews {
  page?: number;
  limit?: number;
}

export interface reviewServiceGetReviewsInput extends reviewServiceGetReviews {
  search?: string;
  sort?: string;
  category?: string;
}

export interface reviewServiceGetReviewsByTagInput
  extends reviewServiceGetReviews {
  tag?: string;
}

export interface reviewServiceCreateCommentInput {
  id: string;
  userId: string;
  text: string;
}
