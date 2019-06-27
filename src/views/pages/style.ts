import { Box } from 'rebass'
import styled from 'styled-components'
import { Container } from '../../components/layout'
import { themeGet } from 'styled-system'

export const PageContainer = styled(Container)`
  max-width: 1280px;
`

export const Content = styled(Box)`
  li {
    color: ${themeGet('colors.grays.2')};
  }
`
