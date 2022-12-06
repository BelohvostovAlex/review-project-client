import authSliceReducer from "./authSlice/authSlice";
import reviewSliceReducer from "./reviewSlice/reviewSlice";

export const allReducers = {
  auth: authSliceReducer,
  reviews: reviewSliceReducer,
};
