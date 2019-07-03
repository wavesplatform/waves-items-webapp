import React, { ChangeEvent, PropsWithChildren } from 'react'
import {
  InputUnit,
  StyledInputWrapper,
  StyledLabel,
  StyledNumberInput,
  StyledFlatTextInput,
  StyledTextInput, StyledLabelProps,
} from './style'
import { Box } from 'rebass'

interface TextInputProps extends StyledLabelProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  id?: string,
}

export const TextInput = (props: PropsWithChildren<TextInputProps>) => {
  // TODO: need fix ref
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      {props.children && <Box>{props.children}</Box>}
      <StyledTextInput
        id={props.id}
        defaultValue={props.defaultValue}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        mt={props.children ? 'sm' : 0}
      />
    </StyledLabel>
  )
}

interface TextInputWithUnitProps extends TextInputProps {
  unit?: string
}

export const TextInputWithUnit = (props: PropsWithChildren<TextInputWithUnitProps>) => {
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      {props.children && <Box>{props.children}</Box>}
      <StyledInputWrapper
        disabled={props.disabled}
      >
        <StyledTextInput
          id={props.id}
          defaultValue={props.defaultValue}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          bg={'transparent'}
          borderWidth={0}
          borderRadius={0}
          mt={0}
          flex={'1'}
        />
        <InputUnit>{props.unit ? props.unit : 'Waves'}</InputUnit>
      </StyledInputWrapper>
    </StyledLabel>
  )
}

interface NumberInputProps extends TextInputProps {
}

export const NumberInput = (props: PropsWithChildren<NumberInputProps>) => {
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      {props.children && <Box>{props.children}</Box>}
      <StyledNumberInput
        id={props.id}
        defaultValue={props.defaultValue}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
      />
    </StyledLabel>
  )
}

interface FlatTextInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  id?: string,
}

export const FlatTextInput = (props: FlatTextInputProps) => {
  return (
    <StyledFlatTextInput
      id={props.id}
      defaultValue={props.defaultValue}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      autoFocus={props.autoFocus}
      disabled={props.disabled}
    />
  )
}
