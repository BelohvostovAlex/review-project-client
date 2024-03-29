import { useCallback, useEffect, useState } from "react";

import { reviewServiceGetReviews } from "../services/reviewService/reviewService";
import { handleLike } from "../helpers/handleLike";

import { IReview } from "../models/IReview";

interface useFetchReviewsOutput {
  reviews: IReview[];
  limit: number;
  page: number;
  total: number;
  error: string;
  isLoading: boolean;
  likedReview: (id: string, userId: string) => void;
  handlePage: (e: React.ChangeEvent<unknown>, value: number) => void;
}

interface UseFetchReviewsProps {
  sort?: string;
  category?: string;
  search?: string;
}

export const useFetchReviews = ({
  category,
  sort,
  search,
}: UseFetchReviewsProps): useFetchReviewsOutput => {
  const [reviews, setReviews] = useState([] as IReview[]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(8);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getReviews = useCallback(async () => {
    try {
      const { data } = await reviewServiceGetReviews({
        limit,
        page,
        search,
        sort,
        category,
      });

      if (data) setIsLoading(false);

      setReviews(data.reviews);
      setLimit(data.limit);
      setPage(data.page);
      setTotal(data.total);
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      setReviews([] as IReview[]);
      setLimit(10);
      setPage(1);
      setTotal(0);
    }
  }, [page, limit, category, search, sort]);

  const likedReview = (id: string, userId: string) => {
    setReviews((prev) => {
      return handleLike(prev, id, userId);
    });
  };

  const handlePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getReviews();
  }, [page, getReviews]);

  return {
    limit,
    reviews,
    page,
    total,
    error,
    isLoading,
    likedReview,
    handlePage,
  };
};
