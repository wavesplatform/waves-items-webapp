import React, { ComponentProps, ElementType, PropsWithChildren } from 'react'
import { ListItemContainer } from './style'
import { BaseProps } from 'rebass'

interface GameListItemProps extends BaseProps {
}

export const GameListItem = (props: PropsWithChildren<GameListItemProps> & ComponentProps<ElementType>) => {
  const { children, ...attrs } = props
  return (
    <ListItemContainer border='true' active='true' {...attrs}>
      {children}
    </ListItemContainer>
  )
}

GameListItem.defaultProps = {
  as: 'li',
}

interface IListItemProps extends BaseProps {
}

export const ListItem = (props: PropsWithChildren<IListItemProps> & ComponentProps<ElementType>) => {
  const { children, ...attrs } = props
  return (
    <ListItemContainer {...attrs}>
      {children}
    </ListItemContainer>
  )
}

ListItem.defaultProps = {
  as: 'li',
}
