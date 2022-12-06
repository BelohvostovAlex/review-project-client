import { AxiosResponse } from "axios";
import $api from "../../http";

import { ART_ITEMS_URLS } from "../../mock/mockUrls";
import { IArtItem } from "../../models/IArtItem";
import { artItemsServiceCreateTagInput } from "./interfaces";

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
