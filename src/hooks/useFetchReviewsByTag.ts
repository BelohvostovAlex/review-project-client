import { useEffect, useState } from "react";

import { reviewServiceGetReviewsByTag } from "../services/reviewService/reviewService";
import { IReview } from "../models/IReview";
import { handleLike } from "../helpers/handleLike";

interface useFetchReviewsByTagOutput {
  reviews: IReview[];
  limit: number;
  page: number;
  total: number;
  error: string;
  isLoading: boolean;
  likedReview: (id: string, userId: string) => void;
  handlePage: (e: React.ChangeEvent<unknown>, value: number) => void;
}

interface UseFetchReviewsByTagProps {
  tag: string;
}

export const useFetchReviewsByTag = ({
  tag,
}: UseFetchReviewsByTagProps): useFetchReviewsByTagOutput => {
  const [reviews, setReviews] = useState([] as IReview[]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(8);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const getReviews = async () => {
    try {
      const { data } = await reviewServiceGetReviewsByTag({ tag, page, limit });

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
  };

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
  }, [page]);

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