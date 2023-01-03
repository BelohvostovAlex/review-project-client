import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { AppBanner } from "../../components/AppBanner/AppBanner";
import { AppTable } from "../../components/AppTable/AppTable";
import { AppButton } from "../../components/Buttons/AppButton";
import { AppButtonLink } from "../../components/Buttons/AppButtonLink";
import { AppSkeletonTable } from "../../components/AppSkeletons/AppSkeletonTable/AppSkeletonTable";

import { reviewServiceDeleteReview } from "../../services/reviewService/reviewService";
import { useFetchCreatorReviews } from "../../hooks/useFetchCreatorReviews";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useProfileText } from "./config/useProfileText";
import { useAppTableConfig } from "./config/useAppTableConfig";
import { useGetUser } from "../../hooks/useGetUser";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./style";
import { GridRowId } from "@mui/x-data-grid";
import { IReview } from "../../models/IReview";

export const Profile: React.FC = () => {
  const { id } = useParams();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [user, creatorLikes] = useGetUser(id!);
  const { reviews, isLoading, handleReviews } = useFetchCreatorReviews(id!);
  const [selected, setSelected] = useState([] as GridRowId[]);
  const [editReview, setEditReview] = useState({} as IReview);
  const profileText = useProfileText();
  const { columns } = useAppTableConfig();
  const style = makeStyles();

  const handleSelectedRow = (ids: GridRowId[]) => {
    setSelected(ids);
    const review = reviews.find((item) => item._id === ids[0]);
    setEditReview(review!);
  };

  const handleCheckedRemove = async () => {
    let requests = selected.map((item) => reviewServiceDeleteReview(item));
    await Promise.all(requests);
    const currReviews = reviews.filter((item) => !selected.includes(item._id));
    handleReviews(currReviews);
  };

  if (!isAuth) return <Navigate to={AppPathes.MAIN} />;

  return (
    <Box sx={style.profileWrapper}>
      <Typography variant="h3" sx={style.profileTitle}>
        {profileText.greeting}, {user.username} {creatorLikes}
        <FavoriteIcon sx={style.profileLikeIcon} /> !
      </Typography>
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
        {!isLoading && (
          <AppTable
            rows={reviews}
            handleSelectedRow={handleSelectedRow}
            columns={columns}
            navigateTo="/reviews"
          />
        )}
        {isLoading && (
          <Box sx={style.profileSkeletonWrapper}>
            <AppSkeletonTable />
          </Box>
        )}
      </Box>
      {!isLoading && reviews.length < 1 && (
        <AppBanner
          title={profileText.noReviewsTitle}
          text={profileText.noReviewsSubtitle}
        />
      )}
    </Box>
  );
};
