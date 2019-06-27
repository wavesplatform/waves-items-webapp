/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ItemQuery
// ====================================================

export interface ItemQuery_item_game {
  __typename: "User";
  id: string;
  address: string;
  name: string | null;
  image: any | null;
  totalItems: number | null;
}

export interface ItemQuery_item_pair {
  __typename: "AmountPricePair";
  amountAsset: string;
  priceAsset: string;
}

export interface ItemQuery_item_bids {
  __typename: "AmountPrice";
  amount: string;
  price: string;
}

export interface ItemQuery_item_asks {
  __typename: "AmountPrice";
  amount: string;
  price: string;
}

export interface ItemQuery_item {
  __typename: "ItemView";
  id: string;
  assetId: string;
  name: string;
  quantity: number;
  reissuable: boolean;
  timestamp: any;
  imageUrl: string;
  game: ItemQuery_item_game;
  pair: ItemQuery_item_pair | null;
  bids: ItemQuery_item_bids[] | null;
  asks: ItemQuery_item_asks[] | null;
}

export interface ItemQuery {
  item: ItemQuery_item | null;
}

export interface ItemQueryVariables {
  assetId: string;
}
