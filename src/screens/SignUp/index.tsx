import React, { createRef, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Platform, TextInput } from 'react-native';
import { Formik } from 'formik';

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

import { SignUpValidateShape } from '../../utils/validation';

import { color } from '../../constants';

function SignUp() {
  const { goBack, navigate } = useNavigation();

  const [image, setImage] = useState<string>();
  const [curriculum, setCurriculum] = useState<string>();
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const passRef = createRef<TextInput>();

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

  const handleSignUp = useCallback(
    async values => {
      console.log(values);
      navigate('Profile');
    },
    [navigate],
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
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            about: '',
            interests: '',
            email: '',
            password: '',
            phone: '',
            state: '',
            city: '',
          }}
          onSubmit={values => handleSignUp(values)}
          validationSchema={SignUpValidateShape}
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
              </Content>

              <Input
                placeholder="Nome"
                icon="address-book"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                value={values.firstname}
                error={touched.firstname && errors.firstname}
              />

              <Input
                placeholder="Sobrenome"
                icon="address-book"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
                error={touched.lastname && errors.lastname}
              />
              <Input
                placeholder="E-mail"
                icon="user"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
              />
              <Input
                reference={passRef}
                placeholder="Senha"
                icon="lock"
                secureTextEntry={passwordIsVisible}
                passwordIsVisible={passwordIsVisible}
                setPasswordIsVisible={setPasswordIsVisible}
                onSubmitEditing={() => handleSubmit()}
                returnKeyType="done"
                keyboardType="visible-password"
                autoCorrect={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
              />
              <Input
                placeholder="Nos conte sobre você"
                icon="address-card"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
                error={touched.about && errors.about}
              />
              <Input
                placeholder="Seus interesses"
                icon="list"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('interests')}
                onBlur={handleBlur('interests')}
                value={values.interests}
                error={touched.interests && errors.interests}
              />

              <Input
                placeholder="Telefone"
                icon="phone"
                returnKeyType="next"
                keyboardType="number-pad"
                autoCorrect={false}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                error={touched.phone && errors.phone}
              />
              <Input
                placeholder="Estado"
                icon="globe"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
                error={touched.state && errors.state}
              />
              <Input
                placeholder="Cidade"
                icon="location-arrow"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                value={values.city}
                error={touched.city && errors.city}
              />
              <Button
                activeOpacity={0.8}
                onPress={pickDocument}
                style={{
                  backgroundColor: color.primary,
                }}
              >
                {curriculum ? (
                  <FontAwesome
                    name="check"
                    color={color.background}
                    size={20}
                  />
                ) : (
                  <ButtonText>CURRICULO</ButtonText>
                )}
              </Button>
              <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
                <ButtonText>CONCLUIR</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default SignUp;
