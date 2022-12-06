import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { AppButton } from "../Buttons/AppButton";
import { AppCreatableAutoComplete } from "../AppCreatableAutocomplete/AppCreatableAutoComplete";
import { AppTag } from "../AppTag/AppTag";
import { AppUploadImg } from "../AppUploadImg/AppUploadImg";
import { AppAlert } from "../AppAlert/AppAlert";
import { AppRating } from "../AppRating/AppRating";

import { artItemsServiceCreateItem } from "../../services/artItemsService/artItemsService";
import { reviewServiceCreateReview } from "../../services/reviewService/reviewService";
import { tagServiceCreateTag } from "../../services/tagService/tagService";
import { useFetchItems } from "../../hooks/useFetchTags";
import { useFetchArtItems } from "../../hooks/useFetchArtItems";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchCategoriesOptions } from "../../hooks/useFetchCategoriesOptions";

import { AppRatingSize } from "../AppRating/interface";
import { ReviewFormInputs } from "./interface";
import { makeStyles } from "./styles";
import { ITag } from "../../models/ITag";
import { IArtItem } from "../../models/IArtItem";
import { AppAlertSeverity } from "../AppAlert/interface";

export const ReviewForm: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [tags, handleAddTag] = useFetchItems();
  const [artItems, handleAddArtItem] = useFetchArtItems();
  const categoryOptions = useFetchCategoriesOptions();
  const [currentTags, setCurrentTags] = useState<ITag[]>([]);
  const [currentArtItem, setCurrentArtItem] = useState<IArtItem | null>(null);
  const [grade, setGrade] = useState(1);
  const [image, setImage] = useState("");
  const style = makeStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ReviewFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<ReviewFormInputs> = async (data) => {
    const { title, category, text } = data;
    const artItemId = currentArtItem!._id;
    const newReview = await reviewServiceCreateReview({
      title,
      artItem: artItemId!,
      category,
      text,
      creator: user.id,
      grade: grade,
      tags: currentTags,
      image: image,
    });

    if (newReview) {
      setGrade(1);
      setImage("");
      reset();
    }
  };

  const handleDeleteCurrentTag = (tag: string) => {
    setCurrentTags((prev) => prev.filter((item) => item.title !== tag));
  };

  const handleAddCurrentTags = (tag: ITag | null) => {
    if (tag) {
      setCurrentTags((prev) => {
        const isExistTag = prev.find(
          (currentTag) => currentTag.title === tag.title
        );

        if (isExistTag) return prev;
        return [...prev, tag];
      });
    }
  };

  const handleAddCurrentArtItem = (item: IArtItem | null) => {
    setCurrentArtItem(item);
  };

  const handleGrade = (rating: number) => {
    setGrade(rating);
  };

  const handleImage = (image: string) => {
    setImage(image);
  };

  return (
    <>
      <Box
        component="form"
        sx={style.reviewFormWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Review Title"
          placeholder="My Review for Harry Potter"
          variant="outlined"
          type="text"
          {...register("title", { required: "Title is required" })}
          sx={style.textField}
          error={!!errors.title}
          helperText={!!errors.title && errors.title?.message}
        />
        <Autocomplete
          sx={style.textField}
          options={categoryOptions.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose category"
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={!!errors.category && errors.category?.message}
            />
          )}
        />
        <AppCreatableAutoComplete
          items={artItems}
          handleAddItem={handleAddArtItem}
          handleAddCurrentItems={handleAddCurrentArtItem}
          createCallBack={artItemsServiceCreateItem}
          item="artItem"
          textFieldTitle="Choose Art Item.."
          dialogueText=" Did you miss any art of piece in our list? Please, add it!"
          dialogueTitle="Add a new Art Item"
          register={register}
          error={!!errors.artItem}
          helperText={!!errors.artItem && errors.artItem?.message}
        />
        <TextField
          label="Review text"
          multiline
          rows={4}
          sx={style.textField}
          {...register("text", { required: "Text review is required" })}
          placeholder="As for me Harry Potter is amazing movie, because..."
          error={!!errors.text}
          helperText={!!errors.text && errors.text?.message}
        />
        <AppUploadImg handleImage={handleImage} />
        {image && (
          <Box sx={style.reviewImageWrapper}>
            <Box component="img" src={image} sx={style.reviewImage} />
          </Box>
        )}
        <Typography>Your grade:</Typography>
        <AppRating
          max={10}
          defaultValue={grade}
          onChange={handleGrade}
          rating={grade}
          size={AppRatingSize.LARGE}
        />
        <AppCreatableAutoComplete
          items={tags}
          handleAddItem={handleAddTag}
          handleAddCurrentItems={handleAddCurrentTags}
          createCallBack={tagServiceCreateTag}
          item="tag"
          textFieldTitle="Enter tags.."
          dialogueText=" Did you miss any tag in our list? Please, add it!"
          dialogueTitle="Add a new Tag"
          register={register}
          error={!!errors.tags}
          helperText={!!errors.tags && errors.tags?.message}
        />
        <Stack direction="row" spacing={1} sx={style.tagsWrapper}>
          {currentTags.map(({ title, _id }) => (
            <AppTag
              onClick={() => handleDeleteCurrentTag(title)}
              title={title}
              key={_id}
            />
          ))}
        </Stack>
        <AppButton text="Create" type="submit" />
      </Box>
      {isSubmitSuccessful && (
        <AppAlert
          text="Your review was successfully created!"
          severity={AppAlertSeverity.SUCCESS}
          open={true}
        />
      )}
    </>
  );
};
