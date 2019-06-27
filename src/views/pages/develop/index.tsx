import React from 'react'
import { Content, PageContainer } from '../style'
import { Code, CodeBlock, H1, H2, H3, Paragraph } from '../../../components/globals'

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
          <ol>
            <li>The motivation of tokenisation of games</li>
            <li>How to tokenise your in-game items and integrate your game with the blockchain</li>
          </ol>
        </Paragraph>
        <H2>Motivation and Purposes</H2>
        <Paragraph>
          In game tokenisation allows to change player-player and player-developer interactions and make them more
          interesting and attractive for players due to the next reasons:

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
        </Paragraph>
        <H2>Specification</H2>
        <Paragraph>
          In this article, we will show an example of tokenization using card game Shadow Era. Let's say we have
          different cards in the game, for instance, there are more than 800 types of cards in Shadow Era. Making them
          tokenized gives the benefits above. Let's start with some best practices of in-game tokenization we've
          discovered after talking with 20+ different projects:
          <ol>
            <li>Do not tokenise everything. Tokenisation makes sense only for unique and valuable items.</li>
            <li>Make players onboarding as simple as even possible. For example, Shadow Era generates seed phrases for
              all users and it makes a lot of sense, because it removes at least one barrier for players. The only
              important thing to remember - tokenization is valuable only when users have access to their seed/private
              key.
            </li>
          </ol>
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
          <CodeBlock>
            npm i -g @waves/waves-games
          </CodeBlock>
          Waves-games package allows to use it right from the console with [npx](https://www.npmjs.com/package/npx). So
          let’s test how it works - let's create 100 items with the name <Code>The sword of pain</Code> and with link to
          image <Code>https://transfer.sh/2PfWT/the-sward-of-pain.jpg</Code>.
        </Paragraph>
      </Content>
    </PageContainer>
  )
}

export default Develop
