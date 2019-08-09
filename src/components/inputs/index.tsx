import React, { ChangeEvent, PropsWithChildren } from 'react'
import {
  AvatarInputLabel,
  CoverInputLabel,
  IconWrapper,
  InputOverlay,
  InputUnit,
  StyledFlatTextInput,
  StyledHiddenInput,
  StyledInputWrapper,
  StyledLabel,
  StyledLabelProps,
  StyledNumberInput,
  StyledRadioInput,
  StyledRadioWrapper,
  StyledToggleWrapper,
  StyledTextArea,
  StyledTextInput, StyledToggleButton,
} from './style'
import { Icon } from '../icon'
import { CoverImage } from '../image/cover'
import AvatarImage from '../image/avatar'

interface TextInputProps extends StyledLabelProps {
  defaultValue?: string
  value?: any
  placeholder?: string
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  disabled?: boolean
  id?: string
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
  defaultValue?: string
  value?: any
  placeholder?: string
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  disabled?: boolean
  id?: string
  glyph?: string
}

export const FlatTextInput = (props: FlatTextInputProps) => {
  return (
    <StyledInputWrapper
      disabled={props.disabled}
      bg={'bg.card'}
      borderColor={'transparent'}
      flexDirection={'row-reverse'}
    >
      <StyledFlatTextInput
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
      {props.glyph && <IconWrapper>
        <Icon glyph={props.glyph}/>
      </IconWrapper>}
    </StyledInputWrapper>
  )
}

interface RadioInputProps extends StyledLabelProps {
  checked?: boolean
  value?: any
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  autoFocus?: boolean
  disabled?: boolean
  readOnly?: boolean
  id?: string
}

export const RadioInput = (props: PropsWithChildren<RadioInputProps>) => {
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      <StyledRadioWrapper>
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
      </StyledRadioWrapper>
    </StyledLabel>
  )
}

interface ToggleInputProps extends StyledLabelProps {
  checked?: boolean
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean
  id?: string
}

export const ToggleInput = (props: PropsWithChildren<ToggleInputProps>) => {
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      <StyledToggleWrapper>
        {props.children && <>{props.children}</>}
        <StyledToggleButton checked={props.checked} ml={'sm'}/>
      </StyledToggleWrapper>
      <StyledHiddenInput
        type='checkbox'
        id={props.id}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </StyledLabel>
  )
}

interface TextAreaProps extends TextInputProps {
  cols?: number
  rows?: number
}

export const TextArea = (props: PropsWithChildren<TextAreaProps>) => {
  // TODO: need fix ref
  return (
    // @ts-ignore
    <StyledLabel {...props}>
      {props.children && <>{props.children}</>}
      <StyledTextArea
        id={props.id}
        defaultValue={props.defaultValue}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        cols={props.cols}
        rows={props.rows}
        mt={props.children ? 'sm' : 0}
      />
    </StyledLabel>
  )
}

interface CoverInputProps {
  defaultValue?: string
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
}

export const CoverInput = (props: CoverInputProps) => {
  const { defaultValue, onChange } = props
  return (
    <CoverInputLabel>
      <InputOverlay
        visible={!defaultValue || defaultValue.length === 1}
      >
        <>Set Cover Image</>
      </InputOverlay>
      <CoverImage src={defaultValue ? `${defaultValue}` : ''} editable={true}/>
      <StyledHiddenInput
        type='file'
        id='file'
        name='file'
        accept={
          '.png, .jpg, .jpeg'
        }
        multiple={false}
        onChange={onChange}
      />
    </CoverInputLabel>
  )
}

interface AvatarInputProps {
  defaultValue?: string
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
}

export const AvatarInput = (props: AvatarInputProps) => {
  const { defaultValue, onChange } = props
  return (
    <AvatarInputLabel>
      <AvatarImage src={defaultValue ? `${defaultValue}` : ''} size={'lg'}/>
      <StyledHiddenInput
        type='file'
        id='file'
        name='file'
        accept={
          '.png, .jpg, .jpeg'
        }
        multiple={false}
        onChange={onChange}
      />
    </AvatarInputLabel>
  )
}
