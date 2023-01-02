import { ITag } from "../ITag";

export interface TagsResponse {
  tags: ITag[];
  limit: number;
  page: number;
  total: number;
}
