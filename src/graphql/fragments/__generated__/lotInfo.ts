/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: lotInfo
// ====================================================

export interface lotInfo_seller {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  role: UserRole;
}

export interface lotInfo {
  __typename: "Lot";
  id: string;
  lotId: string;
  priceAsset: string;
  price: number;
  stock: number;
  seller: lotInfo_seller | null;
}
