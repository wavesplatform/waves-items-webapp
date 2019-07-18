# Tokenizing A Game

## **Abstract**

Items tokenisation is one of the most common blockchain use cases, but you still may ask why do you need it and how to tokenise your game or real-world assets. In this tutorial we will cover two main questions:

1) The motivation of tokenisation of games

2) How to tokenise your in-game items and integrate your game with the blockchain

## **Motivation and Purposes**

In game tokenisation allows to change player-player and player-developer interactions and make them more interesting and attractive for players due to the next reasons:

1. Ownership of the game was given to the players, they can be sure that items belong to them and they are free to do everything with it. Players want to invest their time in a game, not to spend.
2. It allows to buy and sell cards in-game with the security of blockchain, smart contracts there can guarantee that no one cheats (other players or game developers).
3. Game economics become more transparent for players and motivates them to invest more time.
4. Game developers can implement new monetization models like taxation of p2p trades. Player-to-player trades of in-game items are common and nutty for players. Some game developers want to ban that kind of interactions, but it may be better to tame such activities and offer to users marketplaces to trade. Game developers can benefit from it as well by using taxation models.

## **Specification**

In this article, we will show an example of tokenization using card game [Shadow Era](http://www.shadowera.com/). Let's say we have different cards in the game, for instance, there are more than 800 types of cards in Shadow Era. Making them tokenized gives the benefits above. Let's start with some best practices of in-game tokenization we've discovered after talking with 20+ different projects:

1. Do not tokenise everything. Tokenisation makes sense only for unique and valuable items.
2. Make players onboarding as simple as even possible. For example, Shadow Era generates seed phrases for all users and it makes a lot of sense, because it removes at least one barrier for players. The only important thing to remember - tokenization is valuable only when users have access to their seed/private key.

In this example, we will tokenize cards using [Waves Games SDK](https://www.npmjs.com/package/@waves/waves-games). It allows tokenizing items using DataTransactions in Waves Blockchain. There are Non-Fungible Tokens  feature on the Testnet now, in the next part we'll show how it works and how to tokenize using NFT, but this article is about tokenization using DataTransactions and Games SDK.

## Create in-game items

### Using console

Before starting make sure you have installed node.js. Next we have to install waves-games npm package by following command: 

    npm i -g @waves/waves-games

Waves-games package allows to use it right from the console with [npx](https://www.npmjs.com/package/npx). So let’s test how it works - let's create 100 items with the name `The sword of pain` and with link to image `https://transfer.sh/2PfWT/the-sward-of-pain.jpg`.

Using npx we can run the following command to create items in interactive mode:

    npx @waves/waves-games

It run a wizard which will guide to your first items through the next steps:

1) **Choose the environment** – there are two options to issue items, in the mainnet or [testnet](https://docs.wavesplatform.com/en/blockchain/test-network.html). For development purposes use testnet only.

2) **Creation mode** – right now the library allows to create items from the console only in wizard mode, but in the future we will add two more options. 

3) **Item name**  – in our example it is `The sword of pain`, but in general it is some arbitrary string

4) I**mage URL** – URL to an image for this item type. Please note, all images are stored off-chain, we store only full URL in the blockchain.  

5) **Quantity** – 100 in our example, the maximum value is 99999999999 (almost one billion).

6) **Seed file path** – path to a file which contains a seed phrase of item owner. All the tokens should be issued from some blockchain account, usually it is an account of game developer. To issue a token (that is to say to send a transaction) we have to sign it using [seed phrase](https://docs.wavesplatform.com/en/waves-client/frequently-asked-questions-faq/account-management/seed-phrase.html). 

Let's all the steps in action:

<video width="100%" controls>
  <source src="/bca9aa0d-b420-4953-924a-3a3854abba8a.mov" type="video/mp4">
  Your browser does not support the video tag.
</video> 

The command above will create items in the blockchain, which means:

1. An account with the seed from the file `./seed.txt`, which equals to an address `3N7DEYXnWwAjTG17Gq9FvDVLrTdTw2hCVLo` will issue a token. Parameters like `name`, `quantity` are part of asset data in the blockchain.
2. It will store additional data like imageUrl about items in DataTransactions, parameters can be found in accounts state. 

The most important thing to note in the end is an item ID. This item ID is used to get data from the blockchain, for example item created above in the example can be found in the [explorer](https://wavesexplorer.com/testnet/tx/Ez22Rxug3FaMbHNpNxqCs4vuQ1sN6EcPXoWLcQ7b7HgM) by the ID.  

### Using code

We also can create items in our JavaScript or TypeScript code:


```js
async function howToCreateAnItem(creatorSeed) {

  const { Items, ChainId } = require('@waves/waves-games');
  

  const items = Items(ChainId.Testnet)
  const request = items.create({ amount: 100, version: 1, name: 'The sword of pain', imageUrl: 'img_url', misc: {}, isLimited: true }, creatorSeed)
  const item = await request.execute()

}
```

The main difference between code and console wizard are:

1) Along with TESTNET and MAINNET you're able to set custom chains as well in the items config.

2)  You can add `misc` object to your items, this object contains some game specific data like power for the sward. 

3) You have to provide seed phrase itself, not a path to the file with the phrase.

Items in Games SDK have an interface like below: 

```js
Item<T = any> {
  id: string,
  name: string,
  quantity: LONG,
  gameId: string,
  imageUrl: string,
  reissuable: boolean,
  timestamp?: number
  misc: T,
}
```

So we have an account (usually an account of the game developer) which issues all tokens and stores some arbitrary data about items. Let's see how it works in the blockchain. At item creation time SDK makes 2 transactions - Issue transaction and Data Transaction. You can find their JSON body below: 

```json
{
  "id": "FsysLebpZXZy356QJneiK97xkTBJR5zrdM1Wgi9tmfHh",
  "type": 3,
  "version": 2,
  "senderPublicKey": "5YfkxmnWWpJeVAxG3HhjQBHYew4ovAK9zAS6ZkeiUEaS",
  "name": "ITEM",
  "description": "",
  "quantity": 100,
  "decimals": 0,
  "reissuable": false,
  "fee": 100000000,
  "timestamp": 1551792188135,
  "chainId": 84,
  "proofs": ["4Gt1fEvmYZq5z5bSFacvtRsXhKDb1smUV6sjbRdkSa6UGGxhS5uN4GrWTWrk8NWT8Rif4wZdQR9GGWTKtbVfCUAV"],
}
  ```
  ```json
{
  "id": "773hbAnxL3vKdh2rgagpfKqptDX5E4nFbxuswUPivMX8",
  "type": 12,
  "version": 1,
  "senderPublicKey": "5YfkxmnWWpJeVAxG3HhjQBHYew4ovAK9zAS6ZkeiUEaS",
  "fee": 100000,
  "timestamp": 1551792188156,
  "proofs": [
  "5EMi8GguyqWUEe9RtcHjmk6dmpGd72ci54LHrvgKMgpajprfD3AqeVy37KDiCbzWLreVJnHKZ1mPJD6BbTfeY6Fz"
  ],
  "data": [
    {
      "type": "string",
      "key": "FsysLebpZXZy356QJneiK97xkTBJR5zrdM1Wgi9tmfHh",
      "value": "{\"version\":0, 
                \"imageUrl\":\"http://test-image.jpeg\",
                \"name\":\"Sword of pain\",
                \"misc\":{\"power\":10}
              }"
    }
  ]
}
  ```

As you may see Data transaction contains an array of key-value pairs in `data` array, the value is an escaped JSON data. You can parse that data to read item properties: 

```json
{
  "version": 1,
  "imageUrl": "http://test-image.jpeg",
  "name": "Sword of pain",
  "misc": {
    "power": 10
  }
}
```

## Connect users accounts in the game and blockchain

The best way to integrate into a game is to put the blockchain under the hood and to hide from the players all blockchain stuff because for the majority of players the blockchain is unknown tech thingy. We can ask them to create accounts in the blockchain, but it would be another barrier for them, so, let's create blockchain accounts on behalf of the users. We can do it easily using `@waves/waves-transactions` npm package. First, we have to install it:

```
npm i --save @waves/waves-transactions
```

Now we can create a seed phrase for each user and store it in the games' database like below (in case of MongoDB):

```ts
import {seedUtils} from '@waves/waves-transactions'

const users = UsersCollection.get({}) // an abstract example how to get all users from the database

users.forEach((user) => {
  const seedPhrase = seedUtils.generateNewSeed(15)
  UsersCollection.update({id: user.id, seed: seedPhrase})  // an abstract example how to update user info
})
```

The example above allows to make a one-to-one correspondence between a player and its account in the blockchain:

player in the game <=> seed phrase <=> account address in the blockchain

## Retrieve data about items from the blockchain

All games have a user interface for players and this UI must show how many items belong to a player and some details about each of them. The very first step to get that data is to get users' address from a seed phrase, to do it we will use `@waves/waves-transactions` library:

```ts
  import {address} from '@waves/waves-transactions'

  const usersAddress = address(seedPhraseHere, 'T') // second parameter is a netwok byte: T for TESTNET and W for MAINNET 
```

With users' address, we can get data about all assets on the account using REST API. Waves provides public nodes for TESTNET and MAINNET at [https://testnodes.wavesnodes.com and  https://nodes.wavesplatform.com](https://nodes.wavesplatform.com/) respectively. 


::: tip
There is an endpoint [`/assets/balance`](https://testnodes.wavesnodes.com/api-docs/index.html#!/assets/balances_1) which allows to get a list of assets on users' account, [here is](https://testnodes.wavesnodes.com/assets/balance/3N7DEYXnWwAjTG17Gq9FvDVLrTdTw2hCVLo) an example.
:::

```ts
import {address} from '@waves/waves-transactions'

const usersSeedPhrase = 'MY_COOL_SEED'
const usersAddress = address(usersSeedPhrase, 'T')
const balancesUrl = `https://testnodes.wavesnodes.com/assets/balance/${usersAddress}`;
fetch(balanceUrl)
  .then(res => res.json())
  .then(jsonData => {
    console.log(jsonData);
  })
  .catch(err => {
    console.log(err);
  });
```

The code above will allow to get data about users' portfolio, but not about items, so finalise the solution let's get get item details for each asset in users' portfolio:

```js
const { Items, ChainId } = require('@waves/waves-games');

const items = Items(ChainId.Testnet)

jsonData.balances.forEach((asset) => {
  const item = await items.getItem(asset.assetId, false)
  console.log(item)
})
```

Now we have all the data about users' portfolio and item details and we can show it to the users in a UI.

If you still have questions about tools or the best ways of blockchain integration - feel free to ask (somewhere)

In the next tutorial we will explain how to use Non-Fungible Tokens with Games SDK.