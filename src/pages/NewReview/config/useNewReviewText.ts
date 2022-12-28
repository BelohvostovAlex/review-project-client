import { useTranslation } from "react-i18next";

export const useNewReviewText = (isEdit: boolean) => {
  const { t } = useTranslation();
  return {
    title: isEdit
      ? t("NewReview.formButton.edit") + " " + t("NewReview.review")
      : t("NewReview.formButton.create") + " " + t("NewReview.review"),
  };
};
