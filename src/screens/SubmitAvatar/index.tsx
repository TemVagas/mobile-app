/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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

interface ParamsProps {
  update?: boolean | undefined;
}

function SubmitAvatar() {
  const { navigate } = useNavigation();

  const { params } = useRoute();

  const [updateParams, setUpdateParms] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (params) {
      const { update } = params as ParamsProps;
      setUpdateParms(update);
    }
  }, [params]);

  const [image, setImage] = useState<string>();
  const [fileName, setFileName] = useState<string>('');

  const scrollRef = useRef<ScrollView>();

  const pickImage = useCallback(async setFieldValue => {
    const responsePicker = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (responsePicker.cancelled) {
      return;
    }

    setFileName(String(responsePicker.uri.split('/').pop()));
    setImage(responsePicker.uri);
    setFieldValue('image', responsePicker.uri);
  }, []);

  const handleSignUp = useCallback(
    async values => {
      ToastAndroid.show('Enviando imagem, aguarde...', ToastAndroid.SHORT);
      // eslint-disable-next-line no-undef
      const data = new FormData();

      data.append('avatar', {
        name: fileName,
        type: 'image/jpg',
        uri: image,
      } as any);

      api
        .patch('accounts/avatar', data)
        .then(() => {
          if (updateParams) {
            ToastAndroid.show(
              'Imagem atualizada com sucesso.',
              ToastAndroid.SHORT,
            );
            navigate('Profile');
          } else {
            ToastAndroid.show(
              'Imagem enviada com sucesso.',
              ToastAndroid.SHORT,
            );
            navigate('SubmitCurriculum');
          }
        })
        .catch(error => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
    },
    [navigate, image, fileName, updateParams],
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
          <Title>
            {updateParams
              ? 'Atualize sua foto de perfil'
              : 'Nos envie uma foto sua para seguir para proxima etapa.'}
          </Title>
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
                <ButtonText>
                  {updateParams ? 'ATUALIZAR' : 'PRÓXIMO'}
                </ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default SubmitAvatar;
