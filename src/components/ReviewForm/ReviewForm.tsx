import { FunctionComponent, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Autocomplete,
  Box,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AppButton } from "../Buttons";
import { AppCreatableAutoComplete } from "../AppCreatableAutocomplete";
import { AppTag } from "../AppTag";
import { AppUploadImg } from "../AppUploadImg";
import { AppAlert } from "../AppAlert";
import { AppRating } from "../AppRating";
import { AppCreatorSelect } from "../AppCreatorSelect";

import { artItemsServiceCreateItem } from "../../services/artItemsService/artItemsService";
import {
  reviewServiceCreateReview,
  reviewServiceUpdateReview,
} from "../../services/reviewService/reviewService";
import { tagServiceCreateTag } from "../../services/tagService/tagService";
import { useFetchTags } from "../../hooks/useFetchTags";
import { useFetchArtItems } from "../../hooks/useFetchArtItems";
import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useFetchCategoriesOptions } from "../../hooks/useFetchCategoriesOptions";
import { useHandleTextForm } from "./config/useHandleTextForm";

import { ITag } from "../../models/ITag";
import { IArtItem } from "../../models/IArtItem";
import { AppRatingSize } from "../AppRating/interface";
import { AppAlertSeverity } from "../AppAlert/interface";
import { ReviewFormInputs, ReviewFormProps } from "./interface";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { makeStyles } from "./styles";

export const ReviewForm: FunctionComponent<ReviewFormProps> = ({
  isEdit,
  review,
}) => {
  const { user } = useAppSelector(authSelector);
  const navigate = useNavigate();
  const { tags, handleAddTag } = useFetchTags();
  const [artItems, handleAddArtItem] = useFetchArtItems();
  const categoryOptions = useFetchCategoriesOptions();
  const [currentTags, setCurrentTags] = useState<ITag[]>([]);
  const [author, setAuthor] = useState("");
  const [currentArtItem, setCurrentArtItem] = useState<IArtItem | null>(null);
  const [grade, setGrade] = useState(1);
  const [image, setImage] = useState("");
  const formTextValues = useHandleTextForm(isEdit || false);
  const style = makeStyles();
  const isAdmin = user.role === 1;

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
    const { title, category, text } = data;
    const artItemId = currentArtItem!._id;

    if (isEdit) {
      await reviewServiceUpdateReview(review!._id, {
        title,
        artItem: artItemId!,
        category,
        text,
        creator: !isAdmin ? user.id : author,
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
        creator: !isAdmin ? user.id : author,
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

  const handleAuthor = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setAuthor(value);
  };

  useEffect(() => {
    if (!isEdit) {
      reset();
      setGrade(0);
      setCurrentTags([]);
      setCurrentArtItem(null);
      setImage("");
    }
    if (isEdit && review) {
      setCurrentTags(review.tags);
      setCurrentArtItem(review.artItem);
      setImage(review.image);
      setGrade(review.grade);
      setValue("title", review.title);
      setValue("category", review.category);
      setValue("text", review.text);
      setValue(
        "tags",
        review.tags.map((tag) => tag.title)
      );
      setValue("artItem", review.title);
    }

    if (isEdit && review && isAdmin) {
      setAuthor(review.creator);
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
          {...register("title", {
            required: formTextValues.title.required,
          })}
          sx={style.textField}
          error={!!errors.title}
          helperText={!!errors.title && errors.title?.message}
        />
        {isAdmin && <AppCreatorSelect value={author} onChange={handleAuthor} />}
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
              label={formTextValues.category.label}
              {...register("category", {
                required: formTextValues.category.required,
              })}
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
        <TextField
          label={formTextValues.text.label}
          placeholder={formTextValues.text.placeholder}
          variant="outlined"
          multiline
          rows={6}
          type="text"
          {...register("text", {
            required: formTextValues.text.required,
          })}
          sx={style.textField}
          error={!!errors.text}
          helperText={!!errors.text && errors.text?.message}
        />
        <AppUploadImg handleImage={handleImage} />
        {image && (
          <Box sx={style.reviewImageWrapper}>
            <Box component="img" src={image} sx={style.reviewImage} />
            <AppButton
              text={<HighlightOffIcon />}
              onClick={() => handleImage("")}
              styles={style.reviewImageBtn}
            />
          </Box>
        )}
        <Typography>{formTextValues.grade.title}:</Typography>
        <Box sx={style.reviewRatingWrapper}>
          <AppRating
            max={10}
            defaultValue={grade}
            onChange={handleGrade}
            rating={grade}
            size={AppRatingSize.LARGE}
          />
          <AppButton
            onClick={() => handleGrade(0)}
            text={formTextValues.grade.buttonText}
            startIcon={<ThumbDownOffAltIcon />}
            styles={style.reviewZeroGradeBtn}
          />
        </Box>
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
              onDelete={() => handleDeleteCurrentTag(title)}
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
