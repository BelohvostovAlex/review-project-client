import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useActions } from "../../hooks/useActions";

import { APP_LANGUAGES } from "../../mock/constants";
import { useTranslation } from "react-i18next";

export const AppLangSelect: React.FC = () => {
  const { lang } = useAppSelector((state) => state.auth);
  const { changeLang } = useActions();
  const { t, i18n } = useTranslation();

  const handleLang = (e: SelectChangeEvent) => {
    const value = e.target.value;
    i18n.changeLanguage(value);
    changeLang(value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-autowidth-label">
        {t("Lang.1")}
      </InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        value={lang}
        onChange={handleLang}
        autoWidth
        label="Lang"
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
