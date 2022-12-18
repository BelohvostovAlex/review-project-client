import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppTag } from "../AppTag/AppTag";
import { AppRating } from "../AppRating/AppRating";

import { useAppSelector } from "../../hooks/useAppSelector";
import { handleReviewCardText } from "../../helpers/handleReviewCardText";
import { useActions } from "../../hooks/useActions";
import { reviewServiceLikeReview } from "../../services/reviewService/reviewService";
import { tokens } from "../../theme/theme";
import { useGetUser } from "../../hooks/useGetUser";

import { handleLikeIcon, handleStarIcon } from "./config";
import { AppRatingSize } from "../AppRating/interface";
import { AppReviewProps } from "./interface";
import EditIcon from "@mui/icons-material/Edit";
import imagePlaceHolder from "../../assets/images/image-placeholder.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "./styles";
import { AppPathes } from "../AppRouter/interfaces";

export const AppReview: React.FC<AppReviewProps> = ({
  review,
  isFull,
  isRelated,
  rating,
  handleRating,
  likeRelatedReview,
  likedReview,
  handleFullReviewLikes,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({
    isFull,
    cardTitleColor:
      theme.palette.mode === "dark"
        ? colors.lightGreen[500]
        : colors.primary[500],
  });

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
    grade,
  } = review;

  const { like } = useActions();
  const [reviewCreator, reviewCreatorLikes] = useGetUser(creator);
  const StarIcon = handleStarIcon(artItem.averageRating || "0");
  const LikeIcon = handleLikeIcon(likes, user.id);
  const croppedTitle = isFull ? title : handleReviewCardText(title, 45);
  const croppedText = isFull ? text : handleReviewCardText(text, 135);

  const handleLikeReview = async () => {
    like(_id);
    if (!isFull && !isRelated) {
      likedReview!(_id, user.id);
    }
    if (isRelated) {
      likeRelatedReview!(_id, user.id);
    }
    if (isFull) {
      handleFullReviewLikes!();
    }
    await reviewServiceLikeReview(_id, user.id);
  };

  return (
    <Card sx={style.cardWrapper}>
      <CardHeader
        action={
          creator === user.id && (
            <AppButtonLink
              text={<EditIcon />}
              path={AppPathes.NEW_REVIEW}
              state={review}
            />
          )
        }
        title={artItem?.title}
        subheader={moment(createdAt).format("L")}
      />
      <CardMedia
        component="img"
        sx={style.cardImg}
        image={image ? image : imagePlaceHolder}
        alt={artItem?.title}
      />
      <Box sx={style.cardContent}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={style.cardTitleWrapper}
          >
            <Typography variant="h5" sx={style.cardTitle}>
              {croppedTitle}
              <Box component="span" sx={style.cardTitleRating}>
                {artItem?.averageRating} <StarIcon />
              </Box>
            </Typography>
          </Typography>
          <Typography sx={style.cardReviewCreatorWrapper}>
            Author: {reviewCreator.username} {reviewCreatorLikes}
            <FavoriteIcon sx={style.cardReviewCreatorIcon} />
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={style.cardCategory}
          >
            {category}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={style.cardText}
          >
            {croppedText}
          </Typography>
          <Box sx={style.cardGrade}>Author's grade: {grade}</Box>
          {isFull && (
            <Box sx={style.cardTagsWrapper}>
              {tags.map((tag) => (
                <AppTag key={tag._id} title={tag.title} isTagTitle={false} />
              ))}
            </Box>
          )}
        </CardContent>
        <CardActions sx={style.cardActionsWrapper}>
          {isFull ? (
            <AppRating
              rating={rating!}
              onChange={handleRating!}
              max={5}
              size={AppRatingSize.LARGE}
            />
          ) : (
            <AppButtonLink text="More" path={"/reviews/" + _id} />
          )}
          <IconButton aria-label="add to favorites" onClick={handleLikeReview}>
            <LikeIcon />
            {likes.length > 0 && likes.length}
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};
