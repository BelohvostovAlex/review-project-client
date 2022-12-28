import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import { GridRowId } from "@mui/x-data-grid";
import { REVIEWS_URLS } from "../../mock/mockUrls";
import { IReview } from "../../models/IReview";
import { ReviewsResponse } from "../../models/response/ReviewsResponse";
import {
  reviewServiceCreateCommentInput,
  reviewServiceCreateReviewInput,
  reviewServiceGetReviewsByTagInput,
  reviewServiceGetReviewsInput,
} from "./interfaces";
import { IComment } from "../../models/IComment";

export const reviewServiceGetReviews = async (
  data: reviewServiceGetReviewsInput
): Promise<AxiosResponse<ReviewsResponse>> => {
  const { page = 1, limit = 10, search = "", sort = "", category = "" } = data;
  return axios.get(
    process.env.REACT_APP_SERVER_URL +
      REVIEWS_URLS.GET_REVIEWS +
      `?page=${page}&limit=${limit}&search=${search}&sort=${sort}&category=${category}`
  );
};

export const reviewServiceGetReviewsByTag = async (
  data: reviewServiceGetReviewsByTagInput
): Promise<AxiosResponse<ReviewsResponse>> => {
  const { page = 1, limit = 10, tag = "" } = data;
  return $api.get(
    REVIEWS_URLS.GET_REVIEWS_BY_TAG + `?page=${page}&limit=${limit}&tag=${tag}`
  );
};

export const reviewServiceGetReview = async (
  id: string
): Promise<AxiosResponse<IReview>> => {
  return axios.get(
    process.env.REACT_APP_SERVER_URL + REVIEWS_URLS.GET_REVIEWS + `/${id}`
  );
};

export const reviewServiceGetCreatorLikes = async (
  id: string
): Promise<AxiosResponse<number>> => {
  return $api.get(REVIEWS_URLS.GET_CREATOR_LIKES + `/${id}`);
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

export const reviewServiceGetRelatedReviews = async (
  id: string
): Promise<AxiosResponse<IReview[]>> => {
  return axios.get(
    process.env.REACT_APP_SERVER_URL +
      REVIEWS_URLS.GET_RELATED_REVIEWS +
      `/${id}`
  );
};

export const reviewServiceGetCreatorReviews = async (
  id: string
): Promise<AxiosResponse<IReview[]>> => {
  return $api.get(REVIEWS_URLS.GET_CREATOR_REVIEWS + `/${id}`);
};

export const reviewServiceDeleteReview = async (
  id: GridRowId
): Promise<AxiosResponse<IReview[]>> => {
  return $api.delete(REVIEWS_URLS.GET_REVIEWS + `/${id}`);
};

export const reviewServiceUpdateReview = async (
  id: string,
  data: reviewServiceCreateReviewInput
): Promise<AxiosResponse<IReview[]>> => {
  const { title, artItem, category, creator, grade, tags, text, image } = data;
  return $api.patch(REVIEWS_URLS.GET_REVIEWS + `/${id}`, {
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

export const reviewServiceCreateComment = async (
  data: reviewServiceCreateCommentInput
): Promise<AxiosResponse<IComment>> => {
  const { id, userId, text } = data;
  return $api.post(REVIEWS_URLS.CREATE_REVIEW_COMMENT, {
    id,
    userId,
    text,
  });
};
