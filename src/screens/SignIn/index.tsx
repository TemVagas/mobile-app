import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  useCallback,
} from 'react';
import { Keyboard, ScrollView, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import SignInIMG from '../../assets/signin.png';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Image,
  SimpleButton,
  Button,
  ButtonText,
  SignUpText,
  SignUpContainer,
  SignUpButtonText,
} from './styles';

import Input from '../../components/Input';
import { SignInValidateShape } from '../../utils/validation';

function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const passRef = createRef<TextInput>();
  const scrollRef = useRef<ScrollView>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  const keyboardDidShow = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

  const handleSignIn = useCallback(
    async values => {
      ToastAndroid.show('Validando dados inseridos.', ToastAndroid.SHORT);

      const { error: errorSignIn, message: messageSignIn } = await signIn(
        values.email.toLowerCase(),
        values.password.toLowerCase(),
      );

      if (errorSignIn && messageSignIn) {
        ToastAndroid.show(messageSignIn, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Bem vindo.', ToastAndroid.SHORT);
      }
    },
    [signIn],
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
    };
  }, []);

  return (
    <Container
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <Image source={SignInIMG} />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => handleSignIn(values)}
        validationSchema={SignInValidateShape}
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
              placeholder="E-mail"
              icon="user"
              onSubmitEditing={() => passRef.current?.focus()}
              returnKeyType="next"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
            />
            <Input
              reference={passRef}
              icon="lock"
              placeholder="Senha"
              secureTextEntry={passwordIsVisible}
              setPasswordIsVisible={setPasswordIsVisible}
              passwordIsVisible={passwordIsVisible}
              onSubmitEditing={() => handleSubmit()}
              returnKeyType="done"
              keyboardType="default"
              autoCorrect={false}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password}
            />

            <Button onPress={() => handleSubmit()}>
              <ButtonText>LOGIN</ButtonText>
            </Button>
          </>
        )}
      </Formik>

      <SignUpContainer>
        <SignUpText>Não possui conta?</SignUpText>
        <SimpleButton onPress={() => handleNavigate('SignUp')}>
          <SignUpButtonText>CADASTRE-SE</SignUpButtonText>
        </SimpleButton>
      </SignUpContainer>
    </Container>
  );
}

export default SignIn;
