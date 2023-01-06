import React from "react";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { APP_LANGUAGES } from "../../mock/constants";
import { makeStyles } from "./styles";

export const AppLangSelect: React.FC = () => {
  const { t, i18n } = useTranslation();
  const style = makeStyles();

  const handleLang = (e: SelectChangeEvent) => {
    const value = e.target.value;
    i18n.changeLanguage(value);
  };
  return (
    <FormControl sx={style.appLangSelectWrapper}>
      <InputLabel id="lang">{t("Lang.title")}</InputLabel>
      <Select
        labelId="lang"
        value={i18n.language}
        onChange={handleLang}
        autoWidth
        label="Lang"
        sx={style.appLangSelect}
      >
        {APP_LANGUAGES.map((item) => (
          <MenuItem value={item.lang} key={item.lang}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
