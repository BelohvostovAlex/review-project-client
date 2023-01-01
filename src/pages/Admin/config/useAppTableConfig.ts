import moment from "moment";
import { useTranslation } from "react-i18next";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const useAppTableConfig = (): { columns: GridColDef[] } => {
  const { t } = useTranslation();

  return {
    columns: [
      { field: "_id", headerName: `${t("AppTableUsers.id")}`, width: 160 },
      {
        field: "username",
        headerName: `${t("AppTableUsers.username")}`,
        width: 160,
      },
      {
        field: "email",
        headerName: `${t("AppTableUsers.email")}`,
        width: 120,
      },
      {
        field: "role",
        headerName: `${t("AppTableUsers.role")}`,
        width: 50,
      },
      {
        field: "password",
        headerName: `${t("AppTableUsers.password")}`,
        width: 110,
      },
      {
        field: "status",
        headerName: `${t("AppTableUsers.status")}`,
        width: 70,
      },
      {
        field: "enteredBySocial",
        headerName: `${t("AppTableUsers.enteredBySocial")}`,
        width: 140,
      },
      {
        field: "fromGoogle",
        headerName: `${t("AppTableUsers.fromGoogle")}`,
        width: 140,
      },
      {
        field: "fromTwitter",
        headerName: `${t("AppTableUsers.fromTwitter")}`,
        width: 140,
      },
      {
        field: "lastEnter",
        headerName: `${t("AppTableUsers.lastEnter")}`,
        width: 140,
        valueGetter: (params: GridValueGetterParams) =>
          `${moment(params.row.lastEnter).format("L") || ""}`,
      },
      {
        field: "createdReviews",
        headerName: `${t("AppTableUsers.createdReviews")}`,
        width: 160,
      },
      {
        field: "likedReviews",
        headerName: `${t("AppTableUsers.likedReviews")}`,
        width: 160,
      },
      {
        field: "ratedReviews",
        headerName: `${t("AppTableUsers.ratedReviews")}`,
        width: 160,
      },
    ],
  };
};
