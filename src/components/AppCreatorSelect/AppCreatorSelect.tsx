import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { adminServiceGetUsers } from "../../services/adminService/adminService";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IUserFull } from "../../models/IUser";
import { AppCreatorSelectProps } from "./interfaces";
import { makeStyles } from "./styles";

export const AppCreatorSelect: React.FC<AppCreatorSelectProps> = ({
  onChange,
  value,
}) => {
  const [options, setOptions] = useState<IUserFull[]>([]);
  const { t } = useTranslation();
  const style = makeStyles();

  const getUsers = async () => {
    const response = await adminServiceGetUsers();
    setOptions(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <FormControl sx={style.selectCreator} required>
      <InputLabel id="author-label">{t("AppCreatorSelect.label")}</InputLabel>
      <Select
        labelId="author-label"
        value={value}
        onChange={onChange}
        label={t("AppCreatorSelect.label")}
      >
        {options.map((option) => (
          <MenuItem value={option._id} key={option._id}>
            {option.username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
