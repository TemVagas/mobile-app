import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView, ToastAndroid } from 'react-native';
import { Formik } from 'formik';

import { color } from '../../constants';

import {
  Container,
  GoBackButton,
  Header,
  HeaderContainer,
  Title,
  Form,
  Button,
  ButtonText,
} from './styles';
import Input from '../../components/Input';
import { ChangePasswordValidateShape } from '../../utils/validation';
import api from '../../services/api';

function ChangePassword() {
  const { goBack, navigate } = useNavigation();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [oldPasswordIsVisible, setOldPasswordIsVisible] = useState(true);

  const scrollRef = useRef<ScrollView>();

  const handleChangePassword = useCallback(
    async values => {
      ToastAndroid.show('Alterando senha', ToastAndroid.SHORT);
      api
        .patch('accounts/password', {
          new_password: values.new_password,
          old_password: values.old_password,
        })
        .then(() => {
          ToastAndroid.show('Senha atualizada', ToastAndroid.SHORT);
          navigate('Profile');
        })
        .catch(error => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
    },
    [navigate],
  );

  return (
    <Container>
      <Form ref={scrollRef} contentContainerStyle={{ alignItems: 'center' }}>
        <HeaderContainer>
          <Header>
            <GoBackButton onPress={() => goBack()}>
              <FontAwesome
                name="chevron-left"
                color={color.background}
                size={20}
              />
              <Title>Voltar</Title>
            </GoBackButton>
          </Header>
        </HeaderContainer>
        <Formik
          initialValues={{
            new_password: '',
            old_password: '',
          }}
          onSubmit={values => handleChangePassword(values)}
          validationSchema={ChangePasswordValidateShape}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            handleBlur,
            touched,
          }) => (
            <>
              <Input
                placeholder="Nova senha"
                icon="lock"
                secureTextEntry={passwordIsVisible}
                passwordIsVisible={passwordIsVisible}
                setPasswordIsVisible={setPasswordIsVisible}
                returnKeyType="done"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('new_password')}
                onBlur={handleBlur('new_password')}
                value={values.new_password}
                error={touched.new_password && errors.new_password}
              />

              <Input
                placeholder="Sua senha"
                icon="lock"
                secureTextEntry={oldPasswordIsVisible}
                passwordIsVisible={oldPasswordIsVisible}
                setPasswordIsVisible={setOldPasswordIsVisible}
                returnKeyType="done"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('old_password')}
                onBlur={handleBlur('old_password')}
                value={values.old_password}
                error={touched.old_password && errors.old_password}
              />

              <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
                <ButtonText>ALTERAR SENHA</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default ChangePassword;
