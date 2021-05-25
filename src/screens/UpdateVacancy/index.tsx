/* eslint-disable no-param-reassign */
import React, { createRef, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { ScrollView, TextInput } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {
  Container,
  Form,
  Logo,
  Button,
  ButtonText,
  Select,
  Error,
} from './styles';

import Input from '../../components/Input';

import { UpdateVacancyValidateShape } from '../../utils/validation';

function UpdateVacancy() {
  const { goBack } = useNavigation();

  const scrollRef = useRef<ScrollView>();

  const descriptionRef = createRef<TextInput>();
  const emailRef = createRef<TextInput>();
  const phoneRef = createRef<TextInput>();
  const remunerationRef = createRef<TextInput>();

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
      console.log(values);
      goBack();
    },
    [goBack],
  );
  return (
    <Container>
      <Logo>JobFinder - Atualizar</Logo>

      <Formik
        initialValues={{
          title: '',
          description: '',
          email: '',
          phone: '',
          remuneration: '',
          state: '',
          city: '',
          type: '',
          category: '',
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
              placeholder="Titulo"
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
              placeholder="Descrição"
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
            <Input
              reference={remunerationRef}
              placeholder="Remuneração"
              icon="money"
              returnKeyType="next"
              keyboardType="number-pad"
              autoCorrect={false}
              onChangeText={text => setFieldValue('remuneration', text)}
              onBlur={handleBlur('remuneration')}
              value={values.remuneration}
              error={touched.remuneration && errors.remuneration}
              onFocus={() =>
                scrollRef.current?.scrollTo({
                  y: hp(32),
                  animated: true,
                })
              }
            />

            <Select
              onValueChange={itemValue => setFieldValue('type', itemValue)}
            >
              <Select.Item label="Declare o tipo da vaga" value="" />
              <Select.Item label="PJ" value="1" />
              <Select.Item label="CLT" value="2" />
              <Select.Item label="Traine" value="3" />
              <Select.Item label="Estágio" value="4" />
              <Select.Item label="Freelancer" value="5" />
            </Select>
            {errors.type && touched.type ? (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                {errors.type}
              </Error>
            ) : (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }} />
            )}

            <Select
              onValueChange={itemValue => setFieldValue('category', itemValue)}
            >
              <Select.Item label="Declare a categoria da vaga" value="" />
              <Select.Item label="Medico" value="1" />
              <Select.Item label="Desenvolvimento de Software" value="2" />
              <Select.Item label="Nutricionista" value="3" />
              <Select.Item label="Engenheiro Eletrico" value="4" />
            </Select>
            {errors.category && touched.category ? (
              <Error style={{ alignSelf: 'flex-start', marginLeft: wp(6) }}>
                {errors.category}
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
