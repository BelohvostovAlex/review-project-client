import { AxiosResponse } from "axios";
import $api from "../../http";

import { CATEGORY_URLS } from "../../mock/mockUrls";
import { ICategory } from "../../models/ICategory";
import { categoryServiceCreateCategoryInput } from "./interfaces";

export const categoryServiceGetAllCategories = async (): Promise<
  AxiosResponse<ICategory[]>
> => {
  return $api.get(CATEGORY_URLS.GET_CATEGORIES);
};

export const categoryServiceCreateCategory = async (
  data: categoryServiceCreateCategoryInput
): Promise<AxiosResponse<ICategory>> => {
  const { title } = data;
  return $api.post(CATEGORY_URLS.CREATE_CATEGORY, { title });
};
