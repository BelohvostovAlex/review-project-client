import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { AppReview } from "../../components/AppReview/AppReview";
import { AppButton } from "../../components/Buttons/AppButton";

import { useGetCurrentReview } from "../../hooks/useGetCurrentReview";
import { useAppSelector } from "../../hooks/useAppSelector";
import { artItemsServiceRateItem } from "../../services/artItemsService/artItemsService";
import { addRatedArtItem } from "../../store/slices/authSlice/authSlice";
import { reviewServiceGetRelatedReviews } from "../../services/reviewService/reviewService";

import { IReview } from "../../models/IReview";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReviewProps } from "./interface";
import { makeStyles } from "./styles";
import { AppSkeletonReviewCard } from "../../components/AppSkeletonReviewCard/AppSkeletonReviewCard";
import { handleLike } from "../../helpers/handleLike";

export const Review: React.FC<ReviewProps> = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [relatedReviews, setRelatedReviews] = useState([] as IReview[]);
  const { user } = useAppSelector((state) => state.auth);
  const [currentReview, isLoading, handleFullReviewLikes] = useGetCurrentReview(
    id!,
    user.id
  );

  const navigate = useNavigate();
  const style = makeStyles();

  const goBack = () => {
    navigate(-1);
  };

  const handleRating = async (rate: number) => {
    setRating((prev) => (prev = rate));
    const updatedArtItem = await artItemsServiceRateItem({
      id: currentReview.artItem._id!,
      userId: user.id,
      rate: rate,
    });
    if (updatedArtItem) addRatedArtItem(currentReview.artItem._id!);
  };

  const getCurrentRating = useCallback(() => {
    if (currentReview) {
      const isAlreadyRated = currentReview?.artItem?.rating?.find(
        (item) => item.user === user.id
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

  const likeRelatedReview = (id: string, userId: string) => {
    setRelatedReviews((prev) => {
      return handleLike(prev, id, userId);
    });
  };

  return (
    <Box sx={style.reviewWrapper}>
      <AppButton
        onClick={goBack}
        text={<ArrowBackIosIcon />}
        styles={style.reviewBackBtn}
      />
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
      {relatedReviews.length > 0 && !isLoading && (
        <Box>
          <Typography sx={style.relatedReviewsTitle} variant="h3">
            Related reviews:
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
