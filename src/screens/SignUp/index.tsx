/* eslint-disable no-param-reassign */
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert, Platform, ScrollView, TextInput, Linking } from 'react-native';
import { Formik } from 'formik';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  Error,
  Select,
  CreateCurriculum,
  CreateCurriculumText,
} from './styles';

import Input from '../../components/Input';

import { SignUpValidateShape } from '../../utils/validation';

import { color } from '../../constants';

function SignUp() {
  const { goBack, navigate } = useNavigation();

  const [image, setImage] = useState<string>();
  const [curriculum, setCurriculum] = useState<string>();
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const lastNameRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const describeRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();

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

  const maskPhone = (value: string) => {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1)$2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value;
  };

  const handleMaskPhone = useCallback((text: string, setFieldValue) => {
    const value = maskPhone(text);
    setFieldValue('phone', value);
  }, []);

  const LinkingToCreateCurriculum = useCallback(async () => {
    await Linking.openURL('https://www.google.com/');
  }, []);

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
              <Input
                placeholder="Nome"
                icon="address-book"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(20),
                    animated: true,
                  })
                }
                onSubmitEditing={() => lastNameRef.current?.focus()}
                value={values.firstname}
                error={touched.firstname && errors.firstname}
              />
              <Input
                reference={lastNameRef}
                placeholder="Sobrenome"
                icon="address-book"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                value={values.lastname}
                error={touched.lastname && errors.lastname}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(35),
                    animated: true,
                  })
                }
                onSubmitEditing={() => emailRef.current?.focus()}
              />
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
                returnKeyType="done"
                keyboardType="default"
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
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
              <Input
                reference={phoneRef}
                placeholder="Telefone"
                icon="phone"
                maxLength={14}
                returnKeyType="next"
                keyboardType="number-pad"
                autoCorrect={false}
                onChangeText={text => handleMaskPhone(text, setFieldValue)}
                onBlur={handleBlur('phone')}
                value={values.phone}
                error={touched.phone && errors.phone}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(80),
                    animated: true,
                  })
                }
                onSubmitEditing={() => describeRef.current?.focus()}
              />
              <Input
                reference={describeRef}
                multiline
                placeholder="Nos conte sobre você"
                icon="address-card"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('about')}
                onBlur={handleBlur('about')}
                value={values.about}
                error={touched.about && errors.about}
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(95),
                    animated: true,
                  })
                }
              />

              <Select
                onValueChange={itemValue =>
                  setFieldValue('interests', itemValue)
                }
              >
                <Select.Item label="Declare sua area de interesse" value="" />
                <Select.Item label="Medico" value="1" />
                <Select.Item label="Desenvolvimento de Software" value="2" />
                <Select.Item label="Nutricionista" value="3" />
                <Select.Item label="Engenheiro Eletrico" value="4" />
              </Select>
              {errors.interests && touched.interests ? (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                  {errors.interests}
                </Error>
              ) : (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
              )}

              <Select
                onValueChange={itemValue => setFieldValue('state', itemValue)}
              >
                <Select.Item label="Selecione um estado" value="" />
                <Select.Item label="Piaui" value="1" />
                <Select.Item label="São Paulo" value="2" />
                <Select.Item label="Fortaleza" value="3" />
                <Select.Item label="Pernambuco" value="4" />
              </Select>
              {errors.state && touched.state ? (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                  {errors.state}
                </Error>
              ) : (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
              )}

              <Select
                onValueChange={itemValue => setFieldValue('city', itemValue)}
              >
                <Select.Item label="Selecione uma cidade" value="" />
                <Select.Item label="Picos" value="1" />
                <Select.Item label="Araripina" value="2" />
                <Select.Item label="Crato" value="3" />
                <Select.Item label="Teresina" value="4" />
              </Select>
              {errors.city && touched.city ? (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                  {errors.city}
                </Error>
              ) : (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
              )}

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
              <CreateCurriculum onPress={LinkingToCreateCurriculum}>
                <CreateCurriculumText>
                  Não possui curriculo? Clique aqui e crie o seu!
                </CreateCurriculumText>
              </CreateCurriculum>
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
