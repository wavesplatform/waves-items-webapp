import React, { PropsWithChildren } from 'react'
import { StyledNullState, StyledNullStateProps, Title } from './style'
import { Icon } from '../icon'
import { Text } from 'rebass'

type TNullStateProps = StyledNullStateProps & {
  heading?: string
  message?: string
  icon?: string
}

export const NullState = (props: PropsWithChildren<TNullStateProps>) => (
  // @ts-ignore
  <StyledNullState {...props}>
    {props.icon && <Icon glyph={props.icon} fontSize={'2.4rem'} color={'grays.1'} mb={'sm'}/>}
    {props.heading && <Title color={'grays.1'} mb={'sm'}>{props.heading}</Title>}
    {props.message && <Text color={'placeholder'} width={1} textAlign={'center'}>{props.message}</Text>}
    {props.children}
  </StyledNullState>
)
