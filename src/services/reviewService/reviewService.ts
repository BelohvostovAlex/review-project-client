import { AxiosResponse } from "axios";
import $api from "../../http";

import { REVIEWS_URLS } from "../../mock/mockUrls";
import { IReview } from "../../models/IReview";
import { reviewServiceCreateReviewInput } from "./interfaces";

export const reviewServiceGetReviews = async (): Promise<
  AxiosResponse<IReview[]>
> => {
  return $api.get(REVIEWS_URLS.GET_REVIEWS);
};

export const reviewServiceGetReview = async (
  id: string
): Promise<AxiosResponse<IReview>> => {
  return $api.get(REVIEWS_URLS.GET_REVIEWS + `/${id}`);
};

export const reviewServiceCreateReview = async (
  data: reviewServiceCreateReviewInput
): Promise<AxiosResponse<IReview>> => {
  const { title, artItem, category, creator, grade, tags, text, image } = data;
  return $api.post(REVIEWS_URLS.CREATE_REVIEW, {
    title,
    artItem,
    category,
    creator,
    grade,
    tags,
    text,
    image,
  });
};

export const reviewServiceLikeReview = async (
  reviewId: string,
  id: string
): Promise<AxiosResponse<IReview[]>> => {
  return $api.patch(REVIEWS_URLS.LIKE_REVIEW + reviewId, { likeId: id });
};
