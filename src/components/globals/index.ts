import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex, Text, TextProps } from 'rebass'
import { borders, BordersProps, color, height, HeightProps, space, SpaceProps, themeGet, width } from 'styled-system'
import { Link } from 'react-router-dom'

export const hexa = (hex: string, alpha: string | number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha >= 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

export const shadow = {
  low: '0 2px 8px',
  mid: '0 4px 12px',
  high: '0 8px 16px',
}

export const truncate = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  min-width: 0;
`

export const fontStack = css`
  font-family: ${themeGet('fonts.sans')};
`

export const monoStack = css`
  font-family: ${themeGet('fonts.mono')};
`

export const H1 = styled(Text)`
  font-size: 1.5rem;
`
H1.defaultProps = { as: 'h1' }

export const H2 = styled(Text)`
  font-size: 1.25rem;
`
H2.defaultProps = { as: 'h2' }

export const H3 = styled(Text)`
  font-size: 1rem;
`
H3.defaultProps = { as: 'h3' }

export const H4 = styled(Text)`
  font-size: .875rem;
`
H4.defaultProps = { as: 'h4' }

export const H5 = styled(Text)`
  font-size: .75rem;
`
H5.defaultProps = { as: 'h5' }

export const H6 = styled(Text)`
  font-size: .675rem;
  text-transform: uppercase;
`
H6.defaultProps = { as: 'h6' }

export const Paragraph = styled(Text)`
`
Paragraph.defaultProps = { as: 'p', color: 'grays.2' }

export const Color = styled(Text)`
`
Color.defaultProps = { as: 'span' }

export const Badge = styled(Text)<TextProps & BordersProps>`
  display: inline-block;
  vertical-align: middle;
  
  ${borders}
`
Badge.defaultProps = {
  ...Badge.defaultProps,
  as: 'span',
  p: 'xs',
  bg: 'default',
  fontSize: 'sm',
  color: 'black',
  borderRadius: 'sm',
  lineHeight: 0,
}

export const Code = styled(Text)<TextProps & BordersProps>`
  display: inline-block;
  
  ${borders}
`
Code.defaultProps = {
  ...Code.defaultProps,
  as: 'code',
  p: 'xs',
  bg: 'bg.code',
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'default',
  borderRadius: 'sm',
}

export const CodeBlock = styled(Code)`
  display: block;
`
CodeBlock.defaultProps = {
  ...CodeBlock.defaultProps,
  as: 'pre',
  p: 'lg',
  fontSize: 'base',
}

export const Form = styled.form`
`

export const Actions = styled(Flex)`
  width: 100%;
  border-top: 1px solid ${themeGet('colors.grays.7')};
`
Actions.defaultProps = {
  ...Actions.defaultProps,
  pt: 'lg',
  mt: 'lg',
  justifyContent: 'flex-end',
}

export const Small = styled(Text)`
  font-size: ${themeGet('fontSizes.sm')}px;
`
Small.defaultProps = { as: 'span' }

export const Table = styled.table<BoxProps>`
  border-spacing: 0;
  border-collapse: collapse;
  width: inherit;
  
  ${space}
  ${width}
`

export const TableHeader = styled.thead<BoxProps & BordersProps>`
  ${color}
  ${borders}
`
TableHeader.defaultProps = {
  color: 'grays.4',
  borderBottom: '1px solid',
  borderColor: 'grays.7',
}

export const TableBody = styled.tbody`
`

export const TableRow = styled.tr`
  height: 100%;
  
  &:nth-child(2n) {
    background: ${themeGet('colors.grays.8')};
  }
`

export const TableCell = styled.td<BoxProps>`
  margin: 0;
  padding: 0;
  font-weight: inherit;
  text-align: inherit;
  height: 100%;
  vertical-align: middle;
  
  ${space}
  ${width}
`
TableCell.defaultProps = {
  px: 'sm',
  py: 'sm',
}

export const Tabs = styled(Box)`
  border-bottom: 1px solid ${themeGet('colors.grays.7')};
`

export const TabsList = styled(Box)<BoxProps & HeightProps>`
  position: relative;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  margin-bottom: 0;
  list-style: none;
  padding: 0;
  
  ${height}
`
TabsList.defaultProps = {
  ...TabsList.defaultProps,
  as: 'ul',
}

export interface TabItemProps extends BoxProps {
  isActive?: boolean
}

export const TabItem = styled(Box)<TabItemProps>`
  cursor: pointer;
  ${props => props.isActive && css`
    background: ${themeGet('colors.grays.8')};
  `};
`
TabItem.defaultProps = { as: 'li' }

export const TabLink = styled(Link)<SpaceProps>`
  display: flex;
  height: 100%;
  align-items: center;
  
  &:hover,
  &:focus {
    background: ${themeGet('colors.grays.8')};
  }
  
  ${space}
`
TabLink.defaultProps = { px: 'lg' }
