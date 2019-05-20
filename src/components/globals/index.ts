import styled, { css } from 'styled-components'
import { Heading } from 'rebass'
import { themeGet } from 'styled-system'

export const truncate = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export const inheritLink = css`
  text-decoration: none;
  color: inherit;
`

export const fontStack = css`
  font-family: ${themeGet('fonts.sans')};
`

export const monoStack = css`
  font-family: ${themeGet('fonts.mono')};
`

export const H1 = styled(Heading)`
  font-size: 1.5rem;
`
H1.defaultProps = { as: 'h1' }

export const H2 = styled(Heading)`
  font-size: 1.25rem;
`
H2.defaultProps = { as: 'h2' }

export const H3 = styled(Heading)`
  font-size: 1rem;
`
H3.defaultProps = { as: 'h3' }

export const H4 = styled(Heading)`
  font-size: .875rem;
`
H4.defaultProps = { as: 'h4' }

export const H5 = styled(Heading)`
  font-size: .75rem;
`
H5.defaultProps = { as: 'h5' }

export const H6 = styled(Heading)`
  font-size: .675rem;
  text-transform: uppercase;
`
H6.defaultProps = { as: 'h6' }
