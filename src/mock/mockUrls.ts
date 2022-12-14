export const AUTH_URLS = {
  SIGNIN: "/auth/signin",
  SIGNIN_WITH_GOOGLE: "/auth/google",
  SIGNIN_WITH_TWITTER: "/auth/twitter",
  SIGNUP: "/auth/signup",
  SIGNOUT: "/auth/signout",
  SIGNOUT_WITH_SOCIAL_MEDIA: "/auth/social-logout",
  GET_USER_BY_ID: "/auth/users/",
  REFRESH_TOKEN: "/auth/refresh",
  GET_USER_SOCIAL_MEDIA: "/auth/get-user",
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
  GET_REVIEWS_WITH_SEARCH: "/reviews/search",
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
};

export const ADMIN_URLS = {
  GET_USERS: "/admin/users",
  DELETE_USER: "/admin/users/",
  CHANGE_STATUS: "/admin/users/status/",
  CHANGE_ROLE: "admin/users/role/",
  CREATE_CATEGORY: "admin/create-category",
  DELETE_CATEGORY: "admin/category/",
};
