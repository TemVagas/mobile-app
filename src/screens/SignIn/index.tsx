import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { color } from '../../constants';

import SignInIMG from '../../assets/signin.png';

import {
  Container,
  Image,
  Icon,
  Input,
  InputContainer,
  SimpleButton,
  Button,
  ButtonText,
  SignUpText,
  SignUpContainer,
  SignUpButtonText,
} from './styles';

function SignIn() {
  const { navigate } = useNavigation();
  const scrollRef = useRef<ScrollView>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const keyboardDidShow = () => {
    scrollRef.current?.scrollTo({
      y: 200,
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
      <InputContainer>
        <Icon name="user" size={18} color={color.text.tertiary} />
        <Input
          placeholder="E-mail"
          placeholderTextColor={color.text.tertiary}
        />
      </InputContainer>
      <InputContainer>
        <Icon name="lock" size={18} color={color.text.tertiary} />
        <Input
          placeholder="Senha"
          placeholderTextColor={color.text.tertiary}
          secureTextEntry={passwordIsVisible}
        />
        <SimpleButton onPress={() => setPasswordIsVisible(state => !state)}>
          {passwordIsVisible ? (
            <Icon name="eye" size={18} color={color.text.primary} />
          ) : (
            <Icon name="eye-slash" size={18} color={color.text.primary} />
          )}
        </SimpleButton>
      </InputContainer>
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
