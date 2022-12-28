import { useTranslation } from "react-i18next";

export const useTextHeader = () => {
  const { t } = useTranslation();

  return {
    signIn: t("AuthButtons.signIn"),
    signUp: t("AuthButtons.signUp"),
    signOut: t("AuthButtons.signOut"),
    profileTitle: t("ProfileMenu.0"),
  };
};
