import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'
import { Box } from 'rebass'
import { Link } from 'react-router-dom'

type LogoProps = SpaceProps

const StyledLogo = styled(Box)<LogoProps>`
  display: flex;
  text-decoration: none;
  height: 2rem;
  align-items: center;
`

export const Logo: FunctionComponent<LogoProps> = props => {
  return (
    <Link to={'/'}>
      <StyledLogo {...props}>
        Items Store
      </StyledLogo>
    </Link>
  )
}
