import { useCallback, useEffect, useState } from "react";

import { authServiceGetUser } from "../services/authService/authService";
import { reviewServiceGetCreatorLikes } from "../services/reviewService/reviewService";

import { IUser } from "../models/IUser";

export const useGetUser = (id: string, reviewId?: string): [IUser, number] => {
  const [user, setUser] = useState({} as IUser);
  const [creatorLikes, setCreatorLikes] = useState<number>(0);

  const getUser = useCallback(async () => {
    const { data } = await authServiceGetUser(id);
    setUser(data);
  }, [id]);

  const getCreatorLikes = useCallback(async () => {
    const { data } = await reviewServiceGetCreatorLikes(id);
    setCreatorLikes(data);
  }, [id]);

  useEffect(() => {
    getUser();
    getCreatorLikes();
  }, [reviewId, getUser, getCreatorLikes]);

  return [user, creatorLikes];
};
