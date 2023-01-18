import { FunctionComponent, useEffect } from "react";

import { Box } from "@mui/material";
import { AppMainSection } from "../../components/AppMainSection/AppMainSection";
import { AppMainTagSection } from "../../components/AppMainTagSection/AppMainTagSection";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useActions } from "../../hooks/useActions";
import { useMainText } from "./config/useMainText";

import { makeStyles } from "./styles";

export const Main: FunctionComponent = () => {
  const { viaSocial, isAuth } = useAppSelector(authSelector);
  const { authSignInWithSocialMedia } = useActions();
  const mainText = useMainText();
  const style = makeStyles();

  useEffect(() => {
    if (viaSocial && !isAuth) {
      authSignInWithSocialMedia();
    }
  }, []);

  return (
    <Box sx={style.mainWrapper}>
      <AppMainSection title={mainText.recentTitle} sort="updatedAt" />
      <AppMainSection title={mainText.ratedTitle} sort="grade" />
      <AppMainTagSection title={mainText.tagsTitle} />
    </Box>
  );
};
