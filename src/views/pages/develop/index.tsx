import React from 'react'
import { Content, PageContainer } from '../style'
import { Code, CodeBlock, H1, H2, H3, Paragraph } from '../../../components/globals'
import { Link } from 'rebass'

interface IProps {
}

export const Develop = (props: IProps) => {
  return (
    <PageContainer>
      <Content>
        <H1>Tokenizing A Game</H1>
        <H2>Abstract</H2>
        <Paragraph>
          Items tokenisation is one of the most common blockchain use cases, but you still may ask why do you need it
          and how to tokenise your game or real-world assets. In this tutorial we will cover two main questions:
        </Paragraph>
        <ol>
          <li>The motivation of tokenisation of games</li>
          <li>How to tokenise your in-game items and integrate your game with the blockchain</li>
        </ol>
        <H2>Motivation and Purposes</H2>
        <Paragraph>
          In game tokenisation allows to change player-player and player-developer interactions and make them more
          interesting and attractive for players due to the next reasons:
        </Paragraph>
        <ol>
          <li>Ownership of the game was given to the players, they can be sure that items belong to them and they are
            free to do everything with it. Players want to invest their time in a game, not to spend.
          </li>
          <li>It allows to buy and sell cards in-game with the security of blockchain, smart contracts there can
            guarantee that no one cheats (other players or game developers).
          </li>
          <li>Game economics become more transparent for players and motivates them to invest more time.</li>
          <li>Game developers can implement new monetization models like taxation of p2p trades. Player-to-player
            trades
            of in-game items are common and nutty for players. Some game developers want to ban that kind of
            interactions,
            but it may be better to tame such activities and offer to users marketplaces to trade. Game developers can
            benefit from it as well by using taxation models.
          </li>
        </ol>
        <H2>Specification</H2>
        <Paragraph>
          In this article, we will show an example of tokenization using card game Shadow Era. Let's say we have
          different cards in the game, for instance, there are more than 800 types of cards in Shadow Era. Making them
          tokenized gives the benefits above. Let's start with some best practices of in-game tokenization we've
          discovered after talking with 20+ different projects:
        </Paragraph>
        <ol>
          <li>Do not tokenise everything. Tokenisation makes sense only for unique and valuable items.</li>
          <li>Make players onboarding as simple as even possible. For example, Shadow Era generates seed phrases for
            all users and it makes a lot of sense, because it removes at least one barrier for players. The only
            important thing to remember - tokenization is valuable only when users have access to their seed/private
            key.
          </li>
        </ol>
        <Paragraph>
          In this example, we will tokenize cards using Waves Games SDK. It allows tokenizing items using
          DataTransactions in Waves Blockchain. There are Non-Fungible Tokens feature on the Testnet now, in the next
          part we'll show how it works and how to tokenize using NFT, but this article is about tokenization using
          DataTransactions and Games SDK.
        </Paragraph>
        <H2>Create in-game items</H2>
        <H3>Using console</H3>
        <Paragraph>
          Before starting make sure you have installed node.js. Next we have to install waves-games npm package by
          following command:
        </Paragraph>
        <CodeBlock>
          npm i -g @waves/waves-games
        </CodeBlock>
        <Paragraph>
          Waves-games package allows to use it right from the console with <Link
          href='https://www.npmjs.com/package/npx' target='_blank'>npx</Link>. So
          let’s test how it works - let's create 100 items with the name <Code>The sword of pain</Code> and with link to
          image <Code>https://transfer.sh/2PfWT/the-sward-of-pain.jpg</Code>.
          Using npx we can run the following command to create items in interactive mode:
        </Paragraph>
        <CodeBlock>
          npx @waves/waves-games
        </CodeBlock>
        <Paragraph>
          It run a wizard which will guide to your first items through the next steps:
        </Paragraph>
        <ol>
          <li><b>Choose the environment</b> – there are two options to issue items, in the mainnet or
            [testnet](https://docs.wavesplatform.com/en/blockchain/test-network.html). For development purposes use
            testnet only.
          </li>
          <li><b>Creation mode</b> – right now the library allows to create items from the console only in wizard
            mode, but in the future we will add two more options.
          </li>
          <li><b>Item name</b> – in our example it is `The sword of pain`, but in general it is some arbitrary string
          </li>
          <li><b>Image URL</b> – URL to an image for this item type. Please note, all images are stored off-chain, we
            store only full URL in the blockchain.
          </li>
          <li><b>Quantity</b> – 100 in our example, the maximum value is 99999999999 (almost one billion).</li>
          <li><b>Seed file path</b> – path to a file which contains a seed phrase of item owner. All the tokens should
            be issued from some blockchain account, usually it is an account of game developer. To issue a token (that
            is to say to send a transaction) we have to sign it using <Link
              href='https://docs.wavesplatform.com/en/waves-client/frequently-asked-questions-faq/account-management/seed-phrase.html'
              target='_blank'>seed phrase</Link>.
          </li>
        </ol>
        <Paragraph>
          Let's all the steps in action:
          VIDEO
        </Paragraph>
        <Paragraph>
          The command above will create items in the blockchain, which means:
        </Paragraph>
        <ol>
          <li>An account with the seed from the file <Code>./seed.txt</Code>, which equals to an
            address <Code>3N7DEYXnWwAjTG17Gq9FvDVLrTdTw2hCVLo</Code> will issue a token. Parameters
            like <Code>name</Code>, <Code>quantity</Code> are part of asset data in the blockchain.
          </li>
          <li>It will store additional data like <Code>imageUrl</Code> about items in <i>DataTransactions</i>,
            parameters can be found in accounts state.
          </li>
        </ol>
        <Paragraph>
          The most important thing to note in the end is an item ID. This item ID is used to get data from the
          blockchain, for example item created above in the example can be found in the explorer by the ID.
        </Paragraph>
        <H3>Using code</H3>
        <Paragraph>
          We also can create items in our JavaScript or TypeScript code:
        </Paragraph>
        <CodeBlock>{
          `async function howToCreateAnItem(creatorSeed) {
  const { Items, ChainId } = require('@waves/waves-games');

  const items = Items(ChainId.Testnet)
  const request = items.create({ amount: 100, version: 1, name: 'The sword of pain', imageUrl: 'img_url', misc: {}, isLimited: true }, creatorSeed)
  const item = await request.execute()
}
`
        }</CodeBlock>
      </Content>
    </PageContainer>
  )
}

export default Develop
