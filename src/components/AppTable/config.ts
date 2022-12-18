import moment from "moment";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { ITag } from "../../models/ITag";

export const columns: GridColDef[] = [
  { field: "_id", headerName: "ID", width: 160 },
  { field: "grade", headerName: "Grade", width: 50 },
  {
    field: "artItem",
    headerName: "Art Item",
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.artItem.title || ""}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 50,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.artItem.averageRating || 0}`,
  },
  {
    field: "text",
    headerName: "Text",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 90,
  },
  {
    field: "likes",
    headerName: "Likes",
    width: 40,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.likes.length || 0}`,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 90,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.createdAt).format("L") || ""}`,
  },
  {
    field: "updatedAt",
    headerName: "UpdatedAt",
    width: 90,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.updatedAt).format("L") || ""}`,
  },
  {
    field: "image",
    headerName: "Image",
    width: 50,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.image ? "yes" : "no"}`,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.tags.map((item: ITag) => item.title).join(", ") || ""}`,
  },
];
