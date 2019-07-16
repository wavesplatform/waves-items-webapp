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
Container.defaultProps = { ...Container.defaultProps, px: 'lg' }

export const Section = styled(Box)`
`
Section.defaultProps = { ...Section.defaultProps, mb: 'lg' }

export const ViewWrapper = styled(Box)`
`
ViewWrapper.defaultProps = { ...ViewWrapper.defaultProps, pt: 'lg', pb: 'lg' }

export const ViewGrid = styled(Grid)`
  grid-template-columns: 16rem 1fr;
  grid-gap: 0;
`

export const ViewSide = styled(Box)`
  border-right: 1px solid ${themeGet('colors.grays.7')};
  overflow: hidden;
`

export const ViewContainer = styled(Container)`
  max-width: 1280px;
`

export const ViewContent = styled(Box)`
`
ViewContent.defaultProps = { p: 'lg' }
