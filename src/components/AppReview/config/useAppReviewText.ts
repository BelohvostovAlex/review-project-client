import { useTranslation } from "react-i18next";

export const useAppReviewText = () => {
  const { t } = useTranslation();

  return {
    reviewAuthor: t("ReviewCard.author"),
    authorGrade: t("ReviewCard.authorGrade"),
    buttonMore: t("ReviewCard.buttonMore"),
  };
};
