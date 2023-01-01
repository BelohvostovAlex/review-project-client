import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { AppMainSection } from "../../components/AppMainSection/AppMainSection";
import { AppMainTagSection } from "../../components/AppMainTagSection/AppMainTagSection";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";
import { useMainText } from "./config/useMainText";

import { makeStyles } from "./styles";

export const Main: React.FC = () => {
  const { viaSocial, isAuth } = useAppSelector((state) => state.auth);
  const { authSignInWithSocialMedia, handleLoading } = useActions();
  const mainText = useMainText();
  const style = makeStyles();

  useEffect(() => {
    if (viaSocial && !isAuth) {
      authSignInWithSocialMedia();
    }
    handleLoading();
  }, []);

  return (
    <Box sx={style.mainWrapper}>
      <AppMainSection title={mainText.recentTitle} sort="updatedAt" />
      <AppMainSection title={mainText.ratedTitle} sort="grade" />
      <AppMainTagSection title={mainText.tagsTitle} />
    </Box>
  );
};
