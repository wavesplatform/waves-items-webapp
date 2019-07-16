import React, { ChangeEvent, PropsWithChildren } from 'react'
import {
  InputUnit,
  StyledInputWrapper,
  StyledLabel,
  StyledNumberInput,
  StyledFlatTextInput,
  StyledTextInput, StyledLabelProps, StyledRadioLabel, StyledRadioInput, StyledRadioLabelProps,
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
      {props.children && <>{props.children}</>}
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
      {props.children && <>{props.children}</>}
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
      {props.children && <>{props.children}</>}
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

interface RadioInputProps extends StyledRadioLabelProps {
  checked?: boolean,
  value?: any,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
  id?: string,
}

export const RadioInput = (props: PropsWithChildren<RadioInputProps>) => {
  return (
    // @ts-ignore
    <StyledRadioLabel {...props}>
      <StyledRadioInput
        id={props.id}
        readOnly={props.readOnly}
        checked={props.checked}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
      />
      {props.children && <>{props.children}</>}
    </StyledRadioLabel>
  )
}
