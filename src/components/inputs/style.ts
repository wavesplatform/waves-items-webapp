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
    &:hover > input,
    &:hover > textarea {
      border-color: ${themeGet('colors.border.inputHover')};
    }
  `}
`
StyledLabel.defaultProps = {
  as: 'label',
  mt: 'base',
  color: 'default',
}

interface StyledTextInputProps extends BoxProps, BorderRadiusProps, BordersProps {
}

export const StyledTextInput = styled(Box).attrs({
  type: 'text',
})<StyledTextInputProps>`
  flex: 1 0 auto;
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
StyledTextInput.defaultProps = {
  as: 'input',
  color: 'default',
  borderRadius: 'base',
  px: 3,
  py: 2,
  bg: 'bg.input',
  borderStyle: 'solid',
  borderWidth: '2px',
  borderColor: 'border.input',
  mt: 'sm',
}
