import styled from 'styled-components'
import { Container, Section } from '../../components/layout'
import { Box } from 'rebass'
import { H1, H2 } from '../../components/globals'
import { themeGet } from 'styled-system'

export const HomeContainer = styled(Box)`
  ${H2} {
    font-size: 1.5rem;
    margin-bottom: ${themeGet('space.lg')}px;
  }
`

export const SearchSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
`
SearchSection.defaultProps = {
  ...SearchSection.defaultProps,
  py: 'xxl',
}

export const Title = styled(H1)`
  //text-transform: uppercase;
  text-align: center;
`

export const ItemsSection = styled(Section)`
  background: linear-gradient(
      15deg,
      #0d1424 0%, 
      ${themeGet('bg.default')} 40%,
      ${themeGet('bg.default')} 100%
    );
`
ItemsSection.defaultProps = {
  ...ItemsSection.defaultProps,
  mb: 0,
  pb: 6,
}

export const SearchWrapper = styled(Box)`
  max-width: 840px;
  width: 100%;
  margin: 0 auto;
`

export const ItemsContainer = styled(Box)`
  display: block;
  position: relative;
`

export const ItemsWrapper = styled(Box)`
  position: relative;
  margin: 0 -1280px;
  overflow-x: hidden;
`

export const ItemsWrapperInner = styled(Container)`
  margin: 0 auto;
  width: 1280px;
  min-height: 240px;
`
