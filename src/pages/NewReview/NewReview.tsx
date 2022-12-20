import React from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { ReviewForm } from "../../components/ReviewForm/ReviewForm";
import { AppButtonBack } from "../../components/Buttons/AppButtonBack/AppButtonBack";

import { useAppSelector } from "../../hooks/useAppSelector";

import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./styles";

export const NewReview: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const style = makeStyles();

  const isEdit = location.state;

  if (!isAuth) return <Navigate to={AppPathes.MAIN} />;

  return (
    <Box sx={style.newReviewWrapper}>
      <AppButtonBack styles={style.newReviewBackBtn} />
      <Typography sx={style.newReviewTitle}>
        {isEdit ? "Edit" : "Create"} a review
      </Typography>
      <ReviewForm isEdit={!!isEdit} review={isEdit && isEdit} />
    </Box>
  );
};
