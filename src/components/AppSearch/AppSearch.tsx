import { FunctionComponent, useCallback, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { Autocomplete, Box, TextField } from "@mui/material";

import { reviewServiceSearchReviews } from "../../services/reviewService/reviewService";

import { IReview } from "../../models/IReview";
import { makeStyles } from "./styles";

export const AppSearch: FunctionComponent = () => {
  const [options, setOptions] = useState<IReview[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const style = makeStyles();

  const onChangeOne = useCallback(
    debounce(async (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value;
      if (value) {
        const response = await reviewServiceSearchReviews(value);
        setOptions(response.data);
      }
    }, 750),
    []
  );
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
