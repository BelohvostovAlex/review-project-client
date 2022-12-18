import { AxiosResponse } from "axios";
import { UseFormRegister } from "react-hook-form";
import { createFilterOptions } from "@mui/material/Autocomplete";

import { IArtItem } from "../../models/IArtItem";
import { ITag } from "../../models/ITag";
import { artItemsServiceCreateTagInput } from "../../services/artItemsService/interfaces";
import { tagServiceCreateTagInput } from "../../services/tagService/interfaces";

import { ReviewFormInputs } from "../ReviewForm/interface";

interface AutoCompleteProps {
  textFieldTitle: string;
  item?: string;
  dialogueText: string;
  dialogueTitle: string;
  register?: UseFormRegister<ReviewFormInputs>;
  error?: boolean;
  helperText?: string | false | undefined;
  artItem?: IArtItem;
}

export interface AppTagsAutoCompleteProps extends AutoCompleteProps {
  items: ITag[];
  handleAddItem: (item: ITag) => void;
  handleAddCurrentItems: (item: ITag | null) => void;
  createCallBack: (
    data: tagServiceCreateTagInput
  ) => Promise<AxiosResponse<ITag>>;
}

export interface AppArtItemsAutoCompleteProps extends AutoCompleteProps {
  items: IArtItem[];
  handleAddItem: (item: IArtItem) => void;
  handleAddCurrentItems: (item: IArtItem | null) => void;
  createCallBack: (
    data: artItemsServiceCreateTagInput
  ) => Promise<AxiosResponse<IArtItem>>;
}

export const tagFilter = createFilterOptions<ITag>();
export const artItemFilter = createFilterOptions<IArtItem>();

export const chooseFilter = (item: string) => {
  return item === "tag" ? tagFilter : artItemFilter;
};
