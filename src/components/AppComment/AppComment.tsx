import React from "react";
import moment from "moment";

import { Card, Box, Typography, Avatar } from "@mui/material";

import { AppCommentProps } from "./interface";
import { makeStyles } from "./styles";

export const AppComment: React.FC<AppCommentProps> = ({ comment }) => {
  const style = makeStyles();
  return (
    <Card sx={style.commentWrapper}>
      <Box sx={style.commentProfileWrapper}>
        <Avatar>{comment?.sender?.username[0]}</Avatar>
        <Box sx={style.commentAuthorWrapper}>
          <Typography>{comment?.sender?.username}</Typography>
          <Box>{moment(comment?.time).startOf("second").fromNow()}</Box>
        </Box>
      </Box>
      <Typography>{comment?.text}</Typography>
    </Card>
  );
};
