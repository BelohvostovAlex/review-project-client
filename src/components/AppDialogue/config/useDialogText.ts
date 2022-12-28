import { useTranslation } from "react-i18next";

export const useDialogText = () => {
  const { t } = useTranslation();

  return {
    title: t("Dialogue.title"),
    buttons: {
      add: t("Dialogue.buttons.add"),
      cancel: t("Dialogue.buttons.cancel"),
    },
  };
};
