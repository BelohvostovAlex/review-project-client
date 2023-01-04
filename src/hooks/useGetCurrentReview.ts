import { useState, useEffect, useCallback } from "react";

import { reviewServiceGetReview } from "../services/reviewService/reviewService";

import { IComment } from "../models/IComment";
import { IReview } from "../models/IReview";

interface useGetCurrentReviewOutput {
  currentReview: IReview;
  isLoading: boolean;
  handleFullReviewLikes: () => void;
  handleReviewComments: (comment: IComment) => void;
}

export const useGetCurrentReview = (
  id: string,
  userId: string,
  isAdmin: boolean
): useGetCurrentReviewOutput => {
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<IReview>({} as IReview);

  const getReview = useCallback(async () => {
    const { data } = await reviewServiceGetReview(id);
    setReview(data);
    setIsLoading(false);
  }, [id]);

  const handleFullReviewLikes = () => {
    setReview((prev) =>
      prev.likes.includes(isAdmin ? review.creator : userId)
        ? {
            ...prev,
            likes: prev.likes.filter(
              (item) => item !== (isAdmin ? review.creator : userId)
            ),
          }
        : { ...prev, likes: [...prev.likes, isAdmin ? review.creator : userId] }
    );
  };

  const handleReviewComments = (comment: IComment) => {
    if (review.comments) {
      setReview((prev) => {
        return { ...prev, comments: prev.comments.concat(comment) };
      });
    }
  };

  useEffect(() => {
    getReview();
  }, [getReview]);

  return {
    currentReview: review,
    isLoading,
    handleFullReviewLikes,
    handleReviewComments,
  };
};
