import { useState, useEffect } from "react";

import { reviewServiceGetCreatorReviews } from "../services/reviewService/reviewService";

import { IReview } from "../models/IReview";

export const useFetchCreatorReviews = (id: string) => {
  const [reviews, setReviews] = useState([] as IReview[]);
  const [isLoading, setIsLoading] = useState(true);

  const getReviews = async (id: string) => {
    try {
      const { data } = await reviewServiceGetCreatorReviews(id);

      setReviews(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setReviews([] as IReview[]);
    }
  };

  const handleReviews = (newReviews: IReview[]) => {
    setReviews(newReviews);
  };

  useEffect(() => {
    getReviews(id);
  }, [id]);

  return { reviews, isLoading, handleReviews };
};
