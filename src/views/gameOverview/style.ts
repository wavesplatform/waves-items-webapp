import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex, Image, Text } from 'rebass'
import { height, HeightProps, themeGet } from 'styled-system'
import { IconButton } from '../../components/buttons'

export const GameOverviewContainer = styled(Flex)`
  height: 160px;
  overflow: hidden;
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

export const Cover = styled(Flex)`
  position: relative;
  flex: 1;
  height: 100%;
  
  align-items: center;
  justify-content: flex-start;
`
Cover.defaultProps = { pl: 'xl', pr: 'xxl' }

export const CoverImageUnderlay = styled(Box)`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
`

export const CoverContent = styled(Box)`
  position: relative;
  z-index: 1;
`

export const Info = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
`
Info.defaultProps = { p: 'xl' }
