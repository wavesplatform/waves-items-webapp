import React from 'react'
import styled from 'styled-components'
import { Box } from 'rebass'

export const Navbar = styled(Box)`
  display: flex;
  align-items: center;
  min-height: 4rem;
  border-bottom: 1px solid;
`

Navbar.defaultProps = {
  as: 'nav',
  paddingLeft: 2,
  paddingRight: 2,
}
