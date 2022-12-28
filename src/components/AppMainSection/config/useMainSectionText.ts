import { useTranslation } from "react-i18next";

export const useMainSectionText = () => {
  const { t } = useTranslation();

  return {
    button: t("Reviews.button"),
    appBannerTitle: t("Reviews.title.0"),
    appBannerText: t("Reviews.title.1"),
  };
};
