/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform, ScrollView, ToastAndroid } from 'react-native';
import { Formik } from 'formik';

import {
  Container,
  Form,
  HeaderContainer,
  StyledImage,
  Title,
  Content,
  Button,
  ButtonText,
  CameraIcon,
  ButtonCamera,
  Error,
} from './styles';

import { AvatarValidateShape } from '../../utils/validation';

import { color } from '../../constants';
import api from '../../services/api';

function SubmitAvatar() {
  const { navigate } = useNavigation();

  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<any>();

  const scrollRef = useRef<ScrollView>();

  const pickImage = useCallback(async setFieldValue => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    }).then(response => {
      if (!response.cancelled) {
        setFile({
          filename: response.uri.split('/').pop(),
          type: 'image/jpg',
          uri: response.uri,
        });
        setImage(response.uri);
        setFieldValue('image', response.uri);
      }
    });
  }, []);

  const handleSignUp = useCallback(
    async values => {
      ToastAndroid.show('Enviando imagem.', ToastAndroid.SHORT);
      // try {
      // eslint-disable-next-line no-undef
      const data = new FormData();

      data.append('avatar', {
        name: `image_${file.filename}`,
        type: file.type,
        uri: file.uri,
      });

      console.log(data);

      await api
        .patch('accounts/avatar', {
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error.response.data);
        });

      // console.log(response);

      // navigate('SubmitCurriculum');
      // ToastAndroid.show(
      //   'Envio de imagem concluido com sucesso.',
      //   ToastAndroid.SHORT,
      // );
      // } catch (err) {
      //   console.log(err.data);
      //   console.log(err.message);
      //   console.log(err);

      //   ToastAndroid.show(
      //     'Houve um erro ao cadastrar-se, tente mais tarde.',
      //     ToastAndroid.SHORT,
      //   );
      // }
    },
    [navigate, file],
  );

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

  return (
    <Container>
      <Form contentContainerStyle={{ alignItems: 'center' }} ref={scrollRef}>
        <HeaderContainer>
          <Title>Nos envie uma foto sua para seguir para proxima etapa.</Title>
        </HeaderContainer>
        <Formik
          initialValues={{
            image: '',
          }}
          onSubmit={values => handleSignUp(values)}
          validationSchema={AvatarValidateShape}
        >
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <>
              <Content>
                <ButtonCamera
                  onPress={() => pickImage(setFieldValue)}
                  activeOpacity={1}
                >
                  {touched.image && errors.image ? (
                    <StyledImage
                      source={{
                        uri:
                          'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png',
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <StyledImage
                      source={{
                        uri:
                          image ||
                          'https://www.pngkit.com/png/detail/349-3499697_man-placeholder-blank-avatar-icon-png.png',
                      }}
                      resizeMode="cover"
                    />
                  )}

                  <CameraIcon>
                    <FontAwesome
                      name="camera-retro"
                      color={color.background}
                      size={18}
                    />
                  </CameraIcon>
                </ButtonCamera>
              </Content>
              {errors.image && <Error>{errors.image}</Error>}

              <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
                <ButtonText>PRÓXIMO</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default SubmitAvatar;
