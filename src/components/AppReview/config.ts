import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { handleIsLikedReviewByUser } from "../../helpers/handleIsLikedReviewByUser";

export const handleStarIcon = (count: string) => {
  return Number(count) > 0 ? StarIcon : StarBorderIcon;
};

export const handleLikeIcon = (items: string[], id: string) => {
  const liked = handleIsLikedReviewByUser(items, id);
  return liked ? FavoriteIcon : FavoriteBorderIcon;
};
