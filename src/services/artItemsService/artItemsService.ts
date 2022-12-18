import { AxiosResponse } from "axios";
import $api from "../../http";

import { ART_ITEMS_URLS } from "../../mock/mockUrls";
import { IArtItem } from "../../models/IArtItem";
import {
  artItemsServiceCreateTagInput,
  artItemsServiceRateItemInput,
} from "./interfaces";

export const artItemsServiceGetAllItems = async (): Promise<
  AxiosResponse<IArtItem[]>
> => {
  return $api.get(ART_ITEMS_URLS.GET_ITEMS);
};

export const artItemsServiceCreateItem = async (
  data: artItemsServiceCreateTagInput
): Promise<AxiosResponse<IArtItem>> => {
  const { title } = data;
  return $api.post(ART_ITEMS_URLS.CREATE_ITEM, { title });
};

export const artItemsServiceRateItem = async (
  data: artItemsServiceRateItemInput
): Promise<AxiosResponse<IArtItem>> => {
  const { id, userId, rate } = data;
  return $api.patch(ART_ITEMS_URLS.RATE_ITEM, { id, userId, rate });
};
