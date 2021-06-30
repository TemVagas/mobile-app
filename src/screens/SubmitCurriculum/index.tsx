/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { ScrollView, Linking, ToastAndroid } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../constants';

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

import api from '../../services/api';

interface ParamsProps {
  update?: boolean | undefined;
}

function SubmitCurriculum() {
  const { navigate } = useNavigation();

  const [updateParams, setUpdateParms] = useState<boolean | undefined>(false);

  const { params } = useRoute();

  useEffect(() => {
    if (params) {
      const { update } = params as ParamsProps;
      setUpdateParms(update);
    }
  }, [params]);

  const [curriculum, setCurriculum] = useState<any>();

  const scrollRef = useRef<ScrollView>();

  const pickDocument = useCallback(async () => {
    const responsePicker = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      multiple: false,
    });

    if (responsePicker.type === 'cancel') {
      return;
    }
    setCurriculum(responsePicker);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!curriculum) {
      ToastAndroid.show('É necessário enviar curriculo.', ToastAndroid.SHORT);
      return;
    }

    ToastAndroid.show('Enviando curriculo, aguarde...', ToastAndroid.SHORT);
    // eslint-disable-next-line no-undef
    const data = new FormData();

    data.append('curriculum', {
      name: 'curriculo',
      type: 'application/pdf',
      uri: curriculum.uri,
    } as any);

    await api
      .patch('accounts/curriculum', data)
      .then(() => {
        if (updateParams) {
          navigate('Profile');
          ToastAndroid.show(
            'Curriculo atualizado com sucesso.',
            ToastAndroid.SHORT,
          );
        } else {
          navigate('SingIn');
          ToastAndroid.show(
            'Cadastro concluido com sucesso.',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(error => {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
  }, [navigate, curriculum, updateParams]);

  const LinkingToCreateCurriculum = useCallback(async () => {
    await Linking.openURL('https://geracurriculo.com.br/');
  }, []);

  return (
    <Container>
      <Form contentContainerStyle={{ alignItems: 'center' }} ref={scrollRef}>
        <HeaderContainer>
          <Header>
            <Title>
              {updateParams
                ? 'Nos envie o seu curriculo para podermos atualiza-lo'
                : 'Envie seu curriculo para concluir o seu cadastro!'}
            </Title>
          </Header>
        </HeaderContainer>

        <Button
          activeOpacity={0.8}
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            backgroundColor: 'transparent',
            height: hp(18),
          }}
          onPress={pickDocument}
        >
          {curriculum ? (
            <>
              <FontAwesome name="check" color={color.success} size={hp(8)} />

              <ButtonText style={{ color: color.primary }}>
                Curriculo carregado
              </ButtonText>
            </>
          ) : (
            <>
              <FontAwesome name="download" color={color.primary} size={hp(8)} />

              <ButtonText style={{ color: color.primary }}>
                Selecione seu curriculo
              </ButtonText>
            </>
          )}
        </Button>
        <CreateCurriculum onPress={LinkingToCreateCurriculum}>
          <CreateCurriculumText>
            Não possui curriculo? Clique aqui e crie o seu!
          </CreateCurriculumText>
        </CreateCurriculum>
        <Button activeOpacity={0.8} onPress={() => handleSubmit()}>
          <ButtonText>{updateParams ? 'Atualizar' : 'CONCLUIR'}</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

export default SubmitCurriculum;
