import { useTranslation } from "react-i18next";

export const useAuthFormText = (signUp: boolean) => {
  const { t } = useTranslation();

  return {
    title: signUp ? t("AuthForm.title.signup") : t("AuthForm.title.signin"),
    username: {
      label: t("AuthForm.usernameField.label"),
      placeholder: t("AuthForm.usernameField.placeholder"),
      required: t("AuthForm.usernameField.required"),
    },
    email: {
      label: t("AuthForm.emailField.label"),
      placeholder: t("AuthForm.emailField.placeholder"),
      required: t("AuthForm.emailField.required"),
    },
    password: {
      label: t("AuthForm.passwordField.label"),
      required: t("AuthForm.passwordField.required"),
      minLength: t("AuthForm.passwordField.minLength"),
      maxLength: t("AuthForm.passwordField.maxLength"),
    },
    submitBtn: signUp ? t("AuthForm.title.signup") : t("AuthForm.title.signin"),
    googleBtn: t("AuthForm.signInWithGoogle"),
    twitterBtn: t("AuthForm.signInWithTwitter"),
    needAcc: t("AuthForm.needAcc"),
    alreadyAcc: t("AuthForm.alreadyHaveAcc"),
    signUp: t("AuthForm.title.signup"),
    singIn: t("AuthForm.title.signin"),
  };
};
