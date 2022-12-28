import axios, { AxiosResponse } from "axios";
import $api from "../../http";

import { TAGS_URLS } from "../../mock/mockUrls";
import { ITag } from "../../models/ITag";
import { tagServiceCreateTagInput } from "./interfaces";

export const tagServiceGetAllTags = async (): Promise<
  AxiosResponse<ITag[]>
> => {
  return axios.get(process.env.REACT_APP_SERVER_URL + TAGS_URLS.GET_TAGS);
};

export const tagServiceCreateTag = async (
  data: tagServiceCreateTagInput
): Promise<AxiosResponse<ITag>> => {
  const { title } = data;
  return $api.post(TAGS_URLS.CREATE_TAG, {
    title,
  });
};
