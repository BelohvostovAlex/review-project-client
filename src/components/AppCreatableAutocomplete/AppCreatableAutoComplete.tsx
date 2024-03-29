import { FunctionComponent, useEffect, useState } from "react";

import { TextField, Autocomplete } from "@mui/material";
import { AppDialogue } from "../AppDialogue";

import {
  useCreatableAutoCompleteText,
  chooseRegisterTextField,
} from "./config";
import {
  AppArtItemsAutoCompleteProps,
  AppTagsAutoCompleteProps,
  chooseFilter,
} from "./interfaces";
import { ITag } from "../../models/ITag";
import { IArtItem } from "../../models/IArtItem";
import { makeStyles } from "./styles";

export const AppCreatableAutoComplete: FunctionComponent<
  AppTagsAutoCompleteProps | AppArtItemsAutoCompleteProps
> = ({
  items,
  handleAddItem,
  handleAddCurrentItems,
  createCallBack,
  item,
  textFieldTitle,
  dialogueText,
  dialogueTitle,
  register,
  error,
  helperText,
  artItem,
}) => {
  const [dialogValue, setDialogValue] = useState({
    title: "",
  });
  const [value, setValue] = useState<ITag | IArtItem | null>(null);
  const [open, toggleOpen] = useState(false);
  const style = makeStyles();
  const registerTextField = chooseRegisterTextField(item!);
  const textInfo = useCreatableAutoCompleteText(item!);

  const handleClose = () => {
    setDialogValue({
      title: "",
    });
    toggleOpen(false);
  };

  const handleSubmit = async () => {
    const isExist = items.find((item) => item.title === dialogValue.title);
    if (isExist) return;
    const { data } = await createCallBack({ title: dialogValue.title });

    handleAddItem(data);
    setValue(data);
    handleClose();
  };

  useEffect(() => {
    if (item === "artItem") {
      setValue(artItem || null);
    }
    // eslint-disable-next-line
  }, [item]);

  useEffect(() => {
    handleAddCurrentItems(value);
  }, [value, handleAddCurrentItems]);

  return (
    <>
      <Autocomplete
        freeSolo={true}
        sx={style.autoCompleteWrapper}
        value={value}
        defaultValue={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={items}
        filterOptions={(options, params) => {
          const filter = chooseFilter(item!);
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `${textInfo.add} "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(props, option) => {
          return <li {...props}>{option.title}</li>;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={textFieldTitle}
            {...register!(registerTextField, {
              required: textInfo.required,
            })}
            error={error}
            helperText={helperText}
            placeholder={textInfo.placeholder}
          />
        )}
      />
      <AppDialogue
        dialogueTitle={dialogueTitle}
        dialogueText={dialogueText}
        onClick={handleSubmit}
        onClose={handleClose}
        open={open}
        setDialogValue={setDialogValue}
        dialogValue={dialogValue}
      />
    </>
  );
};
