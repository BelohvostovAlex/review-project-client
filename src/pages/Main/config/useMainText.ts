import { useTranslation } from "react-i18next";

export const useMainText = () => {
  const { t } = useTranslation();

  return {
    recentTitle: t("Reviews.reviewSectionTitle.recent"),
    ratedTitle: t("Reviews.reviewSectionTitle.rated"),
    tagsTitle: t("Reviews.reviewSectionTitle.tagsCloud"),
  };
};
