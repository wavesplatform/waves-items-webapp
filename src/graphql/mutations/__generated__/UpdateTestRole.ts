/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateTestRole
// ====================================================

export interface UpdateTestRole_updateTestRole {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface UpdateTestRole {
  updateTestRole: UpdateTestRole_updateTestRole;
}

export interface UpdateTestRoleVariables {
  enable: boolean;
}
