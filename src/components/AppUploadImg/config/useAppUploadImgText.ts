import { useTranslation } from "react-i18next";

export const useAppUploadImgText = (drag: boolean) => {
  const { t } = useTranslation();

  return {
    title: drag ? t("NewReview.uploadImg.drop") : t("NewReview.uploadImg.drag"),
  };
};
