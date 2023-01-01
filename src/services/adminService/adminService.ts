import $api from "../../http";
import { AxiosResponse } from "axios";

import { ADMIN_URLS } from "../../mock/mockUrls";
import { IUserFull } from "../../models/IUser";
import { ICategory } from "../../models/ICategory";
import { GridRowId } from "@mui/x-data-grid";

export const adminServiceGetUsers = async (): Promise<
  AxiosResponse<IUserFull[]>
> => {
  return $api.get(ADMIN_URLS.GET_USERS);
};

export const adminServiceDeleteUser = async (id: GridRowId) => {
  return $api.delete(ADMIN_URLS.DELETE_USER + id);
};

export const adminServiceHanldeUserStatus = async (
  id: GridRowId,
  status: string
) => {
  return $api.patch(ADMIN_URLS.CHANGE_STATUS + id, { status });
};

export const adminServiceHanldeUserRole = async (
  id: GridRowId,
  role: number
) => {
  return $api.patch(ADMIN_URLS.CHANGE_ROLE + id, { role });
};

export const adminServiceCreateCategory = async (
  title: string
): Promise<AxiosResponse<ICategory>> => {
  return $api.post(ADMIN_URLS.CREATE_CATEGORY, { title });
};

export const adminServiceDeleteCategory = async (id: string) => {
  return $api.delete(ADMIN_URLS.DELETE_CATEGORY + id);
};
