import React, { useEffect, useRef, useState, createRef } from 'react';
import { Keyboard, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SignInIMG from '../../assets/signin.png';

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

function SignIn() {
  const { navigate } = useNavigation();

  const passRef = createRef<TextInput>();
  const scrollRef = useRef<ScrollView>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const keyboardDidShow = () => {
    scrollRef.current?.scrollToEnd({
      animated: true,
    });
  };

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

      <Input
        placeholder="E-mail"
        icon="user"
        onSubmitEditing={() => passRef.current?.focus()}
        returnKeyType="next"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <Input
        reference={passRef}
        placeholder="Senha"
        icon="lock"
        secureTextEntry={passwordIsVisible}
        passwordIsVisible={passwordIsVisible}
        setPasswordIsVisible={setPasswordIsVisible}
        onSubmitEditing={() => navigate('Profile')}
        returnKeyType="done"
        keyboardType="visible-password"
        autoCorrect={false}
      />

      <Button onPress={() => navigate('Profile')}>
        <ButtonText>LOGIN</ButtonText>
      </Button>
      <SignUpContainer>
        <SignUpText>Não possui conta?</SignUpText>
        <SimpleButton>
          <SignUpButtonText>CADASTRE-SE</SignUpButtonText>
        </SimpleButton>
      </SignUpContainer>
    </Container>
  );
}

export default SignIn;
