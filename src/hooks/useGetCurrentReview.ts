import { useState, useEffect, useCallback } from "react";

import { IReview } from "../models/IReview";
import { reviewServiceGetReview } from "../services/reviewService/reviewService";

export const useGetCurrentReview = (
  id: string,
  userId: string
): [IReview, boolean, () => void] => {
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState({} as IReview);

  const getReview = useCallback(async () => {
    const { data } = await reviewServiceGetReview(id);
    setReview(data);
    setIsLoading(false);
  }, [id]);

  const handleFullReviewLikes = () => {
    setReview((prev) =>
      prev.likes.includes(userId)
        ? { ...prev, likes: prev.likes.filter((item) => item !== userId) }
        : { ...prev, likes: [...prev.likes, userId] }
    );
  };

  useEffect(() => {
    getReview();
  }, [getReview]);

  return [review, isLoading, handleFullReviewLikes];
};
