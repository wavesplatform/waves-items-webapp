# @waves/waves-games

## Installation
```
npm i @waves/waves-games 
```

## Create an item
```ts
import { wavesItemsApi } from '@waves/waves-games'
const seed = 'my secret backend seed'

async function createItem() {
  const items = wavesItemsApi('T') //testnet, use 'W' for mainnet
  const item = await items
    .createItem({
      version: 1,
      quantity: 100,
      name: 'The sword of pain',
      imageUrl: 'https://i.pinimg.com/originals/02/c0/46/02c046b9ec76ebb3061515df8cb9f118.jpg',
      misc: {
        damage: 22,
        power: 13,
      },
    }).broadcast(seed)
  console.log(item)
}
createItem()
```

