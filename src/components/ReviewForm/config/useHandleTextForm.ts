import { useTranslation } from "react-i18next";

export const useHandleTextForm = (isEdit: boolean) => {
  const { t } = useTranslation();

  return {
    title: {
      placeholder: t("ReviewForm.titleField.placeholder"),
      label: t("ReviewForm.titleField.label"),
      required: `${t("ReviewForm.titleField.required")}`,
    },
    category: {
      label: t("ReviewForm.categoryField.label"),
      required: `${t("ReviewForm.categoryField.required")}`,
    },
    artItem: {
      textFieldTitle: t("ReviewForm.artItemField.textFieldTitle"),
      dialogueText: t("ReviewForm.artItemField.dialogueText"),
      dialogueTitle: t("ReviewForm.artItemField.dialogueTitle"),
    },
    text: {
      placeholder: t("ReviewForm.textField.placeholder"),
      label: t("ReviewForm.textField.label"),
      required: `${t("ReviewForm.textField.required")}`,
    },
    grade: {
      title: t("ReviewForm.grade.title"),
      buttonText: t("ReviewForm.grade.buttonText"),
    },
    tags: {
      textFieldTitle: t("ReviewForm.tagsField.textFieldTitle"),
      dialogueText: t("ReviewForm.tagsField.dialogueText"),
      dialogueTitle: t("ReviewForm.tagsField.dialogueTitle"),
    },
    submitBtn: isEdit
      ? t("ReviewForm.submitBtn.edit")
      : t("ReviewForm.submitBtn.create"),
    alertText: isEdit
      ? t("ReviewForm.alert.edit")
      : t("ReviewForm.alert.create"),
  };
};
