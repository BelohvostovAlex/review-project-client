export interface authServiceSignInInput {
  email: string;
  password: string;
}

export interface authServiceSignUpInput extends authServiceSignInInput {
  username: string;
}
