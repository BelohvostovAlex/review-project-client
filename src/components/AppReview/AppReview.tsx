import React, { useRef } from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

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
import { AppButton } from "../Buttons/AppButton";

import { useAppSelector } from "../../hooks/useAppSelector";
import { handleReviewCardText } from "../../helpers/handleReviewCardText";
import { useActions } from "../../hooks/useActions";
import { reviewServiceLikeReview } from "../../services/reviewService/reviewService";
import { tokens } from "../../theme/theme";
import { useGetUser } from "../../hooks/useGetUser";
import { useAppReviewText } from "./config/useAppReviewText";
import { handleLikeIcon, handleStarIcon } from "./config/config";

import { AppPathes } from "../AppRouter/interfaces";
import { AppRatingSize } from "../AppRating/interface";
import { AppReviewProps } from "./interface";
import EditIcon from "@mui/icons-material/Edit";
import imagePlaceHolder from "../../assets/images/image-placeholder.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { makeStyles } from "./styles";

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
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const appReviewText = useAppReviewText();
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
  const [reviewCreator, reviewCreatorLikes] = useGetUser(creator, review._id);
  const StarIcon = handleStarIcon(artItem.averageRating || "0");
  const LikeIcon = handleLikeIcon(likes, user.id);
  const croppedTitle = isFull ? title : handleReviewCardText(title, 45);
  const croppedText = isFull ? text : handleReviewCardText(text, 135);
  const isAdmin = user.role === 1;

  const handleLikeReview = async () => {
    if (!isAuth) {
      navigate(AppPathes.LOGIN);
      return;
    }
    if (!isAdmin) like(_id);
    if (!isFull && !isRelated) {
      likedReview!(_id, isAdmin ? creator : user.id);
    }
    if (isRelated) {
      likeRelatedReview!(_id, isAdmin ? creator : user.id);
    }
    if (isFull) {
      handleFullReviewLikes!();
    }
    await reviewServiceLikeReview(_id, isAdmin ? creator : user.id);
  };

  return (
    <Card sx={style.cardWrapper} ref={componentRef}>
      <CardHeader
        action={
          (creator === user.id || isAdmin) && (
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
            <Box sx={style.cardTitle}>
              <ReactMarkdown children={croppedTitle} />
              <Box component="span" sx={style.cardTitleRating}>
                {artItem?.averageRating} <StarIcon />
              </Box>
            </Box>
          </Typography>
          <Typography sx={style.cardReviewCreatorWrapper}>
            {appReviewText.reviewAuthor}: {reviewCreator.username}{" "}
            {reviewCreatorLikes}
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
          <Box sx={style.cardText}>
            <ReactMarkdown children={croppedText} />
          </Box>
          <Box sx={style.cardGrade}>
            {appReviewText.authorGrade}: {grade}
          </Box>
          {isFull && (
            <Box sx={style.cardTagsWrapper}>
              {tags.map((tag) => (
                <AppTag key={tag._id} title={tag.title} />
              ))}
            </Box>
          )}
        </CardContent>
        <CardActions sx={style.cardActionsWrapper}>
          {isFull ? (
            <>
              <AppRating
                rating={rating!}
                onChange={handleRating!}
                max={5}
                size={AppRatingSize.LARGE}
              />
              <ReactToPrint
                content={() => componentRef.current}
                trigger={() => <AppButton text="print" />}
              />
            </>
          ) : (
            <AppButtonLink
              text={appReviewText.buttonMore}
              path={"/reviews/" + _id}
            />
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
