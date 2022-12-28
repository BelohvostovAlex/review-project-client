import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { AppBanner } from "../../components/AppBanner/AppBanner";
import { AppTable } from "../../components/AppTable/AppTable";

import {
  reviewServiceDeleteReview,
  reviewServiceGetCreatorLikes,
} from "../../services/reviewService/reviewService";
import { useFetchCreatorReviews } from "../../hooks/useFetchCreatorReviews";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useProfileText } from "./config/useProfileText";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./style";
import { GridRowId } from "@mui/x-data-grid";
import { AppButton } from "../../components/Buttons/AppButton";
import { AppButtonLink } from "../../components/Buttons/AppButtonLink";
import { IReview } from "../../models/IReview";
import { AppLoader } from "../../components/AppLoader/AppLoader";

export const Profile: React.FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { reviews, isLoading, handleReviews } = useFetchCreatorReviews(user.id);
  const [creatorLikes, setCreatorLikes] = useState(0);
  const [selected, setSelected] = useState([] as GridRowId[]);
  const [editReview, setEditReview] = useState({} as IReview);
  const profileText = useProfileText();
  const style = makeStyles();

  const getCreatorLikes = async () => {
    const { data } = await reviewServiceGetCreatorLikes(user.id);
    setCreatorLikes(data);
  };

  const handleSelectedRow = (ids: GridRowId[]) => {
    setSelected(ids);
    const review = reviews.find((item) => item._id === ids[0]);
    setEditReview(review!);
  };

  useEffect(() => {
    getCreatorLikes();
  }, []);

  const handleCheckedRemove = async () => {
    let requests = selected.map((item) => reviewServiceDeleteReview(item));
    await Promise.all(requests);
    const currReviews = reviews.filter((item) => !selected.includes(item._id));
    handleReviews(currReviews);
  };

  if (!isAuth) return <Navigate to={AppPathes.MAIN} />;

  if (isLoading) return <AppLoader open={true} />;

  return (
    <Box sx={style.profileWrapper}>
      <Typography variant="h3" sx={style.profileTitle}>
        {profileText.greeting}, {user.username} {creatorLikes}
        <FavoriteIcon sx={style.profileLikeIcon} /> !
      </Typography>
      {reviews.length > 0 ? (
        <Box>
          <Typography>{profileText.myReviews}</Typography>
          <Box sx={style.profileControlBtnsWrapper}>
            <AppButtonLink text={<AddBoxIcon />} path={AppPathes.NEW_REVIEW} />
            <AppButtonLink
              styles={style.profileEditBtn}
              text={<EditIcon />}
              path={AppPathes.NEW_REVIEW}
              state={editReview}
              disabled={selected.length === 0}
            />
            <AppButton
              text={<DeleteForeverIcon />}
              onClick={handleCheckedRemove}
              disabled={selected.length === 0}
            />
          </Box>
          <AppTable reviews={reviews} handleSelectedRow={handleSelectedRow} />
        </Box>
      ) : (
        <AppBanner
          title={profileText.noReviewsTitle}
          text={profileText.noReviewsSubtitle}
        />
      )}
    </Box>
  );
};
