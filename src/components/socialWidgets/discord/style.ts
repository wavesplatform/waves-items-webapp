import styled from 'styled-components'
import { Link, Text, LinkProps, Flex } from 'rebass'
import { truncate } from '../../globals'
import { themeGet } from 'styled-system'

const widgetSize = 56
const widgetWidth = 168

export const IconBox = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: ${widgetSize}px;
  height: ${widgetSize}px;
  flex: 0 0 ${widgetSize}px;
`

export const Shift = styled(Flex)`
  position: absolute;
  width: ${widgetWidth + widgetSize}px;
  height: ${widgetSize}px;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  transition: left .1s ease;
`

export const Base = styled(Flex)`
  flex: 0 0 ${widgetSize}px;
`

export const Active = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex: 1;
`

export const LinkWrapper = styled(Link)<LinkProps>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: ${widgetSize}px;
  height: ${widgetSize}px;
  border-radius: 28px;
  background: ${themeGet('colors.default')};
  color: ${themeGet('bg.default')};
  overflow: hidden;
  transition: width .1s ease, background-color .1s ease, color .1s ease;
  
  &:hover {
    width: ${widgetWidth}px;
    background-color: #7289da;
    color: ${themeGet('colors.default')};
    
    ${Shift} {
      left: -${widgetSize}px;
    }
  }
`

export const Title = styled(Text)`
  flex: 0 0 ${widgetWidth - widgetSize}px;
  ${truncate};
`
