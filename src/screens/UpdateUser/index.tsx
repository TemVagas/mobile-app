import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  createRef,
  useState,
  useRef,
  useEffect,
} from 'react';

import { TextInput, ScrollView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { color } from '../../constants';
import { Formik } from 'formik';
import { SignUpValidateShape } from '../../utils/validation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  Error,
} from './styles';

import Input from '../../components/Input';

function UpdateUser() {
  const { goBack, navigate } = useNavigation();

  const emailRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();
  const newPassRef = createRef<TextInput>();

  const [image, setImage] = useState<string>();

  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [newPasswordIsVisible, setNewPasswordIsVisible] = useState(true);

  const scrollRef = useRef<ScrollView>();

  const pickImage = useCallback(async setFieldValue => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    }).then(response => {
      if (!response.cancelled) {
        setImage(response.uri);
        setFieldValue('image', response.uri);
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
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            image: '',
            email: '',
            password: '',
            newPassword: '',
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
            setFieldValue,
          }) => (
            <>
              <Content>
                <ButtonCamera
                  onPress={() => pickImage(setFieldValue)}
                  activeOpacity={1}
                >
                  {touched.image && errors.image ? (
                    <StyledImage
                      source={{
                        uri: 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png',
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

              <Input
                reference={emailRef}
                placeholder="E-mail"
                icon="user"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(50),
                    animated: true,
                  })
                }
                onSubmitEditing={() => passRef.current?.focus()}
              />
              <Input
                reference={passRef}
                placeholder="Senha"
                icon="lock"
                secureTextEntry={passwordIsVisible}
                passwordIsVisible={passwordIsVisible}
                setPasswordIsVisible={setPasswordIsVisible}
                returnKeyType="next"
                keyboardType="visible-password"
                autoCorrect={false}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(65),
                    animated: true,
                  })
                }
                onSubmitEditing={() => newPassRef.current?.focus()}
              />
              <Input
                reference={newPassRef}
                placeholder="Nova Senha"
                icon="lock"
                secureTextEntry={newPasswordIsVisible}
                passwordIsVisible={newPasswordIsVisible}
                setPasswordIsVisible={setNewPasswordIsVisible}
                returnKeyType="done"
                keyboardType="visible-password"
                autoCorrect={false}
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                error={touched.newPassword && errors.newPassword}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(65),
                    animated: true,
                  })
                }
                onSubmitEditing={() =>
                  scrollRef.current?.scrollToEnd({
                    animated: true,
                  })
                }
              />

              <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
                <ButtonText>SALVAR ALTERAÇÕES</ButtonText>
              </Button>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default UpdateUser;
