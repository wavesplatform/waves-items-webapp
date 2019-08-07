/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserInfo, UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserInfo
// ====================================================

export interface UpdateUserInfo_updateUserInfo {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface UpdateUserInfo {
  updateUserInfo: UpdateUserInfo_updateUserInfo;
}

export interface UpdateUserInfoVariables {
  input: UserInfo;
}
