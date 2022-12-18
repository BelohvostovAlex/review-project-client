import { useEffect, useState } from "react";

import { authServiceGetUser } from "../services/authService/authService";

import { IUser } from "../models/IUser";
import { reviewServiceGetCreatorLikes } from "../services/reviewService/reviewService";

export const useGetUser = (id: string): [IUser, number] => {
  const [user, setUser] = useState({} as IUser);
  const [creatorLikes, setCreatorLikes] = useState(0);

  const getUser = async () => {
    const { data } = await authServiceGetUser(id);
    setUser(data);
  };

  const getCreatorLikes = async () => {
    const { data } = await reviewServiceGetCreatorLikes(id);
    setCreatorLikes(data);
  };

  useEffect(() => {
    getUser();
    getCreatorLikes();
  }, []);

  return [user, creatorLikes];
};
