import { FunctionComponent } from "react";

import { Box, Typography, Rating } from "@mui/material";

import { useRatingSubTitle } from "./config";

import { AppRatingProps, AppRatingSize } from "./interface";
import { makeStyle } from "./styles";

export const AppRating: FunctionComponent<AppRatingProps> = ({
  defaultValue = 1,
  max = 5,
  onChange,
  rating,
  size = AppRatingSize.MEDIUM,
}) => {
  const style = makeStyle();
  const stars = useRatingSubTitle(rating || 0);

  return (
    <Box sx={style.ratingWrapper}>
      <Rating
        defaultValue={defaultValue}
        max={max}
        value={rating}
        size={size}
        onChange={(event, newValue) => {
          if (newValue) onChange(newValue);
        }}
      />
      <Typography component="legend" sx={style.ratingInfo}>
        {rating !== 0 && rating} {stars}
      </Typography>
    </Box>
  );
};
