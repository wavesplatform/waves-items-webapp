import React, { PropsWithChildren } from 'react'
import { Active, Base, IconBox, LinkWrapper, Shift, Title } from './style'
import { Icon } from '../../icon'

type TProps = {
  url: string
}

export const DiscordWidget = (props: PropsWithChildren<TProps>) => (
  <LinkWrapper href={props.url} target='_blank'>
    <Shift>
      <Base>
        <IconBox><Icon glyph={'chat'} fontSize={24}/></IconBox>
      </Base>
      <Active>
        <IconBox><Icon glyph={'discord'} fontSize={24}/></IconBox>
        <Title lineHeight={1} fontSize={'sm'} pr={'base'}>{props.children}</Title>
      </Active>
    </Shift>
  </LinkWrapper>
)
