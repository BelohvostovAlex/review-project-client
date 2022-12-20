export const GOOGLE_OAUTH_USER_INFO_URL =
  "https://www.googleapis.com/oauth2/v3/userinfo";

// export const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/dujpbjyhd/image/upload";

export const googleClientId =
  "3597899066-u5a5bri40pv3hs6ohcg8dv4r14goa2pl.apps.googleusercontent.com";
// export const githubClientId = "c8b95ac3b4532ae10a42";
// export const githubClientSecret = "40e04e6c5f68002217b809a8214e1a8ffc9c82d9";

export const AUTH_URLS = {
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
  GET_USER_BY_ID: "/auth/users/",
  REFRESH_TOKEN: "/auth/refresh",
};

export const TAGS_URLS = {
  GET_TAGS: "/tags",
  CREATE_TAG: "/tags",
};

export const ART_ITEMS_URLS = {
  GET_ITEMS: "/art-items",
  CREATE_ITEM: "/art-items",
  RATE_ITEM: "/art-items/rate",
  GET_ITEM_BY_ID: "/art-items/",
};

export const REVIEWS_URLS = {
  GET_REVIEWS: "/reviews",
  GET_RELATED_REVIEWS: "/reviews/related",
  GET_CREATOR_REVIEWS: "/reviews/creator",
  GET_REVIEWS_BY_TAG: "/reviews/tag",
  CREATE_REVIEW: "/reviews",
  CREATE_REVIEW_COMMENT: "/reviews/new-comment",
  LIKE_REVIEW: "/reviews/like/",
  GET_CREATOR_LIKES: "/reviews/creator-likes",
};

export const CATEGORY_URLS = {
  GET_CATEGORIES: "/category",
  CREATE_CATEGORY: "/category",
};
