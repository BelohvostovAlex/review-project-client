import { useEffect } from "react";

import { useActions } from "./useActions";

export const useFetchReviews = () => {
  const { getReviewsThunk } = useActions();

  useEffect(() => {
    getReviewsThunk();
  }, [getReviewsThunk]);
};
