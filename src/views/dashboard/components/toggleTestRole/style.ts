import styled, { css } from 'styled-components'
import { Card } from 'rebass'
import { opacity, OpacityProps, themeGet } from 'styled-system'
import { H3 } from '../../../../components/globals'

export const RoleSelector = styled(Card)`
  display: flex;
  width: 100%;
  max-width: 820px;
`
RoleSelector.defaultProps = {}

type RoleOptionProps = OpacityProps & {
  active?: boolean
}
export const RoleOption = styled(Card)<RoleOptionProps>`
  margin-right: -2px;
  cursor: pointer;
  position: relative;
  opacity: .6;
  
  ${props => props.active && css`
    opacity: 1;
    z-index: 1;
  `}
  
  &:first-child {
    border-radius: ${themeGet('radii.lg')}px 0 0 ${themeGet('radii.lg')}px;
  }
  
  &:last-child {
    border-radius: 0 ${themeGet('radii.lg')}px ${themeGet('radii.lg')}px 0;
    margin-right: 0;
  }
  
  &:hover {
    opacity: 1;
  }

  ${opacity};
`
RoleOption.defaultProps = {
  p: 'lg',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: 'border.input',
}

export const RoleOptionTitle = styled(H3)`
`
RoleOptionTitle.defaultProps = { ...RoleOptionTitle.defaultProps, mb: 0 }
