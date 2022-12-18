import { IReview } from "../../models/IReview";

export interface AppReviewProps {
  review: IReview;
  isFull?: boolean;
  isRelated?: boolean;
  rating?: number;
  handleRating?: (rate: number) => void;
  likeRelatedReview?: (id: string, userId: string) => void;
  handleFullReviewLikes?: () => void;
  likedReview?: (id: string, userId: string) => void;
}
