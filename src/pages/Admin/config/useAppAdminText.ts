import { useTranslation } from "react-i18next";

export const useAppAdminText = () => {
  const { t } = useTranslation();

  return {
    title: t("Admin.title"),
    categoryTitle: t("Admin.categoryTitle"),
    createCategoryBtn: t("Admin.createCategoryBtn"),
  };
};
