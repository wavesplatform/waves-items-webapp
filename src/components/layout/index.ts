import styled from 'styled-components'
import { Box } from 'rebass'
import { themeGet } from 'styled-system'

export const Grid = styled(Box)`
  display: grid;
`

export const Container = styled(Box)`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`
Container.defaultProps = { pl: 'md', pr: 'md' }

export const ViewWrapper = styled(Box)`
`
ViewWrapper.defaultProps = { pt: 'md', pb: 'md' }

export const ViewGrid = styled(Grid)`
  grid-template-columns: 16rem 1fr;
  grid-row-gap: 0;
  grid-column-gap: ${themeGet('space.md')}px;
`

export const ViewSide = styled(Box)`
  background: ${themeGet('colors.grays.8')};
`

export const ViewContent = styled(Box)`
`
