import { IReview } from "../IReview";

export interface ReviewsResponse {
  reviews: IReview[];
  limit: number;
  page: number;
  total: number;
}
