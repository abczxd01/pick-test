import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';

import ValidationSchema from './ValidationSchema';
import { FormValues } from './types';
import TextInput from './components/TextInput';
import PhoneInput from './components/PhoneInput';
import FormModal from './components/FormModal';
import { useAppDispatch, useAppSelector } from './store';
import { sendForm } from './store/actions';
import axios from 'axios';

const getTitleText = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    return 'Добрая ночь';
  } else if (currentHour >= 6 && currentHour < 12) {
    return 'Доброе утро';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Добрый день';
  } else {
    return 'Добрый вечер';
  }
};

const getButtonText = (count: number) => {
  if (!count || count < 1) {
    return 'Забронировать';
  }

  if (count === 1) {
    return `Забронировать ${count} помещение`;
  } else if (count >= 2 && count <= 4) {
    return `Забронировать ${count} помещения`;
  }

  return `Забронировать ${count} помещений`;
};

const Main = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.form);
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = useCallback(() => setModalVisible(false), []);
  const showModal = useCallback(() => setModalVisible(true), []);

  const onSubmit = useCallback(
    async (values: FormValues) => {
      const request = {
        user: {
          firstName: values.firstName,
          lastName: values.lastName,
          mail: values.mail,
          phone: values.phone,
        },
        order: {
          flatsCount: +values.flatsCount,
          time: Date.now(),
        },
      };

      const res = await dispatch(sendForm(request));
      if (res) {
        showModal();
      }
    },
    [dispatch, showModal]
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<
          any,
          {
            data: {
              id: number;
              url: string;
              title: string;
              text: string;
              mobile: string | null;
            }[];
          }
        >('https://api.pik.ru/v2/offer/special?types=1,2&locations=2,3');
        // Random background
        const background =
          response.data[Math.floor(Math.random() * response.data.length)]
            .mobile;
      } catch (error) {}
    })();
  }, []);

  return (
    <SafeAreaView>
      <FormModal
        error={error}
        modalVisible={modalVisible}
        hideModal={hideModal}
      />

      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            mail: '',
            flatsCount: '',
          }}
          onSubmit={onSubmit}
          validationSchema={ValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
        >
          {(formik) => {
            return (
              <Container>
                <Title>{getTitleText()}</Title>
                <Subtitle>
                  {'Для бронирования помещений \n заполните форму'}
                </Subtitle>

                <TextInput
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  error={formik.errors.firstName}
                  placeholder="Ваше имя"
                  inlineText="Имя"
                  fieldKey="firstName"
                />
                <TextInput
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  error={formik.errors.lastName}
                  placeholder="Ваша фамилия"
                  inlineText="Фамилия"
                  fieldKey="lastName"
                />

                <PhoneInput
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  error={formik.errors.phone}
                />
                <TextInput
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  error={formik.errors.mail}
                  placeholder="E-mail"
                  inlineText="E-mail"
                  keyboardType="email-address"
                  fieldKey="mail"
                />
                <TextInput
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  error={formik.errors.flatsCount}
                  placeholder="Количество помещений"
                  inlineText="Кол-во помещений"
                  fieldKey="flatsCount"
                  keyboardType="number-pad"
                />
                <Button onPress={() => formik.handleSubmit()}>
                  {loading ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <ButtonText>
                      {getButtonText(+formik.values.flatsCount)}
                    </ButtonText>
                  )}
                </Button>
                <Disclaimer>
                  Это дисклеймер, который есть во всех формах
                </Disclaimer>
              </Container>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
`;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: #ff4114;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;

const Title = styled.Text`
  color: black;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  line-height: 42px;
  margin-top: 32px;
`;

const Subtitle = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 32px;
`;

const Disclaimer = styled.Text`
  color: #969ba5;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  margin-top: 16px;
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Constants.statusBarHeight}px;
`;

export default Main;
