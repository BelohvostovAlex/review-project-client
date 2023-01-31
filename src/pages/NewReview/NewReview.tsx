import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { ReviewForm } from "../../components/ReviewForm";
import { AppButtonBack } from "../../components/Buttons/AppButtonBack";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useNewReviewText } from "./config/useNewReviewText";

import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./styles";

export const NewReview: FunctionComponent = () => {
  const location = useLocation();
  const isEdit = location.state;
  const { isAuth } = useAppSelector(authSelector);
  const newReviewTitle = useNewReviewText(isEdit);
  const style = makeStyles();

  if (!isAuth) return <Navigate to={AppPathes.MAIN} />;

  return (
    <Box sx={style.newReviewWrapper}>
      <AppButtonBack styles={style.newReviewBackBtn} />
      <Typography sx={style.newReviewTitle}>{newReviewTitle.title}</Typography>
      <ReviewForm isEdit={!!isEdit} review={isEdit && isEdit} />
    </Box>
  );
};
