import React, { useState } from "react";

import { Box, Typography } from "@mui/material";

import { uploadFileService } from "../../services/uploadFileService/uploadFileService";

import { AppUploadImgProps } from "./interface";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "./styles";

export const AppUploadImg: React.FC<AppUploadImgProps> = ({ handleImage }) => {
  const [drag, setDrag] = useState(false);
  const style = makeStyles({ drag: drag });

  const title = drag ? "Please Drop here" : "Upload an image";

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    const uploadedFile = await uploadFileService(file);
    handleImage(uploadedFile.secure_url);

    setDrag(false);
  };

  return (
    <Box
      sx={style.uploadWrapper}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartHandler}
      onDrop={dropHandler}
    >
      <input hidden accept="image/*" type="file" />
      <Typography sx={style.uploadTitle}>{title}</Typography>
      <AddPhotoAlternateIcon />
    </Box>
  );
};
