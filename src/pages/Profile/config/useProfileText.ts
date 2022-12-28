import { useTranslation } from "react-i18next";

export const useProfileText = () => {
  const { t } = useTranslation();

  return {
    greeting: t("Profile.greeting"),
    myReviews: t("Profile.myReviews"),
    noReviewsTitle: t("Profile.noReviewsTitle"),
    noReviewsSubtitle: t("Profile.noReviewsSubtitle"),
  };
};
