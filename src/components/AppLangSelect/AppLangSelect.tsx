import React from "react";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useActions } from "../../hooks/useActions";

import { APP_LANGUAGES } from "../../mock/constants";
import { makeStyles } from "./styles";

export const AppLangSelect: React.FC = () => {
  const { lang } = useAppSelector(authSelector);
  const { changeLang } = useActions();
  const { t, i18n } = useTranslation();
  const style = makeStyles();

  const handleLang = (e: SelectChangeEvent) => {
    const value = e.target.value;
    i18n.changeLanguage(value);
    changeLang(value);
  };
  return (
    <FormControl sx={style.appLangSelectWrapper}>
      <InputLabel id="lang">{t("Lang.title")}</InputLabel>
      <Select
        labelId="lang"
        value={lang}
        onChange={handleLang}
        autoWidth
        label="Lang"
        sx={style.appLangSelect}
      >
        {APP_LANGUAGES.map((lang) => (
          <MenuItem value={lang} key={lang}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
