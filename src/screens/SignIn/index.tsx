import React, {
  useEffect,
  useRef,
  useState,
  createRef,
  useCallback,
} from 'react';
import { Keyboard, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { Modalize } from 'react-native-modalize';
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
  ModalizeContainer,
} from './styles';

import Input from '../../components/Input';
import { SignInValidateShape } from '../../utils/validation';

function SignIn() {
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const passRef = createRef<TextInput>();
  const scrollRef = useRef<ScrollView>();
  const modalizeRef = useRef<Modalize>(null);

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
      const { error: errorSignIn, message: messageSignIn } = await signIn(
        values.username.toLowerCase(),
        values.password.toLowerCase(),
      );

      if (errorSignIn && messageSignIn) {
        setErrorMessage(messageSignIn);
        modalizeRef.current?.open();
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
          username: '',
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
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              error={touched.username && errors.username}
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
      <Modalize ref={modalizeRef} adjustToContentHeight>
        <ModalizeContainer>
          <SignUpButtonText>Erro</SignUpButtonText>
          <SignUpText>{errorMessage}</SignUpText>
        </ModalizeContainer>
      </Modalize>
    </Container>
  );
}

export default SignIn;
