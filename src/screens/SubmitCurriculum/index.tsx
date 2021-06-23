/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView, Linking, ToastAndroid } from 'react-native';

import {
  Container,
  Form,
  Header,
  HeaderContainer,
  Title,
  Button,
  ButtonText,
  CreateCurriculum,
  CreateCurriculumText,
} from './styles';

import { color } from '../../constants';
import api from '../../services/api';

function SubmitCurriculum() {
  const { navigate } = useNavigation();

  const [curriculum, setCurriculum] = useState<string>();

  const scrollRef = useRef<ScrollView>();

  const pickDocument = useCallback(async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      multiple: false,
    }).then(response => {
      if (response.type === 'success') {
        setCurriculum(response);
      }
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!curriculum) {
      ToastAndroid.show('É necessário enviar curriculo.', ToastAndroid.SHORT);
      return;
    }
    try {
      ToastAndroid.show('Enviando curriculo.', ToastAndroid.SHORT);
      // eslint-disable-next-line no-undef
      const data = new FormData();

      data.append('curriculum', {
        curriculum,
      });

      await api.patch('accounts/curriculum', {
        data,
      });

      navigate('SingIn');
      ToastAndroid.show('Cadastro concluido com sucesso.', ToastAndroid.SHORT);
    } catch (err) {
      console.log(err.message);
      ToastAndroid.show(
        'Houve um erro ao cadastrar-se, tente mais tarde.',
        ToastAndroid.SHORT,
      );
    }
  }, [navigate, curriculum]);

  const LinkingToCreateCurriculum = useCallback(async () => {
    await Linking.openURL('https://geracurriculo.com.br/');
  }, []);

  return (
    <Container>
      <Form contentContainerStyle={{ alignItems: 'center' }} ref={scrollRef}>
        <HeaderContainer>
          <Header>
            <Title>Envie seu curriculo para concluir o seu cadastro!</Title>
          </Header>
        </HeaderContainer>

        <Button
          activeOpacity={0.8}
          onPress={pickDocument}
          style={{
            backgroundColor: color.primary,
          }}
        >
          {curriculum ? (
            <FontAwesome name="check" color={color.background} size={20} />
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
      </Form>
    </Container>
  );
}

export default SubmitCurriculum;
