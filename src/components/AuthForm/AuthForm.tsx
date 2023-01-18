import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, TextField, Typography } from "@mui/material";
import { AppButton } from "../Buttons/AppButton";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AppLoader } from "../AppLoader/AppLoader";
import { AppDivider } from "../AppDivider/AppDivider";

import { useAppSelector } from "../../hooks/useAppSelector";
import { authSelector } from "../../store/slices/authSlice/authSelectors";
import { useActions } from "../../hooks/useActions";
import { useAuthFormText } from "./config/useAuthFormText";

import { AUTH_URLS } from "../../mock/mockUrls";
import { AppPathes } from "../AppRouter/interfaces";
import { AuthFormProps, FormInputs } from "./interfaces";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { makeStyles } from "./styles";

export const AuthForm: FunctionComponent<AuthFormProps> = ({
  signUp = true,
  onFormSubmit,
}) => {
  const { isLoading, isAuth, user } = useAppSelector(authSelector);
  const { enteredViaSocial } = useActions();
  const authFormText = useAuthFormText(signUp);
  const style = makeStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { username, password, email } = data;
    onFormSubmit({ username, password, email });
    reset();
  };

  const googleLogin = () => {
    window.open(
      process.env.REACT_APP_SERVER_URL + AUTH_URLS.SIGNIN_WITH_GOOGLE,
      "_self"
    );
    enteredViaSocial(true);
  };

  const twitterLogin = () => {
    window.open(
      process.env.REACT_APP_SERVER_URL + AUTH_URLS.SIGNIN_WITH_TWITTER,
      "_self"
    );
    enteredViaSocial(true);
  };

  if (isLoading) {
    return <AppLoader open={true} />;
  }

  if (!isLoading && isAuth && user.role === 1) {
    return <Navigate to={AppPathes.ADMIN} />;
  }

  if (!isLoading && isAuth) {
    return <Navigate to={AppPathes.MAIN} />;
  }

  return (
    <Box
      component="form"
      sx={style.formWrapper}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography sx={style.formTitle}>{authFormText.title}</Typography>
      {signUp && (
        <TextField
          label={authFormText.username.label}
          placeholder={authFormText.username.placeholder}
          variant="outlined"
          type="text"
          {...register("username", {
            required: authFormText.username.required,
          })}
          sx={style.textField}
          error={!!errors.username}
          helperText={!!errors.username && errors.username?.message}
        />
      )}
      <TextField
        label={authFormText.email.label}
        placeholder={authFormText.email.placeholder}
        variant="outlined"
        type="email"
        {...register("email", {
          required: authFormText.email.required,
        })}
        sx={style.textField}
        error={!!errors.email}
        helperText={!!errors.email && errors.email?.message}
      />
      <TextField
        label={authFormText.password.label}
        type="password"
        variant="outlined"
        {...register("password", {
          required: authFormText.password.required,
          minLength: {
            value: 3,
            message: authFormText.password.minLength,
          },
          maxLength: {
            value: 20,
            message: authFormText.password.maxLength,
          },
        })}
        sx={style.textField}
        error={!!errors.password}
        helperText={!!errors.password && errors.password?.message}
      />
      <AppButton
        type="submit"
        text={authFormText.submitBtn}
        disabled={!isValid}
        styles={style.submitBtn}
      />
      {!signUp && <></>}
      {!signUp ? (
        <>
          <Typography sx={style.subText}>{authFormText.needAcc}</Typography>
          <AppButtonLink
            path={AppPathes.REGISTRATION}
            text={authFormText.signUp}
            styles={style.signUpBtn}
          />
          <AppDivider />
          <AppButton
            startIcon={<GoogleIcon />}
            text={authFormText.googleBtn}
            onClick={googleLogin}
            styles={style.socialBtn}
          />
          <AppButton
            startIcon={<TwitterIcon />}
            text={authFormText.twitterBtn}
            onClick={twitterLogin}
            styles={style.socialBtn}
          />
        </>
      ) : (
        <>
          <Typography sx={style.subText}>{authFormText.alreadyAcc}</Typography>
          <AppButtonLink
            path={AppPathes.LOGIN}
            text={authFormText.singIn}
            styles={style.signUpBtn}
          />
        </>
      )}
    </Box>
  );
};
