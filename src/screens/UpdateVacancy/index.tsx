/* eslint-disable no-param-reassign */
import React, { createRef, useCallback, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScrollView, TextInput, Switch, ToastAndroid } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import axios from 'axios';
import { useEffect } from 'react';
import {
  Container,
  Form,
  Logo,
  Button,
  ButtonText,
  Select,
  Error,
  SwitchContainer,
  SwitchText,
} from './styles';

import Input from '../../components/Input';

import { UpdateVacancyValidateShape } from '../../utils/validation';
import { color } from '../../constants';

import { JobsProps } from '../Profile';
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

function UpdateVacancy() {
  const { params } = useRoute();

  const job = params as JobsProps;

  const { navigate } = useNavigation();

  const scrollRef = useRef<ScrollView>();

  const descriptionRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();
  const remunerationRef = createRef<TextInput>();

  const [remunerationIsEnabled, setRemunerationIsEnabled] = useState(false);
  const [representsIsEnabled, setRepresentsIsEnabled] = useState(false);

  const toggleRemunerationSwitch = () =>
    setRemunerationIsEnabled(previousState => !previousState);
  const toggleRepresentsSwitch = () =>
    setRepresentsIsEnabled(previousState => !previousState);

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

  const handleUpdateVacancy = useCallback(
    async values => {
      ToastAndroid.show('Atualizando vaga', ToastAndroid.SHORT);

      try {
        await api.put(`jobs/${job.id}`, {
          description: values.description,
          email: values.email,
          title: values.title,
          phone_number: values.phone,
          category_id: values.interests_id,
          city_name: values.city,
          state_name: values.state,
          remuneration_value: values.remuneration,
          type: values.type,
          represents: values.represents,
        });

        ToastAndroid.show('Vaga atualizada com sucesso', ToastAndroid.SHORT);

        navigate('Profile');
      } catch (error) {
        ToastAndroid.show(
          'Houve um erro ao atualizar vaga, tente mais tarde.',
          ToastAndroid.SHORT,
        );
      }
    },
    [navigate, job.id],
  );

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
      <Logo>Atualizar Vaga</Logo>

      <Formik
        initialValues={{
          title: job.title,
          description: job.description,
          email: job.email,
          phone: job.phone_number,
          remuneration: job.remuneration_value,
          state: job.city.state.name,
          city: job.city.name,
          type: job.type,
          represents: job.represents,
          interests: job.category.name,
          interests_id: job.category.id,
        }}
        onSubmit={values => handleUpdateVacancy(values)}
        validationSchema={UpdateVacancyValidateShape}
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
          <Form
            contentContainerStyle={{ alignItems: 'center' }}
            ref={scrollRef}
          >
            <Input
              placeholder="Titulo da vaga"
              icon="address-card"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              onSubmitEditing={() => descriptionRef.current?.focus()}
              value={values.title}
              error={touched.title && errors.title}
            />

            <Input
              reference={descriptionRef}
              placeholder="Descrição da vaga"
              multiline
              icon="file"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              onSubmitEditing={() => emailRef.current?.focus()}
              value={values.description}
              error={touched.description && errors.description}
              onFocus={() =>
                scrollRef.current?.scrollTo({
                  y: hp(8),
                  animated: true,
                })
              }
            />
            <Input
              reference={emailRef}
              placeholder="E-mail para contato"
              icon="user"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              onSubmitEditing={() => phoneRef.current?.focus()}
              value={values.email}
              error={touched.email && errors.email}
              onFocus={() =>
                scrollRef.current?.scrollTo({
                  y: hp(16),
                  animated: true,
                })
              }
            />
            <Input
              reference={phoneRef}
              placeholder="Telefone para contato"
              icon="phone"
              maxLength={14}
              returnKeyType="next"
              keyboardType="number-pad"
              autoCorrect={false}
              onChangeText={text => handleMaskPhone(text, setFieldValue)}
              onBlur={handleBlur('phone')}
              onSubmitEditing={() => remunerationRef.current?.focus()}
              value={values.phone}
              error={touched.phone && errors.phone}
              onFocus={() =>
                scrollRef.current?.scrollTo({
                  y: hp(24),
                  animated: true,
                })
              }
            />

            <Select
              onValueChange={itemValue => setFieldValue('type', itemValue)}
            >
              <Select.Item label={job.type} value={job.type} />
              <Select.Item label="PJ" value="PJ" />
              <Select.Item label="CLT" value="CLT" />
              <Select.Item label="Traine" value="Traine" />
              <Select.Item label="Estágio" value="Estágio" />
              <Select.Item label="Freelancer" value="Freelancer" />
            </Select>
            {errors.type && touched.type ? (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                {errors.type}
              </Error>
            ) : (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
            )}

            <Select
              onValueChange={itemValue => {
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
                label={values.city[0].toUpperCase() + values.city?.substring(1)}
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

            <SwitchContainer>
              <SwitchText>Salario a combinar?</SwitchText>

              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={remunerationIsEnabled ? color.primary : '#f4f3f4'}
                onValueChange={toggleRemunerationSwitch}
                value={remunerationIsEnabled}
              />
            </SwitchContainer>

            {!remunerationIsEnabled && (
              <Input
                placeholder="Insira o salario ofertado"
                icon="money"
                returnKeyType="next"
                keyboardType="number-pad"
                autoCorrect={false}
                onChangeText={text => {
                  setFieldValue('remuneration', text);
                }}
                onBlur={handleBlur('remuneration')}
                value={String(values.remuneration)}
                onFocus={() =>
                  scrollRef.current?.scrollToEnd({
                    animated: true,
                  })
                }
              />
            )}

            <SwitchContainer>
              <SwitchText>Representa alguma empresa?</SwitchText>

              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={representsIsEnabled ? color.primary : '#f4f3f4'}
                onValueChange={toggleRepresentsSwitch}
                value={representsIsEnabled}
              />
            </SwitchContainer>

            {representsIsEnabled && (
              <Input
                placeholder="Representa qual empresa?"
                icon="building"
                autoCorrect={false}
                onChangeText={text => {
                  setFieldValue('represents', text);
                }}
                onBlur={handleBlur('represents')}
                value={values.represents}
                onFocus={() =>
                  scrollRef.current?.scrollToEnd({
                    animated: true,
                  })
                }
              />
            )}

            <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
              <ButtonText>ATUALIZAR</ButtonText>
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default UpdateVacancy;
