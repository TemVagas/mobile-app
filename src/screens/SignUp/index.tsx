import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Platform } from 'react-native';

import {
  Container,
  Form,
  GoBackButton,
  Header,
  HeaderContainer,
  StyledImage,
  Title,
  Content,
  Button,
  ButtonText,
  CameraIcon,
  ButtonCamera,
} from './styles';

import Input from '../../components/Input';

import { color } from '../../constants';

function AddVacancy() {
  const { goBack, navigate } = useNavigation();

  const [image, setImage] = useState<string>();
  const [curriculum, setCurriculum] = useState<string>();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Precisamos de permissões de para buscar suas fotos na galeria!',
          );
        }
      }
    })();
  }, []);

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

  const pickDocument = useCallback(async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      multiple: false,
    }).then(response => {
      if (response.type === 'success') {
        setCurriculum(response.uri);
      }
    });
  }, []);

  return (
    <Container>
      <Form contentContainerStyle={{ alignItems: 'center' }}>
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

          <Input
            placeholder="Nome"
            icon="address-book"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="Sobrenome"
            icon="address-book"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="Nos conte sobre você"
            icon="address-card"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="Seus interesses"
            icon="list"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="E-mail"
            icon="user"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="Telefone"
            icon="phone"
            returnKeyType="next"
            keyboardType="number-pad"
            autoCorrect={false}
          />
          <Input
            placeholder="Estado"
            icon="globe"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
          <Input
            placeholder="Cidade"
            icon="location-arrow"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
          />
        </Content>
        <Button
          activeOpacity={0.8}
          onPress={pickDocument}
          style={{
            backgroundColor: color.primary,
          }}
        >
          {curriculum ? (
            <FontAwesome name="check" color={color.background} size={20} />
          ) : (
            <ButtonText>CURRICULO</ButtonText>
          )}
        </Button>
        <Button activeOpacity={0.8} onPress={() => navigate('Profile')}>
          <ButtonText>CONCLUIR</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

export default AddVacancy;
