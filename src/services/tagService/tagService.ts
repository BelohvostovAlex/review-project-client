import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import { TAGS_URLS } from "../../mock/mockUrls";
import { ITag } from "../../models/ITag";
import { TagsResponse } from "../../models/response/TagsResponse";
import { tagServiceCreateTagInput } from "./interfaces";

export const tagServiceGetAllTags = async (
  page: number,
  limit: number
): Promise<AxiosResponse<TagsResponse>> => {
  return axios.get(
    process.env.REACT_APP_SERVER_URL +
      TAGS_URLS.GET_TAGS +
      `?page=${page}&limit=${limit}`
  );
};

export const tagServiceCreateTag = async (
  data: tagServiceCreateTagInput
): Promise<AxiosResponse<ITag>> => {
  const { title } = data;
  return $api.post(TAGS_URLS.CREATE_TAG, {
    title,
  });
};
