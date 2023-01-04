import React, { useEffect, useState, useCallback, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

import { Box, TextField, Typography } from "@mui/material";
import { AppReview } from "../../components/AppReview/AppReview";
import { AppButtonBack } from "../../components/Buttons/AppButtonBack/AppButtonBack";
import { AppSkeletonReviewCard } from "../../components/AppSkeletons/AppSkeletonReviewCard/AppSkeletonReviewCard";
import { AppButton } from "../../components/Buttons/AppButton";
import { AppComment } from "../../components/AppComment/AppComment";

import { useGetCurrentReview } from "../../hooks/useGetCurrentReview";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useInput } from "../../hooks/useInput";
import { artItemsServiceRateItem } from "../../services/artItemsService/artItemsService";
import { addRatedArtItem } from "../../store/slices/authSlice/authSlice";
import {
  reviewServiceCreateComment,
  reviewServiceGetRelatedReviews,
} from "../../services/reviewService/reviewService";
import { useReviewText } from "./config/useReviewText";
import { handleLike } from "../../helpers/handleLike";

import { IReview } from "../../models/IReview";
import { ReviewProps } from "./interface";
import { IComment } from "../../models/IComment";
import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./styles";

export const Review: React.FC<ReviewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [arrivalComment, setArrivalComment] = useState({} as IComment);
  const [rating, setRating] = useState(0);
  const [commentText, handleCommentText, clearCommentText] = useInput("");
  const [relatedReviews, setRelatedReviews] = useState([] as IReview[]);
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const isAdmin = user.role === 1;
  const {
    currentReview,
    isLoading,
    handleFullReviewLikes,
    handleReviewComments,
  } = useGetCurrentReview(id!, user.id, isAdmin);
  const reviewText = useReviewText();

  const style = makeStyles();

  const handleRating = async (rate: number) => {
    if (!isAuth) {
      navigate(AppPathes.LOGIN);
      return;
    }
    setRating(rate);
    const updatedArtItem = await artItemsServiceRateItem({
      id: currentReview.artItem._id!,
      userId: isAdmin ? currentReview.creator : user.id,
      rate: rate,
    });
    if (updatedArtItem && !isAdmin) addRatedArtItem(currentReview.artItem._id!);
  };

  const getCurrentRating = useCallback(() => {
    if (currentReview) {
      const isAlreadyRated = !isAdmin
        ? currentReview?.artItem?.rating?.find((item) => item.user === user.id)
        : currentReview?.artItem?.rating?.find(
            (item) => item.user === currentReview.creator
          );
      if (isAlreadyRated) {
        setRating(isAlreadyRated.rate);
      }
    }
  }, [currentReview, user.id]);

  const getRelatedReviews = useCallback(async () => {
    if (currentReview.artItem) {
      const { artItem, title } = currentReview;
      const { data } = await reviewServiceGetRelatedReviews(artItem._id!);
      setRelatedReviews(data.filter((item) => item.title !== title));
    }
  }, [currentReview]);

  useEffect(() => {
    if (currentReview) {
      getRelatedReviews();
      getCurrentRating();
    }
  }, [currentReview, getRelatedReviews, getCurrentRating]);

  useEffect(() => {
    setSocket(io(process.env.REACT_APP_SOCKET_URL!));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("getComment", (data) => {
        setArrivalComment({
          _id: Date.now().toString(),
          sender: data.sender,
          text: data.text,
          review: data.review,
          time: new Date(),
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (currentReview && arrivalComment) {
      handleReviewComments(arrivalComment);
    }
    // eslint-disable-next-line
  }, [arrivalComment]);

  const likeRelatedReview = (id: string, userId: string) => {
    setRelatedReviews((prev) => {
      return handleLike(prev, id, userId);
    });
  };

  const onSubmitComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuth) {
      navigate(AppPathes.LOGIN);
      return;
    }
    socket!.emit("sendComment", {
      sender: user,
      review: currentReview._id,
      text: commentText,
    });
    await reviewServiceCreateComment({
      id: currentReview._id,
      userId: user.id,
      text: commentText,
    });

    clearCommentText();
  };

  return (
    <Box sx={style.reviewWrapper}>
      <AppButtonBack styles={style.reviewBackBtn} />
      {isLoading && <AppSkeletonReviewCard isFull={true} />}
      {currentReview.creator && !isLoading && (
        <AppReview
          review={currentReview}
          isFull={true}
          rating={rating}
          handleRating={handleRating}
          handleFullReviewLikes={handleFullReviewLikes}
        />
      )}
      <Box sx={style.commentsBlockWrapper}>
        {!isLoading && isAuth && (
          <>
            <Typography variant="h5" sx={style.commentsBlockTitle}>
              {reviewText.commentTitle}:
            </Typography>
            <Box
              component="form"
              onSubmit={onSubmitComment}
              sx={style.commentForm}
            >
              <TextField
                value={commentText}
                onChange={handleCommentText}
                multiline
                rows={4}
                sx={style.commentTextField}
              />
              <AppButton text={reviewText.commentSend} type="submit" />
            </Box>
          </>
        )}
        {currentReview.comments && currentReview.comments.length > 0 && (
          <>
            <Typography variant="h5" sx={style.commentsBlockTitle}>
              {reviewText.comments}:
            </Typography>
            {currentReview.comments
              .slice(currentReview.comments.length - 10)
              .map((comment) => (
                <AppComment comment={comment} key={comment._id} />
              ))}
          </>
        )}
      </Box>
      {relatedReviews.length > 0 && !isLoading && (
        <Box>
          <Typography sx={style.relatedReviewsTitle} variant="h3">
            {reviewText.relatedReviews}:
          </Typography>
          <Box sx={style.relatedReviews}>
            {relatedReviews.map((item, i) => (
              <AppReview
                review={item}
                key={i}
                isRelated={true}
                likeRelatedReview={likeRelatedReview}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
