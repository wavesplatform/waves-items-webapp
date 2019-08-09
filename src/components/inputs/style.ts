import styled, { css } from 'styled-components'
import { Box, BoxProps, Flex, FlexProps } from 'rebass'
import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  borderColor,
  borderRadius, BorderRadiusProps,
  borders, BordersProps,
  boxShadow, flex, flexDirection, opacity, themeGet
} from 'styled-system'

export interface StyledLabelProps extends FlexProps {
}

export const StyledLabel = styled(Flex)<StyledLabelProps>`
  flex-direction: column;
  width: 100%;
  position: relative;
  
  ${props => !props.disabled ? css`
    &:hover > ${StyledTextInput},
    &:hover > textarea,
    &:hover > ${StyledInputWrapper} {
      border-color: ${themeGet('colors.border.inputHover')};
    }
  ` : css`
    ${StyledToggleButton} {
      opacity: .5;
    }
    ${StyledToggleWrapper} {
      cursor: default;
    }
  `};
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
  px: 'md',
  py: 'sm',
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

export const StyledTextArea = styled(StyledInput)`
`
StyledTextArea.defaultProps = {
  ...StyledTextArea.defaultProps,
  as: 'textarea',
  mt: 'sm',
}

export const StyledNumberInput = styled(StyledTextInput).attrs({
  type: 'number',
})`
`

export const StyledInputWrapper = styled(StyledInput)<StyledInputProps & FlexProps>`
  display: flex;
  align-items: center;
  
  ${flex};
  ${flexDirection}
`
StyledInputWrapper.defaultProps = {
  ...StyledInputWrapper.defaultProps,
  as: 'div',
  px: 0,
  py: 0,
  mt: 'sm',
}

export const IconWrapper = styled(Box)`
  line-height: 1;
`
IconWrapper.defaultProps = {
  ...IconWrapper.defaultProps,
  pl: 3,
  fontSize: 'lg',
  color: 'placeholder',
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

export const StyledFlatTextInput = styled(StyledInput).attrs({
  type: 'text',
})`
  // &:focus {
  //   background-color: ${themeGet('colors.bg.input')};
  //   border-color: ${themeGet('colors.border.inputHover')};
  // }
  
  &:focus + ${IconWrapper} {
    color: ${themeGet('colors.default')};
  }
`
StyledFlatTextInput.defaultProps = {
  ...StyledFlatTextInput.defaultProps,
  as: 'input',
  mt: 0,
  bg: 'bg.card',
  borderColor: 'transparent',
}

export const StyledRadioWrapper = styled(Flex)`
  position: relative;
  align-items: center;
  cursor: pointer;
`

interface StyledRadioInputProps extends BoxProps, BorderRadiusProps, BordersProps {
}

export const StyledRadioInput = styled(Box).attrs({
  type: 'radio',
})<StyledRadioInputProps>`
  width: 18px;
  height: 18px;
  box-shadow: none;
  border-color: ${themeGet('colors.border.input')};
  border-width: 2px;
  border-style: solid;
  opacity: ${props => (props.disabled ? .5 : 1)};
  
  &:checked {
    border-color: ${themeGet('colors.primary')};
    border-width: 6px;
    background-color: ${themeGet('colors.default')};
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
StyledRadioInput.defaultProps = {
  as: 'input',
  borderRadius: '24px',
  bg: 'bg.input',
  mr: 'sm',
}

export const StyledToggleWrapper = styled(Flex)`
  position: relative;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`

export const StyledToggleButton = styled(Flex)<{ checked?: boolean } & FlexProps & BorderRadiusProps>`
  width: 3.2rem;
  height: 1.6rem;
  position: relative;
  background: ${props => (props.checked ? themeGet('colors.primary') : themeGet('colors.element'))};
  transition: background-color .2s ease-in;
  
  &:before {
    content: '';
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: ${themeGet('colors.default')};
    position: absolute;
    transform: scale(.8);
    top: 0;
    left: ${props => (props.checked ? '50%' : 0)};
    transition: left .1s ease;
  }

  ${borderRadius};
`
StyledToggleButton.defaultProps = {
  ...StyledToggleButton.defaultProps,
  borderRadius: '1.6rem',
}

export const StyledHiddenInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
`

export const CoverInputLabel = styled.label`
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
`

export const AvatarInputLabel = styled.label`
  position: relative;
  display: block;
  width: ${themeGet('avatars.lg.width')}px;
  height: ${themeGet('avatars.lg.height')}px;
  cursor: pointer;
`

export const InputOverlay = styled(Flex)<FlexProps & { visible?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: ${props => (props.visible ? '1' : '0')};
`
