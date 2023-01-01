import { useTranslation } from "react-i18next";

export const useAppMainTagSectionText = () => {
  const { t } = useTranslation();

  return {
    button: t("Reviews.button"),
    appBannerTitle: t("AppMainTagSection.bannerTitle"),
    appBannerText: t("AppMainTagSection.bannerText"),
  };
};
