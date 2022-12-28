import moment from "moment";

import { useTranslation } from "react-i18next";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { ITag } from "../../../models/ITag";

export const useAppTableConfig = (): { columns: GridColDef[] } => {
  const { t } = useTranslation();

  return {
    columns: [
      { field: "_id", headerName: `${t("AppTable.id")}`, width: 160 },
      { field: "grade", headerName: `${t("AppTable.grade")}`, width: 50 },
      {
        field: "artItem",
        headerName: `${t("AppTable.artItem")}`,
        width: 120,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.artItem.title || ""}`,
      },
      {
        field: "rating",
        headerName: `${t("AppTable.rating")}`,
        width: 50,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.artItem.averageRating || 0}`,
      },
      {
        field: "text",
        headerName: `${t("AppTable.text")}`,
        width: 150,
      },
      {
        field: "category",
        headerName: `${t("AppTable.category")}`,
        width: 90,
      },
      {
        field: "likes",
        headerName: `${t("AppTable.category")}`,
        width: 40,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.likes.length || 0}`,
      },
      {
        field: "createdAt",
        headerName: `${t("AppTable.createdAt")}`,
        width: 90,
        valueGetter: (params: GridValueGetterParams) =>
          `${moment(params.row.createdAt).format("L") || ""}`,
      },
      {
        field: "updatedAt",
        headerName: `${t("AppTable.updatedAt")}`,
        width: 90,
        valueGetter: (params: GridValueGetterParams) =>
          `${moment(params.row.updatedAt).format("L") || ""}`,
      },
      {
        field: "image",
        headerName: `${t("AppTable.image")}`,
        width: 50,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.image ? "yes" : "no"}`,
      },
      {
        field: "tags",
        headerName: `${t("AppTable.tags")}`,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.tags.map((item: ITag) => item.title).join(", ") || ""}`,
      },
    ],
  };
};
