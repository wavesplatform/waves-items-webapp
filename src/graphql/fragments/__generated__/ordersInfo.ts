/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ordersInfo
// ====================================================

export interface ordersInfo_pair {
  amountAsset: string;
  priceAsset: string;
}

export interface ordersInfo_bids {
  amount: number;
  price: number;
}

export interface ordersInfo_asks {
  amount: number;
  price: number;
}

export interface ordersInfo {
  pair: ordersInfo_pair | null;
  bids: ordersInfo_bids[] | null;
  asks: ordersInfo_asks[] | null;
}
