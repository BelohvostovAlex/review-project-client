import React from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppTableConfig } from "./config/config";

import { makeStyles } from "./styles";
import { AppTableProps } from "./interface";

export const AppTable: React.FC<AppTableProps> = ({
  reviews,
  handleSelectedRow,
}) => {
  const style = makeStyles();
  const navigate = useNavigate();
  const { columns } = useAppTableConfig();
  return (
    <Box sx={style.tableWrapper}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={reviews}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(id) => {
          handleSelectedRow(id);
        }}
        onRowClick={({ id }) => navigate("/reviews" + `/${id}`)}
      />
    </Box>
  );
};
