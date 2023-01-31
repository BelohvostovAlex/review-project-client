import React from "react";

import { Login } from "../../pages/Login";
import { Main } from "../../pages/Main";
import { NewReview } from "../../pages/NewReview";
import { NotFound } from "../../pages/NotFound";
import { Profile } from "../../pages/Profile";
import { Registration } from "../../pages/Registration";
import { Review } from "../../pages/Review";
import { Reviews } from "../../pages/Reviews";

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
  REVIEW = "/reviews/:id",
  REVIEWS = "/reviews/all/:sort",
  PROFILE = "/profile/:id",
  ADMIN = "/admin",
}

export const publicRoutes: IRoute[] = [
  { path: AppPathes.LOGIN, element: Login },
  { path: AppPathes.REGISTRATION, element: Registration },
  { path: AppPathes.MAIN, element: Main },
  { path: AppPathes.NOT_FOUND, element: NotFound },
  { path: AppPathes.NEW_REVIEW, element: NewReview },
  { path: AppPathes.REVIEW, element: Review },
  { path: AppPathes.REVIEWS, element: Reviews },
  { path: AppPathes.PROFILE, element: Profile },
];
