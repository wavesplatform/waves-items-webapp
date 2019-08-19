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

export interface GameInfo {
  name?: string | null;
  url?: string | null;
  description?: string | null;
  iconFile?: any | null;
  pageFile?: any | null;
}

export interface ItemFilter {
  gameAddress?: string | null;
  searchString?: string | null;
  inclusions?: string[] | null;
  creatorRole?: string | null;
}

export interface SigninUser {
  address: string;
  publicKey: string;
  sign: string;
  webappHost: string;
}

export interface UserInfo {
  name?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
