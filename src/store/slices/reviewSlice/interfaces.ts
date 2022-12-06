import { IReview } from "../../../models/IReview";

export interface ReviewState {
  reviews: IReview[];
  isLoading: boolean;
  isError: any;
}
