import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { AppButton } from "../Buttons/AppButton";
import { AppCreatableAutoComplete } from "../AppCreatableAutocomplete/AppCreatableAutoComplete";
import { AppTag } from "../AppTag/AppTag";
import { AppUploadImg } from "../AppUploadImg/AppUploadImg";
import { AppAlert } from "../AppAlert/AppAlert";
import { AppRating } from "../AppRating/AppRating";
import { SimpleMdeReact } from "react-simplemde-editor";

import { artItemsServiceCreateItem } from "../../services/artItemsService/artItemsService";
import {
  reviewServiceCreateReview,
  reviewServiceUpdateReview,
} from "../../services/reviewService/reviewService";
import { tagServiceCreateTag } from "../../services/tagService/tagService";
import { useFetchItems } from "../../hooks/useFetchTags";
import { useFetchArtItems } from "../../hooks/useFetchArtItems";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchCategoriesOptions } from "../../hooks/useFetchCategoriesOptions";
import { useMarkdownOptions } from "./config/useMarkdownOptions";
import { handleTextForm } from "./config/handleTextForm";

import { ITag } from "../../models/ITag";
import { IArtItem } from "../../models/IArtItem";
import { AppRatingSize } from "../AppRating/interface";
import { AppAlertSeverity } from "../AppAlert/interface";
import { ReviewFormInputs, ReviewFormProps } from "./interface";
import { makeStyles } from "./styles";
import "easymde/dist/easymde.min.css";

export const ReviewForm: React.FC<ReviewFormProps> = ({ isEdit, review }) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [tags, handleAddTag] = useFetchItems();
  const [artItems, handleAddArtItem] = useFetchArtItems();
  const categoryOptions = useFetchCategoriesOptions();
  const [currentTags, setCurrentTags] = useState<ITag[]>([]);
  const [currentArtItem, setCurrentArtItem] = useState<IArtItem | null>(null);
  const [text, setText] = useState<string>("");
  const [grade, setGrade] = useState(1);
  const [image, setImage] = useState("");
  const formTextValues = handleTextForm(isEdit || false);
  const style = makeStyles();

  const options = useMarkdownOptions();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ReviewFormInputs>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ReviewFormInputs> = async (data) => {
    const { title, category } = data;
    const artItemId = currentArtItem!._id;

    if (isEdit) {
      await reviewServiceUpdateReview(review!._id, {
        title,
        artItem: artItemId!,
        category,
        text,
        creator: user.id,
        grade: grade,
        tags: currentTags,
        image: image,
      });

      resetFormToInitialVal(review!._id);
    } else {
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

      const { _id } = newReview.data;
      resetFormToInitialVal(_id);
    }
  };

  const resetFormToInitialVal = (id: string) => {
    setGrade(1);
    setImage("");
    reset();
    setTimeout(() => {
      navigate(`/reviews/${id}`);
    }, 1500);
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

  const onTextChange = useCallback((value: string) => {
    setText(value);
  }, []);

  useEffect(() => {
    if (!isEdit) {
      reset();
      setText("");
      setGrade(0);
      setCurrentTags([]);
      setCurrentArtItem(null);
    }
    if (isEdit && review) {
      setCurrentTags(review.tags);
      setCurrentArtItem(review.artItem);
      setImage(review.image);
      setText(review.text);
      setGrade(review.grade);
      setValue("title", review.title);
      setValue("category", review.category);
      setValue(
        "tags",
        review.tags.map((tag) => tag.title)
      );
      setValue("artItem", review.title);
    }
  }, [isEdit]);

  return (
    <>
      <Box
        component="form"
        sx={style.reviewFormWrapper}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label={formTextValues.title.label}
          placeholder={formTextValues.title.placeholder}
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
          defaultValue={
            isEdit ? { title: review!.category, firstLetter: "" } : null
          }
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
          textFieldTitle={formTextValues.artItem.textFieldTitle}
          dialogueText={formTextValues.artItem.dialogueText}
          dialogueTitle={formTextValues.artItem.dialogueTitle}
          register={register}
          error={!!errors.artItem}
          helperText={!!errors.artItem && errors.artItem?.message}
          artItem={(review && review.artItem) || undefined}
        />
        <SimpleMdeReact
          value={text}
          onChange={onTextChange}
          options={options}
          style={style.textField}
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
          textFieldTitle={formTextValues.tags.textFieldTitle}
          dialogueText={formTextValues.tags.dialogueText}
          dialogueTitle={formTextValues.tags.dialogueTitle}
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
        <AppButton text={formTextValues.submitBtn} type="submit" />
      </Box>
      {isSubmitSuccessful && (
        <AppAlert
          text={formTextValues.alertText}
          severity={AppAlertSeverity.SUCCESS}
          open={true}
        />
      )}
    </>
  );
};
