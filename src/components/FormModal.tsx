import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type Props = {
  modalVisible: boolean;
  error: null | any;
  hideModal: () => void;
};

const FormModal: React.FC<Props> = ({ modalVisible, error, hideModal }) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      onRequestClose={hideModal}
    >
      <ModalView>
        <IconBox error={error}>
          {!error ? (
            <Ionicons name="checkmark" size={48} color="#969BA5" />
          ) : (
            <AntDesign name="close" size={48} color="#E64646" />
          )}
        </IconBox>
        <ModalText>
          {!error ? 'Ваша заявка отправлена' : 'Ошибка. Попробуйте позже'}
        </ModalText>
      </ModalView>
    </Modal>
  );
};

const ModalView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.View<{ error: null | any }>`
  width: 72px;
  height: 72px;
  align-items: center;
  background-color: ${(props) => (props.error ? '#F6E4E4' : '#f2f4f7')};
  justify-content: center;
  border-radius: 10px;
`;

const ModalText = styled.Text`
  color: black;
  font-size: 44px;
  font-weight: 600;
  line-height: 48px;
  margin-top: 34px;
  text-align: center;
`;

export default FormModal;
