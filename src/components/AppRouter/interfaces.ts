import React from "react";

import { Login } from "../../pages/Login/Login";
import { Main } from "../../pages/Main/Main";
import { NewReview } from "../../pages/NewReview/NewReview";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Registration } from "../../pages/Registration/Registration";

export interface IRoute {
  path: string;
  element: React.ComponentType;
}

export enum AppPathes {
  MAIN = "/",
  ERROR = "/404",
  LOGIN = "/signin",
  REGISTRATION = "/signup",
  NOT_FOUND = "/not-found",
  NEW_REVIEW = "/new-review",
}

export const publicRoutes: IRoute[] = [
  { path: AppPathes.LOGIN, element: Login },
  { path: AppPathes.REGISTRATION, element: Registration },
  { path: AppPathes.MAIN, element: Main },
  { path: AppPathes.NOT_FOUND, element: NotFound },
  { path: AppPathes.NEW_REVIEW, element: NewReview },
];
export const privateRoutes: IRoute[] = [];

//   { path: Pathes.MOVIE, element: MoviePage },
//   { path: Pathes.RESERVE, element: ReservePage },
//   { path: Pathes.USER, element: User },
//   { path: Pathes.ERROR, element: NotFound },
//   { path: Pathes.NOTHING_FOUND, element: NothingFound },
