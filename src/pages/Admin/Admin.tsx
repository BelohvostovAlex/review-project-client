import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Box, TextField, Typography } from "@mui/material";
import { AppTable } from "../../components/AppTable/AppTable";
import { AppButton } from "../../components/Buttons/AppButton";
import { AppSkeletonTable } from "../../components/AppSkeletons/AppSkeletonTable/AppSkeletonTable";

import { useAppTableConfig } from "./config/useAppTableConfig";
import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import {
  adminServiceCreateCategory,
  adminServiceDeleteUser,
  adminServiceGetUsers,
  adminServiceHanldeUserRole,
  adminServiceHanldeUserStatus,
} from "../../services/adminService/adminService";
import { useInput } from "../../hooks/useInput";
import { useAppAdminText } from "./config/useAppAdminText";
import { USER_ROLE, USER_STATUS } from "../../mock/constants";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IUserFull } from "../../models/IUser";
import { GridRowId } from "@mui/x-data-grid";
import { AppPathes } from "../../components/AppRouter/interfaces";
import { makeStyles } from "./styles";

export const Admin: React.FC = () => {
  const { user } = useAppSelector(authSelector);
  const [users, setUsers] = useState<IUserFull[]>([]);
  const [category, handleCategory, resetCategoryVal] = useInput("");
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState([] as GridRowId[]);
  const { columns } = useAppTableConfig();
  const text = useAppAdminText();
  const disabledBtn = selected.length < 1;
  const style = makeStyles();

  const getUsers = async () => {
    const response = await adminServiceGetUsers();
    setUsers(response.data);
    setIsLoading(false);
  };

  const handleSelectedRow = (ids: GridRowId[]) => {
    setSelected(ids);
  };

  const deleteUser = async () => {
    const response = await Promise.all(
      selected.map((select) => adminServiceDeleteUser(select))
    );
    if (response) {
      setUsers((prev) => prev.filter((item) => !selected.includes(item._id)));
    }
  };

  const unblockUser = async () => {
    const response = await Promise.all(
      selected.map((select) =>
        adminServiceHanldeUserStatus(select, USER_STATUS.ACTIVE)
      )
    );
    if (response) {
      setUsers((prev) =>
        prev.map((item) =>
          selected.includes(item._id)
            ? { ...item, status: USER_STATUS.ACTIVE }
            : item
        )
      );
    }
  };

  const blockUser = async () => {
    const response = await Promise.all(
      selected.map((select) =>
        adminServiceHanldeUserStatus(select, USER_STATUS.BLOCKED)
      )
    );
    if (response) {
      setUsers((prev) =>
        prev.map((item) =>
          selected.includes(item._id)
            ? { ...item, status: USER_STATUS.BLOCKED }
            : item
        )
      );
    }
  };

  const handleAdminRole = async () => {
    const response = await Promise.all(
      selected.map((select) =>
        adminServiceHanldeUserRole(select, USER_ROLE.ADMIN)
      )
    );
    if (response) {
      setUsers((prev) =>
        prev.map((item) =>
          selected.includes(item._id)
            ? { ...item, role: USER_ROLE.ADMIN }
            : item
        )
      );
    }
  };

  const handleRegularRole = async () => {
    const response = await Promise.all(
      selected.map((select) =>
        adminServiceHanldeUserRole(select, USER_ROLE.REGULAR_USER)
      )
    );
    if (response) {
      setUsers((prev) =>
        prev.map((item) =>
          selected.includes(item._id)
            ? { ...item, role: USER_ROLE.REGULAR_USER }
            : item
        )
      );
    }
  };

  const createCategory = async () => {
    const newCat = await adminServiceCreateCategory(category);
    if (newCat.data) {
      resetCategoryVal();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (user.role !== 1) {
    return <Navigate to={AppPathes.MAIN} />;
  }

  return (
    <Box sx={style.adminWrapper}>
      <Typography sx={style.adminTitle} variant="h3">
        {text.title}
      </Typography>
      <AppButton
        text={<PersonRemoveIcon />}
        onClick={deleteUser}
        styles={style.adminBtn}
        disabled={disabledBtn}
      />
      <AppButton
        text={<PersonAddDisabledIcon />}
        onClick={blockUser}
        styles={style.adminBtn}
        disabled={disabledBtn}
      />
      <AppButton
        text={<PersonAddIcon />}
        onClick={unblockUser}
        styles={style.adminBtn}
        disabled={disabledBtn}
      />
      <AppButton
        text={<AccountCircleIcon />}
        onClick={handleRegularRole}
        styles={style.adminBtn}
        disabled={disabledBtn}
      />
      <AppButton
        text={<AdminPanelSettingsIcon />}
        onClick={handleAdminRole}
        styles={style.adminBtn}
        disabled={disabledBtn}
      />
      {isLoading && (
        <Box sx={style.adminSkeletonWrapper}>
          <AppSkeletonTable />
        </Box>
      )}
      {!isLoading && users.length > 1 && (
        <AppTable
          rows={users}
          handleSelectedRow={handleSelectedRow}
          columns={columns}
          navigateTo="/profile"
        />
      )}
      {!isLoading && (
        <Box sx={style.adminCategoryWrapper}>
          <Typography variant="h3">{text.categoryTitle}</Typography>
          <Box sx={style.adminCategoryInputWrapper}>
            <TextField
              label="Books"
              value={category}
              onChange={handleCategory}
            />
            <AppButton
              text={text.createCategoryBtn}
              onClick={createCategory}
              styles={style.adminCategoryBtn}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
