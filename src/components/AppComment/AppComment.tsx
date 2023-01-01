import React, { useEffect, useState } from "react";
import moment from "moment";

import { Card, Box, Typography, Avatar } from "@mui/material";

import { reviewServiceGetCreatorLikes } from "../../services/reviewService/reviewService";

import { AppCommentProps } from "./interface";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "./styles";

export const AppComment: React.FC<AppCommentProps> = ({ comment }) => {
  const [likes, setLikes] = useState(0);
  const style = makeStyles();

  const getUserLikes = async () => {
    const { data } = await reviewServiceGetCreatorLikes(comment.sender._id);
    setLikes(data);
  };

  useEffect(() => {
    getUserLikes();
  }, [comment]);

  return (
    <Card sx={style.commentWrapper}>
      <Box sx={style.commentProfileWrapper}>
        <Avatar>{comment?.sender?.username[0]}</Avatar>
        <Box sx={style.commentAuthorWrapper}>
          <Typography sx={style.commentAuthorInfo}>
            {comment?.sender?.username} {likes}
            <FavoriteIcon sx={style.commentAuthorLike} />
          </Typography>
          <Box>{moment(comment?.time).startOf("second").fromNow()}</Box>
        </Box>
      </Box>
      <Typography>{comment?.text}</Typography>
    </Card>
  );
};
