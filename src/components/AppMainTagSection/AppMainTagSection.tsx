import { useState, FunctionComponent } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { AppTag } from "../AppTag/AppTag";
import { AppButton } from "../Buttons/AppButton";
import { AppReview } from "../AppReview/AppReview";
import { AppSkeletonReviewCard } from "../AppSkeletons/AppSkeletonReviewCard/AppSkeletonReviewCard";
import { AppBanner } from "../AppBanner";

import { useFetchTags } from "../../hooks/useFetchTags";
import { useFetchReviewsByTag } from "../../hooks/useFetchReviewsByTag";
import { useAppMainTagSectionText } from "./config/useAppMainTagSectionText";
import { tokens } from "../../theme/theme";

import { AppMainSectionProps } from "../AppMainSection/interface";
import { makeStyles } from "./styles";

export const AppMainTagSection: FunctionComponent<AppMainSectionProps> = ({
  title,
}) => {
  const { tags, handlePage, total } = useFetchTags(false);
  const [active, setActive] = useState("");
  const { reviews, likedReview, isLoading } = useFetchReviewsByTag(active);
  const text = useAppMainTagSectionText();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const style = makeStyles({
    tagSectionTitleWrapperBg: colors.grey[700],
  });

  const handleTagClick = async (id: string) => {
    setActive(id);
  };

  return (
    <Box>
      <Typography variant="h3" sx={style.tagSectionTitle}>
        {title}
      </Typography>
      {tags.map((tag) => (
        <AppTag
          key={tag._id}
          title={tag.title}
          onClick={() => handleTagClick(tag._id!)}
          isDelete={false}
          isActive={tag._id === active}
          styles={style.tag}
        />
      ))}
      {tags.length > 3 && tags.length !== total && (
        <AppButton text={text.button} onClick={handlePage} />
      )}
      {isLoading &&
        [1, 2, 3, 4].map((_, i) => <AppSkeletonReviewCard key={i} />)}
      {!isLoading && reviews && (
        <Box sx={style.tagSectionFoundReviewsWrapper}>
          {reviews.map((review) => (
            <AppReview
              review={review}
              key={review._id}
              likedReview={likedReview}
            />
          ))}
        </Box>
      )}
      {!isLoading && reviews && reviews.length < 1 && (
        <AppBanner title={text.appBannerTitle} text={text.appBannerText} />
      )}
    </Box>
  );
};
