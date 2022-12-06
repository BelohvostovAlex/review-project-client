import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../store";
import { allActionCreators } from "../store/slices/actionCreators";

export const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(
    () => bindActionCreators(allActionCreators, dispatch),
    [dispatch]
  );
};
