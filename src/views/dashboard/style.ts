import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import { Button, IconButton } from '../../components/buttons'
import { themeGet } from 'styled-system'
import { Container, ViewContainer } from '../../components/layout'

export const FiltersContainer = styled(Box)`
`

export const ItemContainer = styled(Container)`
  max-width: 512px;
`

export const SettingsContainer = styled(Box)`
`

export const SettingsFormWrapper = styled(Box)`
  max-width: 420px;
`

export const GameOverview = styled(Box)`
  display: flex;
  position: relative;
  min-height: 128px;
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.grays.7')};
`
GameOverview.defaultProps = {
  py: 'lg',
}

export const GameOverviewContainer = styled(ViewContainer)`
  position: relative;
`

export const LoadMoreButton = styled(Button).attrs({ size: 'lg' })`
  width: 100%;
  display: block;
`

export const RemoveButton = styled(IconButton).attrs({
  glyph: 'close',
})`
  display: block;
  opacity: .5;
  //transform: scale(.9);
  width: 34px;
  height: 34px;
`

export const Actions = styled(Flex)`
  align-items: center;
`

export const EditButton = styled(IconButton).attrs({
  glyph: 'mode_edit',
})`
  position: absolute;
  z-index: 1;
  top: ${themeGet('space.base')}px;
  right: ${themeGet('space.base')}px;
  opacity: .8;
`
EditButton.defaultProps = {
  ...EditButton.defaultProps,
}
