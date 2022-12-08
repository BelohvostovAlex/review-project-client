import React from "react";
import moment from "moment";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { AppButtonLink } from "../Buttons/AppButtonLink";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetArtItemInfo } from "../../hooks/useGetArtItemInfo";
import { handleReviewCardText } from "../../helpers/handleReviewCardText";
import { useActions } from "../../hooks/useActions";
import { reviewServiceLikeReview } from "../../services/reviewService/reviewService";

import { handleLikeIcon, handleStarIcon } from "./config";
import { AppReviewCardProps } from "./interface";
import { makeStyles } from "./styles";

import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import imagePlaceHolder from "../../assets/images/image-placeholder.jpg";

export const AppReviewCard: React.FC<AppReviewCardProps> = ({ review }) => {
  const { user } = useAppSelector((state) => state.auth);
  const style = makeStyles();
  const {
    _id,
    artItem,
    category,
    createdAt,
    creator,
    image,
    likes,
    tags,
    text,
    title,
    updatedAt,
  } = review;
  const { like, likedReview } = useActions();
  const { artItemInfo, reviewCreator, isLiked } = useGetArtItemInfo({
    creator,
    artItem,
    reviewId: _id,
  });
  const StarIcon = handleStarIcon(artItemInfo.averageRating || "0");
  const LikeIcon = handleLikeIcon(isLiked);
  const croppedText = handleReviewCardText(text);

  const handleLikeReview = async () => {
    like(_id);
    likedReview({ id: _id, userId: user.id });
    await reviewServiceLikeReview(_id, user.id);
  };
  // console.log("artItemInfo", artItemInfo);
  // console.log("reviewCreator", reviewCreator);

  return (
    <Card sx={style.cardWrapper}>
      <CardHeader
        action={
          creator === user.id && (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={title}
        subheader={moment(createdAt).format("L")}
      />
      <CardMedia
        component="img"
        height="160"
        image={image ? image : imagePlaceHolder}
        alt={artItemInfo?.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={style.cardTitleWrapper}
        >
          <Typography variant="h4" sx={style.cardTitle}>
            {artItemInfo?.title}
            <Box component="span" sx={style.cardTitleRating}>
              {artItemInfo?.averageRating} <StarIcon />
            </Box>
          </Typography>
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {croppedText}
        </Typography>
      </CardContent>
      <CardActions>
        <AppButtonLink text="More" path={"/reviews/" + _id} />
        <IconButton aria-label="add to favorites" onClick={handleLikeReview}>
          <LikeIcon />
          {likes.length > 0 && likes.length}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
