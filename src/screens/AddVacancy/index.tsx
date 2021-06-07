/* eslint-disable no-param-reassign */
import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScrollView, TextInput, Switch, ToastAndroid } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import axios from 'axios';
import {
  Container,
  Logo,
  Form,
  Button,
  ButtonText,
  Select,
  Error,
  SwitchContainer,
  SwitchText,
} from './styles';

import { AddVacancyValidateShape } from '../../utils/validation';

import Input from '../../components/Input';
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

function AddVacancy() {
  const { goBack } = useNavigation();

  const scrollRef = useRef<ScrollView>();

  const descriptionRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();
  const remunerationRef = createRef<TextInput>();

  const [remunerationIsEnabled, setRemunerationIsEnabled] = useState(false);
  const [representsIsEnabled, setRepresentsIsEnabled] = useState(false);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [states, setStates] = useState<StatesProps[]>([]);
  const [cities, setCities] = useState<CitiesProps[]>([]);

  const toggleRemunerationSwitch = () =>
    setRemunerationIsEnabled(previousState => !previousState);
  const toggleRepresentsSwitch = () =>
    setRepresentsIsEnabled(previousState => !previousState);

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

  const handleCreateVacancy = useCallback(
    async values => {
      ToastAndroid.show('Anunciando vaga.', ToastAndroid.SHORT);
      try {
        await api.post('jobs', {
          title: values.title,
          description: values.description,
          email: values.email,
          phone_number: values.phone,
          type: values.type,
          category_id: values.category_id,
          city_name: values.city,
          state_name: values.state,
          remuneration_value: Number(values.remuneration),
          represents: values.represents,
        });
        goBack();
        ToastAndroid.show('Vaga criada.', ToastAndroid.SHORT);
      } catch (err) {
        ToastAndroid.show(
          'Houve um erro ao anunciar vaga, tente mais tarde.',
          ToastAndroid.SHORT,
        );
      }
    },
    [goBack],
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
      <Logo>Anunciar Vaga</Logo>
      <Formik
        initialValues={{
          title: '',
          description: '',
          email: '',
          phone: '',
          remuneration: 0,
          state: '',
          city: '',
          type: '',
          represents: '',
          category: '',
          category_id: '',
        }}
        onSubmit={values => handleCreateVacancy(values)}
        validationSchema={AddVacancyValidateShape}
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
              <Select.Item label="Declare o tipo da vaga" value="" />
              <Select.Item label="PJ" value="PJ" />
              <Select.Item label="CLT" value="CLT" />
              <Select.Item label="Traine" value="Traine" />
              <Select.Item label="Estágio" value="Estágio" />
              <Select.Item label="Freelancer" value="Freelancer" />
              <Select.Item label="Ajuda" value="Ajuda" />
            </Select>
            {errors.type && touched.type ? (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                {errors.type}
              </Error>
            ) : (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
            )}

            <Select
              onValueChange={(itemValue: any) => {
                setFieldValue('category', itemValue.name);
                setFieldValue('category_id', itemValue.id);
              }}
            >
              <Select.Item label="Declare a categoria da vaga" value="" />
              {categories.map(category => (
                <Select.Item label={category.name} value={category} />
              ))}
            </Select>
            {errors.category && touched.category ? (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                {errors.category}
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
              <Select.Item label="Selecione uma cidade" value="" />
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
                value={values.remuneration}
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
              <ButtonText>ANUNCIAR</ButtonText>
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default AddVacancy;
