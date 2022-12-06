import { useEffect, useState } from "react";

import { authServiceGetUser } from "../services/authService/authService";

import { IUser } from "../models/IUser";

export const useGetUser = (id: string): IUser => {
  const [user, setUser] = useState({} as IUser);

  const getUser = async () => {
    const { data } = await authServiceGetUser(id);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return user;
};
