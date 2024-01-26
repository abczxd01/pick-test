import React, { useState } from 'react';
import { TextInput as TextInputRN, KeyboardType } from 'react-native';
import styled from 'styled-components/native';
import { FormValues } from '../types';

type Props = {
  error?: string | undefined;
  setFieldValue: (field: string, value: string) => void;
  setFieldError: (field: keyof FormValues, values: string | undefined) => void;
  placeholder: string;
  inlineText: string;
  fieldKey: keyof FormValues;
  keyboardType?: KeyboardType;
};

const TextInput: React.FC<Props> = ({
  error,
  setFieldValue,
  setFieldError,
  keyboardType = 'default',
  fieldKey,
  placeholder,
  inlineText,
}) => {
  const [focused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isActive = inputValue.length > 0 || focused;

  return (
    <Container
      onTouchStart={() => {
        setFieldError(fieldKey, undefined);
      }}
    >
      {isActive && <InlineText>{inlineText}</InlineText>}
      <StyledTextInput
        error={error}
        isActive={isActive}
        keyboardType={keyboardType}
        placeholder={isActive ? undefined : placeholder}
        placeholderTextColor={error ? '#e64646' : '#4d4d4d'}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        value={inputValue}
        onChangeText={(text) => {
          setFieldValue(fieldKey, text);
          setInputValue(text);
        }}
      />

      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default TextInput;

const StyledTextInput = styled(TextInputRN)<{
  error: string | undefined;
  isActive: boolean;
}>`
  color: ${(props) => (props.error ? '#e64646' : '#4d4d4d')};
  font-size: 16px;
  border-radius: 4px;
  border-width: 1px;
  padding-left: 16px;
  border-color: ${(props) => (props.error ? '#e64646' : '#f2f4f7')};
  background-color: ${(props) =>
    props.error ? '#e646464d' : props.isActive ? '#FFF' : '#f2f4f7'};
  padding-top: ${(props) => (props.isActive ? '10px' : '0px')};
  height: 56px;
  width: 100%;
`;

const ErrorText = styled.Text`
  color: #e64646;
  font-size: 11px;
  line-height: 14px;
  text-align: right;
`;

const Container = styled.View`
  width: 100%;
  margin-bottom: 24px;
`;
const ErrorContainer = styled.View`
  margin-top: 8px;
`;

const InlineText = styled.Text`
  color: #969ba5;
  font-size: 12px;
  line-height: 16px;
  position: absolute;
  top: 8px;
  left: 16px;
  z-index: 1;
`;
