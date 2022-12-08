import { useEffect, useState, useCallback } from "react";

import { useAppSelector } from "./useAppSelector";
import { useGetUser } from "./useGetUser";

import { handleLikedReviewByUser } from "../helpers/handleLikedReviewByUser";
import { artItemsServiceGetArtItem } from "../services/artItemsService/artItemsService";

import { IArtItem } from "../models/IArtItem";
import { IUser } from "../models/IUser";

interface useGetArtItemInfoProps {
  creator: string;
  artItem: string;
  reviewId: string;
}

type UseGetArtItemInfo = {
  reviewCreator: IUser;
  artItemInfo: IArtItem;
  isLiked: boolean;
};

export const useGetArtItemInfo = (
  data: useGetArtItemInfoProps
): UseGetArtItemInfo => {
  const { artItem, creator, reviewId } = data;
  const [artItemInfo, setArtItemInfo] = useState({} as IArtItem);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const reviewCreator = useGetUser(creator);

  const getArtItem = useCallback(async () => {
    const { data } = await artItemsServiceGetArtItem(artItem);
    setArtItemInfo(data);
  }, [artItem]);

  useEffect(() => {
    getArtItem();
  }, [user, getArtItem]);

  let isLiked = false;
  if (isAuth) {
    isLiked = handleLikedReviewByUser(user.likedReviews, reviewId);
    console.log(isLiked);
  }

  console.log(isLiked);

  return {
    reviewCreator,
    artItemInfo,
    isLiked,
  };
};
