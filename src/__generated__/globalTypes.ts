/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  GAME = "GAME",
  TEST = "TEST",
  USER = "USER",
}

export interface ItemFilter {
  gameAddress?: string | null;
  searchString?: string | null;
}

export interface SigninUser {
  address: string;
  publicKey: string;
  sign: string;
  name?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
