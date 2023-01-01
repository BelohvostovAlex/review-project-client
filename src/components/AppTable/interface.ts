import { GridColDef, GridRowId } from "@mui/x-data-grid";

import { IReview } from "../../models/IReview";
import { IUserFull } from "../../models/IUser";

type AppTableRows = IReview[] | IUserFull[];

export interface AppTableProps {
  rows: AppTableRows;
  handleSelectedRow: (ids: GridRowId[]) => void;
  columns: GridColDef[];
  navigateTo: string;
}
