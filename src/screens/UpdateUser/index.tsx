import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, createRef, useState } from 'react';

import { TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
  ButtonCamera,
  CameraIcon,
} from './styles';

import Input from '../../components/Input';

function UpdateUser() {
  const { goBack, navigate } = useNavigation();

  const passRef = createRef<TextInput>();

  const [image, setImage] = useState<string>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const pickImage = useCallback(async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }).then(response => {
      if (!response.cancelled) {
        setImage(response.uri);
      }
    });
  }, []);

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
            <Title>Voltar</Title>
          </GoBackButton>
        </Header>
      </HeaderContainer>

      <Content>
        <ButtonCamera onPress={pickImage} activeOpacity={1}>
          <StyledImage
            source={{
              uri:
                image ||
                'https://www.pngkit.com/png/detail/349-3499697_man-placeholder-blank-avatar-icon-png.png',
            }}
            resizeMode="cover"
          />
          <CameraIcon>
            <FontAwesome
              name="camera-retro"
              color={color.background}
              size={18}
            />
          </CameraIcon>
        </ButtonCamera>

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
