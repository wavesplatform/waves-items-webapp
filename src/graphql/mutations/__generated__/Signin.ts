/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SigninUser } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Signin
// ====================================================

export interface Signin_signin_user {
  id: string;
  address: string;
  name: string | null;
  email: string | null;
}

export interface Signin_signin {
  token: string;
  user: Signin_signin_user;
}

export interface Signin {
  signin: Signin_signin;
}

export interface SigninVariables {
  input: SigninUser;
}
