import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex } from 'rebass'
import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  borderColor,
  borderRadius, BorderRadiusProps,
  borders, BordersProps,
  boxShadow, opacity, themeGet
} from 'styled-system'

export const StyledLabel = styled(Flex)`
  flex-direction: column;
  width: 100%;
  position: relative;
  
  ${props => !props.disabled && css`
    &:hover > ${StyledTextInput},
    &:hover > textarea,
    &:hover > ${StyledInputWrapper} {
      border-color: ${themeGet('colors.border.inputHover')};
    }
  `}
`
StyledLabel.defaultProps = {
  as: 'label',
  mt: 'base',
  color: 'default',
}

interface StyledInputProps extends BoxProps, BorderRadiusProps, BordersProps {
}

export const StyledInput = styled(Box)<StyledInputProps>`
  width: 100%;
  box-shadow: none;
  opacity: ${props => (props.disabled ? .5 : 1)};
  
  &::placeholder {
    color: ${themeGet('colors.placeholder')};
  }
  &::-webkit-input-placeholder {
    color: ${themeGet('colors.placeholder')};
  }
  &:-moz-placeholder {
    color: ${themeGet('colors.placeholder')};
  }
  &:-ms-input-placeholder {
    color: ${themeGet('colors.placeholder')};
  }
  
  ${borders};
  ${borderColor};
  ${borderRadius};
  ${boxShadow};
  ${backgroundImage};
  ${backgroundSize};
  ${backgroundPosition};
  ${opacity};
`
StyledInput.defaultProps = {
  color: 'default',
  borderRadius: 'base',
  px: 3,
  py: 2,
  bg: 'bg.input',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: 'border.input',
  flex: '1 0 auto',
}

export const StyledTextInput = styled(StyledInput).attrs({
  type: 'text',
})`

`
StyledTextInput.defaultProps = {
  ...StyledTextInput.defaultProps,
  as: 'input',
  mt: 'sm',
}

export const StyledNumberInput = styled(StyledTextInput).attrs({
  type: 'number',
})`
`

export const StyledInputWrapper = styled(StyledInput)`
  display: flex;
`
StyledInputWrapper.defaultProps = {
  ...StyledInputWrapper.defaultProps,
  as: 'div',
  px: 0,
  py: 0,
  mt: 'sm',
}

export const InputUnit = styled(Flex)`
  align-items: center;
  border-left: 1px solid ${themeGet('colors.border.input')};
  text-transform: uppercase;
`
InputUnit.defaultProps = {
  px: 'base',
  fontSize: 'sm',
  color: 'placeholder',
}

export const StyledSearchInput = styled(StyledInput).attrs({
  type: 'text',
})`
  &:focus {
    background-color: ${themeGet('colors.bg.input')};
    border-color: ${themeGet('colors.border.inputHover')};
  }
`
StyledSearchInput.defaultProps = {
  ...StyledSearchInput.defaultProps,
  as: 'input',
  mt: 0,
  bg: 'bg.card',
  borderColor: 'transparent',
}
