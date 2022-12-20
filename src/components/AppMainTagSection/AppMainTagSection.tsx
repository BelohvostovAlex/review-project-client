import React from "react";

import { Box, Typography, useTheme } from "@mui/material";
import { AppTag } from "../AppTag/AppTag";

import { tokens } from "../../theme/theme";
import { AppMainSectionProps } from "../AppMainSection/interface";
import { makeStyles } from "./styles";
import { useFetchTags } from "../../hooks/useFetchTags";
import { AppButton } from "../Buttons/AppButton";

export const AppMainTagSection: React.FC<AppMainSectionProps> = ({ title }) => {
  const [tags] = useFetchTags();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = makeStyles({ tagSectionTitleWrapperBg: colors.grey[700] });

  const handleTagClick = (id: string) => {};
  return (
    <Box sx={style.tagSectionWrapper}>
      <Typography variant="h3" sx={style.tagSectionTitle}>
        {title}
      </Typography>
      {tags.map((tag) => (
        <AppTag
          key={tag._id}
          title={tag.title}
          onClick={() => console.log(tag.title)}
          isDelete={false}
          styles={style.tag}
        />
      ))}
      {tags.length > 4 && <AppButton text="More" />}
    </Box>
  );
};
