import { useState, useEffect } from "react";

import { IReview } from "../models/IReview";
import { reviewServiceGetReview } from "../services/reviewService/reviewService";

export const useGetCurrentReview = (id: string): IReview => {
  const [review, setReview] = useState({} as IReview);

  const getReview = async () => {
    const { data } = await reviewServiceGetReview(id);
    setReview(data);
  };

  useEffect(() => {
    getReview();
  }, []);

  return review;
};
