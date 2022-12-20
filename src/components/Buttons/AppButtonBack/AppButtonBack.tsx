import React from "react";
import { useNavigate } from "react-router-dom";

import { AppButton } from "../AppButton";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { AppButtonBackProps } from "./interface";
import { makeStyles } from "../styles";

export const AppButtonBack: React.FC<AppButtonBackProps> = ({ styles }) => {
  const navigate = useNavigate();
  const style = makeStyles({ styles });

  const goBack = () => {
    navigate(-1);
  };
  return (
    <AppButton
      onClick={goBack}
      text={<ArrowBackIosIcon />}
      styles={style.appButton}
    />
  );
};
