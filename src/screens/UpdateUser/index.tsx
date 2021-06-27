/* eslint-disable no-param-reassign */
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  createRef,
  useState,
  useRef,
  useEffect,
} from 'react';

import { TextInput, ScrollView, Linking, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import { color } from '../../constants';
import { UpdateUserValidateShape } from '../../utils/validation';

import {
  HeaderContainer,
  Header,
  GoBackButton,
  Button,
  ButtonText,
  Container,
  Title,
  Form,
  Error,
  Select,
  CreateCurriculum,
  CreateCurriculumText,
  FooterContainer,
} from './styles';

import Input from '../../components/Input';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

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

function UpdateUser() {
  const { goBack, navigate } = useNavigation();

  const { data } = useAuth();

  const scrollRef = useRef<ScrollView>();

  const describeRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();

  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [states, setStates] = useState<StatesProps[]>([]);
  const [cities, setCities] = useState<CitiesProps[]>([]);

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

  const handleUpdateUser = useCallback(
    async values => {
      ToastAndroid.show('Atualizando perfil', ToastAndroid.SHORT);

      try {
        await api.put('accounts', {
          name: values.firstname,
          description: values.about,
          phone_number: values.phone,
          category_id: values.interests_id,
          city_name: values.city,
          state_name: values.state,
        });

        ToastAndroid.show('Perfil atualizado com sucesso', ToastAndroid.SHORT);

        navigate('Profile');
      } catch (error) {
        ToastAndroid.show(
          'Houve um erro ao atualizar perfil, tente mais tarde.',
          ToastAndroid.SHORT,
        );
      }
    },
    [navigate],
  );

  const LinkingToCreateCurriculum = useCallback(async () => {
    await Linking.openURL('https://geracurriculo.com.br/');
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
      <Form ref={scrollRef} contentContainerStyle={{ alignItems: 'center' }}>
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
            image: '' || data?.avatar,
            firstname: '' || data?.name,
            about: '' || data?.description,
            interests_id: '' || data?.category.id,
            interests: '' || data?.category.name,
            phone: '' || data?.phone_number,
            state: '' || data?.city.state.name,
            city: '' || data?.city.name,
          }}
          onSubmit={values => handleUpdateUser(values)}
          validationSchema={UpdateUserValidateShape}
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
                onFocus={() =>
                  scrollRef.current?.scrollTo({
                    y: hp(40),
                    animated: true,
                  })
                }
                onSubmitEditing={() => phoneRef.current?.focus()}
                value={values.firstname}
                error={touched.firstname && errors.firstname}
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
                    y: hp(50),
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
                    y: hp(80),
                    animated: true,
                  })
                }
              />

              <Select
                onValueChange={(itemValue: any) => {
                  setFieldValue('interests', itemValue.name);
                  setFieldValue('interests_id', itemValue.id);
                }}
              >
                <Select.Item
                  label={values.interests}
                  value={{ name: values.interests, id: values.interests_id }}
                />

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
                <Select.Item
                  label={
                    values.state[0].toUpperCase() + values.state?.substring(1)
                  }
                  value={values.state}
                />
                {states.map(state => (
                  <Select.Item
                    label={`${state.nome} - ${state.sigla}`}
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
                <Select.Item
                  label={
                    values.city[0].toUpperCase() + values.city?.substring(1)
                  }
                  value={values.city}
                />
                {cities.map(city => (
                  <Select.Item label={city.nome} value={city.nome} />
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
                <ButtonText>SALVAR ALTERAÇÕES</ButtonText>
              </Button>

              <ButtonText style={{ color: color.primary, marginBottom: 4 }}>
                OU
              </ButtonText>

              <FooterContainer>
                <CreateCurriculum onPress={() => navigate('ChangePassword')}>
                  <CreateCurriculumText>Alterar Senha</CreateCurriculumText>
                </CreateCurriculum>
                <CreateCurriculum
                  onPress={() => navigate('SubmitAvatar', { update: true })}
                >
                  <CreateCurriculumText>Alterar Imagem</CreateCurriculumText>
                </CreateCurriculum>
              </FooterContainer>
              <CreateCurriculum
                onPress={() => navigate('SubmitCurriculum', { update: true })}
              >
                <CreateCurriculumText>Atualizar Curriculo</CreateCurriculumText>
              </CreateCurriculum>
              <CreateCurriculum onPress={LinkingToCreateCurriculum}>
                <CreateCurriculumText>
                  Curriculo desatualizado? Clique aqui e gere um novo!
                </CreateCurriculumText>
              </CreateCurriculum>
            </>
          )}
        </Formik>
      </Form>
    </Container>
  );
}

export default UpdateUser;
