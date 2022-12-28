import { useTranslation } from "react-i18next";

export const useRatingSubTitle = (count: number = 0) => {
  const { t } = useTranslation();
  return count && count > 1
    ? t("Rating.plural")
    : count === 1
    ? t("Rating.single")
    : t("Rating.rate-now");
};
