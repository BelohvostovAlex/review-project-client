import {
  authServiceSignInInput,
  authServiceSignUpInput,
} from "../../services/authService/interfaces";

type onFormSubmit =
  | ((data: authServiceSignInInput) => void | undefined)
  | ((data: authServiceSignUpInput) => void | undefined);

export interface AuthFormProps {
  signUp?: boolean;
  onFormSubmit: onFormSubmit;
}

export type FormInputs = {
  email: string;
  password: string;
  username: string;
};
