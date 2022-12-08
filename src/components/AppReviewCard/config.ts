import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const handleStarIcon = (count: string) => {
  return Number(count) > 0 ? StarIcon : StarBorderIcon;
};

export const handleLikeIcon = (liked: boolean) => {
  return liked ? FavoriteIcon : FavoriteBorderIcon;
};
