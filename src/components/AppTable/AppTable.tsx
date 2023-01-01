import React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { makeStyles } from "./styles";
import { AppTableProps } from "./interface";

export const AppTable: React.FC<AppTableProps> = ({
  rows,
  handleSelectedRow,
  columns,
  navigateTo,
}) => {
  const navigate = useNavigate();
  const style = makeStyles();
  return (
    <Box sx={style.tableWrapper}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(id) => {
          handleSelectedRow(id);
        }}
        onRowClick={({ id }) => {
          navigate(navigateTo + `/${id}`);
        }}
      />
    </Box>
  );
};
