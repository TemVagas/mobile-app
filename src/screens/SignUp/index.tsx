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
import {
  Alert,
  Platform,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { Formik } from 'formik';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import axios from 'axios';
import {
  Container,
  Form,
  GoBackButton,
  Header,
  HeaderContainer,
  Title,
  Button,
  ButtonText,
  Error,
  Select,
} from './styles';

import Input from '../../components/Input';

import { SignUpValidateShape } from '../../utils/validation';

import { color } from '../../constants';
import api from '../../services/api';

interface CategoriesProps {
  id: string;
  name: string;
}

interface StatesProps {
  id: string;
  sigla: string;
  nome: string;
}

interface CitiesProps {
  id: number;
  nome: string;
}

function SignUp() {
  const { goBack, navigate } = useNavigation();

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [states, setStates] = useState<StatesProps[]>([]);
  const [cities, setCities] = useState<CitiesProps[]>([]);
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);

  const lastNameRef = createRef<TextInput>();
  const passRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const describeRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();

  const scrollRef = useRef<ScrollView>();

  const handleSignUp = useCallback(
    async values => {
      ToastAndroid.show('Enviando informações.', ToastAndroid.SHORT);
      api
        .post('accounts', {
          category_id: values.interests_id,
          description: values.about,
          email: values.email.toLowerCase(),
          password: values.password,
          name: `${values.firstname} ${values.lastname}`,
          phone_number: values.phone,
          city_name: values.city,
          state_name: values.state,
        })
        .then(() => {
          api
            .post('sessions', {
              email: values.email.toLowerCase(),
              password: values.password,
            })
            .then(response => {
              const { token } = response.data;

              api.defaults.headers.Authorization = `Bearer ${token}`;

              ToastAndroid.show(
                'Primeira etapa do cadastro concluida.',
                ToastAndroid.SHORT,
              );
              navigate('SubmitAvatar');
            })
            .catch(error => {
              ToastAndroid.show(
                error.response.data.message,
                ToastAndroid.SHORT,
              );
            });
        })
        .catch(error => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
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

  const loadCities = useCallback(async state => {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.sigla}/distritos`,
    );
    setCities(response.data);
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const response = await api.get('categories');
      setCategories(response.data);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadStates() {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      setStates(response.data);
    }
    loadStates();
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
            firstname: '',
            lastname: '',
            about: '',
            interests_id: '',
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
              <Input
                placeholder="Nome"
                icon="address-book"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                onChangeText={handleChange('firstname')}
                onBlur={handleBlur('firstname')}
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
              />
              <Select
                onValueChange={(itemValue: any) => {
                  setFieldValue('interests', itemValue.name);
                  setFieldValue('interests_id', itemValue.id);
                }}
              >
                <Select.Item label="Declare sua area de interesse" value="" />
                {categories.map(category => (
                  <Select.Item label={category.name} value={category} />
                ))}
              </Select>
              {errors.interests && touched.interests ? (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                  {errors.interests}
                </Error>
              ) : (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
              )}

              <Select
                onValueChange={itemValue => {
                  setFieldValue('state', itemValue.nome);
                  loadCities(itemValue);
                }}
              >
                <Select.Item label="Selecione um estado" value="" />
                {states.map(state => (
                  <Select.Item
                    key={state.id}
                    label={state.nome}
                    value={state}
                  />
                ))}
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
                {cities.map(city => (
                  <Select.Item
                    key={city.id}
                    label={city.nome}
                    value={city.nome}
                  />
                ))}
              </Select>
              {errors.city && touched.city ? (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                  {errors.city}
                </Error>
              ) : (
                <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
              )}

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

export default SignUp;
