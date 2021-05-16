import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { createRef, useState } from 'react';

import { TextInput } from 'react-native';
import { color } from '../../constants';

import {
  HeaderContainer,
  Header,
  GoBackButton,
  Button,
  ButtonText,
  Content,
  Container,
  Title,
  StyledImage,
  Form,
} from './styles';

import Input from '../../components/Input';

function UpdateUser() {
  const { goBack, navigate } = useNavigation();

  const passRef = createRef<TextInput>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <GoBackButton onPress={() => goBack()}>
            <FontAwesome
              name="chevron-left"
              color={color.background}
              size={20}
            />
          </GoBackButton>
          <Title>Editar Perfil</Title>
        </Header>
      </HeaderContainer>

      <Content>
        <StyledImage source={{ uri: 'https://picsum.photos/200' }} />

        <Form contentContainerStyle={{ alignItems: 'center' }}>
          <Input
            placeholder="E-mail"
            icon="user"
            returnKeyType="next"
            keyboardType="default"
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
          <Input
            reference={passRef}
            placeholder="Nova Senha"
            icon="lock"
            secureTextEntry={passwordIsVisible}
            passwordIsVisible={passwordIsVisible}
            setPasswordIsVisible={setPasswordIsVisible}
            onSubmitEditing={() => navigate('Profile')}
            returnKeyType="done"
            keyboardType="visible-password"
            autoCorrect={false}
          />
          <Input
            reference={passRef}
            placeholder="Repetir senha"
            icon="lock"
            secureTextEntry={passwordIsVisible}
            passwordIsVisible={passwordIsVisible}
            setPasswordIsVisible={setPasswordIsVisible}
            onSubmitEditing={() => navigate('Profile')}
            returnKeyType="done"
            keyboardType="visible-password"
            autoCorrect={false}
          />
          <Button activeOpacity={0.8} onPress={() => goBack()}>
            <ButtonText>SALVAR ALTERAÇÕES</ButtonText>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

export default UpdateUser;
