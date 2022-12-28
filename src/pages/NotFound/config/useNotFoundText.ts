import { useTranslation } from "react-i18next";

export const useNotFoundText = () => {
  const { t } = useTranslation();
  return {
    text: t("NotFound.text"),
  };
};
