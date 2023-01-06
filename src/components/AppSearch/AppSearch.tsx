import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Autocomplete, Box, TextField } from "@mui/material";

import { reviewServiceSearchReviews } from "../../services/reviewService/reviewService";

import { IReview } from "../../models/IReview";
import { makeStyles } from "./styles";

export const AppSearch = () => {
  const [options, setOptions] = useState<IReview[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const style = makeStyles();

  const onChangeOne = async (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (value) {
      const response = await reviewServiceSearchReviews(value);
      setOptions(response.data);
    }
  };
  return (
    <Autocomplete
      freeSolo
      filterOptions={(x) => x}
      options={options ? options : []}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        return option.title;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          onClick={() => navigate(`/reviews/${option._id}`)}
        >
          {option.title}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t(`Search.placeholder`)}
          onChange={(e) => onChangeOne(e)}
          variant="standard"
          sx={style.searchTextField}
        />
      )}
    />
  );
};
