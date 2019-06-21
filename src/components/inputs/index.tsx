import React, { ChangeEvent, PropsWithChildren } from 'react'
import {
  InputUnit,
  StyledInputWrapper,
  StyledLabel,
  StyledNumberInput,
  StyledSearchInput,
  StyledTextInput
} from './style'
import { Box } from 'rebass'

interface TextInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  id?: string,
}

export const TextInput = (props: PropsWithChildren<TextInputProps>) => {
  return (
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
      />
    </StyledLabel>
  )
}

interface TextInputWithUnitProps extends TextInputProps {
  unit?: string
}

export const TextInputWithUnit = (props: PropsWithChildren<TextInputWithUnitProps>) => {
  return (
    <StyledLabel {...props}>
      <Box>{props.children}</Box>
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

interface NumberInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  id?: string,
}

export const NumberInput = (props: PropsWithChildren<NumberInputProps>) => {
  return (
    <StyledLabel {...props}>
      <Box>{props.children}</Box>
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

interface SearchInputProps {
  defaultValue?: string,
  value?: any,
  placeholder?: string,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
  disabled?: boolean,
  id?: string,
}

export const SearchInput = (props: PropsWithChildren<SearchInputProps>) => {
  return (
    <StyledLabel {...props} mt={0}>
      <StyledSearchInput
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
