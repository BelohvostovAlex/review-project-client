import { GridRowId } from "@mui/x-data-grid";
import { IReview } from "../../models/IReview";

export interface AppTableProps {
  reviews: IReview[];
  handleSelectedRow: (ids: GridRowId[]) => void;
}
