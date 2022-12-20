import React, { FormEvent, useState } from "react";

import { Box, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export const AppSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("search", searchTerm);

    setSearchTerm("");
  };
  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-end" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        label="Search.."
        variant="standard"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Box>
  );
};
