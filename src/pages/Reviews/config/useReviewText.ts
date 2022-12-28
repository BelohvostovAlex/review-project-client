import { useTranslation } from "react-i18next";

export const useReviewText = () => {
  const { t } = useTranslation();

  return {
    title: t("Reviews.reviewsPageTitle"),
  };
};
