import { AxiosResponse } from "axios";
import $api from "../../http";

import { CATEGORY_URLS } from "../../mock/mockUrls";
import { ICategory } from "../../models/ICategory";

export const categoryServiceGetAllCategories = async (): Promise<
  AxiosResponse<ICategory[]>
> => {
  return $api.get(CATEGORY_URLS.GET_CATEGORIES);
};
