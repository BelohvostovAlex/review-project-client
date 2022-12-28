import { useTranslation } from "react-i18next";

export const chooseRegisterTextField = (item: string) => {
  return item === "artItem" ? "artItem" : "tags";
};
export const useCreatableAutoCompleteText = (item: string) => {
  const { t } = useTranslation();
  return item === "artItem"
    ? {
        placeholder: t("ReviewForm.artItemField.placeholder"),
        required: t("ReviewForm.artItemField.required"),
        add: t("Dialogue.buttons.add"),
      }
    : {
        placeholder: t("ReviewForm.tagsField.placeholder"),
        required: t("ReviewForm.tagsField.required"),
        add: t("Dialogue.buttons.add"),
      };
};
