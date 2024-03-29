import { useState, FunctionComponent, DragEvent } from "react";

import { Box, Typography, useTheme } from "@mui/material";

import { uploadFileService } from "../../services/uploadFileService/uploadFileService";
import { useAppUploadImgText } from "./config/useAppUploadImgText";
import { tokens } from "../../theme/theme";

import { AppUploadImgProps } from "./interface";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { makeStyles } from "./styles";

export const AppUploadImg: FunctionComponent<AppUploadImgProps> = ({
  handleImage,
}) => {
  const [drag, setDrag] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({
    drag: drag,
    uploadWrapperBorder:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

  const { title } = useAppUploadImgText(drag);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
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
