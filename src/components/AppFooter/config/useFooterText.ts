import { useTranslation } from "react-i18next";

export const useFooterText = () => {
  const { t } = useTranslation();

  return {
    footerTitle: t("Footer.title"),
  };
};
