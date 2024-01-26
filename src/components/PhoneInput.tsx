import React from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import styled from 'styled-components/native';
import { FormValues } from '../types';

type Props = {
  error?: string | undefined;
  setFieldValue: (field: string, value: string) => void;
  setFieldError: (field: keyof FormValues, values: string | undefined) => void;
};

const PhoneInput: React.FC<Props> = ({
  error,
  setFieldValue,
  setFieldError,
}) => {
  return (
    <Container
      onTouchStart={() => {
        setFieldError('phone', undefined);
      }}
    >
      <InlineText>Телефон</InlineText>
      <TextInputMask
        error={error}
        keyboardType="phone-pad"
        mask="+7 (999) 999-99-99"
        value="+7"
        onChangeText={(text) => {
          setFieldValue('phone', text);
        }}
      />

      <ErrorContainer>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </ErrorContainer>
    </Container>
  );
};

export default PhoneInput;

const TextInputMask = styled(MaskedTextInput)<{ error: string | undefined }>`
  color: ${(props) => (props.error ? '#e64646' : '#4d4d4d')};
  font-size: 16px;
  border-radius: 4px;
  position: relative;
  border-width: 1px;
  padding-left: 16px;
  border-color: ${(props) => (props.error ? '#e64646' : '#f2f4f7')};
  padding-top: 10px;
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
