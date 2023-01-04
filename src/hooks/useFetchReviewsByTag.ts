import { useCallback, useEffect, useState } from "react";

import { reviewServiceGetReviewsByTag } from "../services/reviewService/reviewService";
import { handleLike } from "../helpers/handleLike";

import { IReview } from "../models/IReview";

interface useFetchReviewsByTagOutput {
  reviews: IReview[] | null;
  error: string;
  isLoading: boolean;
  likedReview: (id: string, userId: string) => void;
}

export const useFetchReviewsByTag = (
  tag: string
): useFetchReviewsByTagOutput => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await reviewServiceGetReviewsByTag(tag);

      if (data) setReviews(data);
    } catch (error: any) {
      setError(error.response.data.message);
      setReviews([] as IReview[]);
    } finally {
      setIsLoading(false);
    }
  }, [tag]);

  const likedReview = (id: string, userId: string) => {
    setReviews((prev) => {
      return handleLike(prev!, id, userId);
    });
  };

  useEffect(() => {
    if (tag) {
      getReviews();
    }
  }, [tag, getReviews]);

  return {
    reviews,
    error,
    isLoading,
    likedReview,
  };
};
