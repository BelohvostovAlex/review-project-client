import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, TextField, Typography } from "@mui/material";
import { AppButton } from "../Buttons/AppButton";
import { AppButtonLink } from "../Buttons/AppButtonLink";
import { AuthGoogle } from "../AuthGoogle/AuthGoogle";
import { AppLoader } from "../AppLoader/AppLoader";

import { useAppSelector } from "../../hooks/useAppSelector";

import { AppPathes } from "../AppRouter/interfaces";
import { AuthFormProps, FormInputs } from "./interfaces";
import { makeStyles } from "./styles";

export const AuthForm: React.FC<AuthFormProps> = ({
  signUp = true,
  onFormSubmit,
}) => {
  const { isLoading, isAuth } = useAppSelector((state) => state.auth);
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

  if (isLoading) {
    return <AppLoader open={true} />;
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
      <Typography sx={style.fromTitle}>
        {signUp ? "Sign Up" : "Sign In"}
      </Typography>
      {signUp && (
        <TextField
          label="Username"
          placeholder="Alex Flexbox"
          variant="outlined"
          type="text"
          {...register("username", { required: "Username is required" })}
          sx={style.textField}
          error={!!errors.username}
          helperText={!!errors.username && errors.username?.message}
        />
      )}
      <TextField
        label="Email"
        placeholder="flexbox@gmail.com"
        variant="outlined"
        type="email"
        {...register("email", { required: "Email is required" })}
        sx={style.textField}
        error={!!errors.email}
        helperText={!!errors.email && errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 3,
            message: "Minimum 3 symbols",
          },
          maxLength: {
            value: 20,
            message: "Maximum 20 symbols",
          },
        })}
        sx={style.textField}
        error={!!errors.password}
        helperText={!!errors.password && errors.password?.message}
      />
      <AppButton
        type="submit"
        text={signUp ? "Sign Up" : "Sign In"}
        disabled={!isValid}
      />
      {!signUp && <AuthGoogle />}
      {!signUp ? (
        <>
          <Typography>Need an Account? Sign Up</Typography>
          <AppButtonLink
            path="/registration"
            text="Sign up"
            styles={style.signUpBtn}
          />
        </>
      ) : (
        <>
          <Typography>Already have an account? Sign In</Typography>
          <AppButtonLink
            path="/login"
            text="Sign In"
            styles={style.signUpBtn}
          />
        </>
      )}
    </Box>
  );
};
