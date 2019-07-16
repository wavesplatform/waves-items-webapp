/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SigninUser, UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Signin
// ====================================================

export interface Signin_signin_user {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface Signin_signin {
  __typename: "AuthPayload";
  token: string;
  user: Signin_signin_user;
}

export interface Signin {
  signin: Signin_signin;
}

export interface SigninVariables {
  input: SigninUser;
}
