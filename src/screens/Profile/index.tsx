import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Animated, ToastAndroid } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';

import { useAuth } from '../../contexts/auth';

import {
  SafeContainer,
  Avatar,
  Header,
  Text,
  TextContainer,
  User,
  ButtonContainer,
  Button,
  ButtonText,
  CardContainer,
  Card,
  CardImage,
  CardTitle,
  Recolocation,
  RecolocationContainer,
  RecolocationSwitch,
  Vacancy,
  VacancyTitle,
  VacancyInfo,
  Company,
  Remuneration,
  ButtonRemove,
  ButtonUpdate,
  CancelButton,
  CancelTextButton,
  ConfirmButton,
  ConfirmTextButton,
  ModalizeButtonContainer,
  ModalizeContainer,
  ModalizeTitle,
  FavoriteButton,
} from './styles';

import { useFirstSteps } from '../../contexts/steps';
import { color } from '../../constants';
import { Icon } from '../Home/styles';

import AddVacancyImg from '../../assets/add-vacancy.png';
import UpdateProfile from '../../assets/update-profile.png';
import api from '../../services/api';

function Profile() {
  const { navigate } = useNavigation();
  const { removeSteps } = useFirstSteps();
  const { signOut, data } = useAuth();

  const signOutRef = useRef<Modalize>(null);
  const excludeAccountRef = useRef<Modalize>(null);
  const removeVacancyRef = useRef<Modalize>(null);

  const [isEnabled, setIsEnabled] = useState<boolean | null>(
    data?.is_recolocation,
  );

  const toggleSwitch = () => setIsEnabled(state => !state);

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  useEffect(() => {
    async function isRecolocation() {
      if (isEnabled) {
        ToastAndroid.show('Anunciando recolocação.', ToastAndroid.SHORT);
        try {
          await api.patch(`/accounts/${data?.user_id}/recolocation`, {});
        } catch (error) {
          ToastAndroid.show(
            'Houve um erro em anunciar recolocação.',
            ToastAndroid.SHORT,
          );
        }
      } else {
        ToastAndroid.show('Removendo recolocação.', ToastAndroid.SHORT);
        try {
          await api.patch(`/accounts/${data?.user_id}/recolocation`, {});
        } catch (error) {
          ToastAndroid.show(
            'Houve um erro em remover recolocação.',
            ToastAndroid.SHORT,
          );
        }
      }
    }
    isRecolocation();
  }, [isEnabled, data]);

  return (
    <SafeContainer>
      <Header>
        <TextContainer>
          <Text>Olá,</Text>
          <User>
            {data?.name && data?.name.length > 12
              ? `${data?.name.substring(0, 12)}...`
              : data?.name}
          </User>
        </TextContainer>
        <Avatar
          source={{ uri: 'https://picsum.photos/200' }}
          resizeMode="cover"
        />
      </Header>

      <FavoriteButton onPress={() => handleNavigate('Favorites')}>
        <Recolocation>Favoritos</Recolocation>
        <FontAwesome
          name="bookmark"
          color={color.primary}
          size={26}
          style={{ marginRight: wp(2) }}
        />
      </FavoriteButton>

      <ButtonContainer>
        <Button onPress={() => excludeAccountRef.current?.open()}>
          <ButtonText>Excluir conta</ButtonText>
        </Button>
        <Button onPress={() => signOutRef.current?.open()}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </ButtonContainer>

      <CardContainer>
        <Card onPress={() => handleNavigate('AddVacancy')}>
          <CardImage source={AddVacancyImg} resizeMode="stretch" />
          <CardTitle>Anunciar Vaga</CardTitle>
        </Card>
        <Card onPress={() => handleNavigate('UpdateUser')}>
          <CardImage source={UpdateProfile} resizeMode="stretch" />
          <CardTitle>Atualizar Perfil</CardTitle>
        </Card>
      </CardContainer>
      <RecolocationContainer>
        <Recolocation>Recolocaçao</Recolocation>
        <RecolocationSwitch
          trackColor={{ false: color.text.tertiary, true: color.text.tertiary }}
          thumbColor={isEnabled ? color.primary : color.primary}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </RecolocationContainer>

      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
            <ButtonUpdate
              activeOpacity={0.7}
              onPress={() => handleNavigate('UpdateVacancy')}
            >
              <Icon name="edit" size={24} color={color.background} />
            </ButtonUpdate>
            <ButtonRemove
              activeOpacity={0.7}
              onPress={() => removeVacancyRef.current?.open()}
            >
              <Icon name="trash" size={24} color={color.background} />
            </ButtonRemove>
          </Animated.View>
        )}
      >
        <Vacancy>
          <VacancyTitle>Visual Designer</VacancyTitle>
          <VacancyInfo>
            <Company>Spotfy</Company>
            <Remuneration>A combinar</Remuneration>
          </VacancyInfo>
        </Vacancy>
      </Swipeable>
      <Modalize ref={excludeAccountRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja excluir{`\n`}a sua conta?
          </ModalizeTitle>
          <ModalizeButtonContainer>
            <CancelButton onPress={() => excludeAccountRef.current?.close()}>
              <CancelTextButton>Cancelar</CancelTextButton>
            </CancelButton>
            <ConfirmButton onPress={removeSteps}>
              <ConfirmTextButton>Sim</ConfirmTextButton>
            </ConfirmButton>
          </ModalizeButtonContainer>
        </ModalizeContainer>
      </Modalize>
      <Modalize ref={signOutRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja sair{`\n`}da sua conta?
          </ModalizeTitle>
          <ModalizeButtonContainer>
            <CancelButton onPress={() => signOutRef.current?.close()}>
              <CancelTextButton>Cancelar</CancelTextButton>
            </CancelButton>
            <ConfirmButton onPress={() => signOut()}>
              <ConfirmTextButton>Sim</ConfirmTextButton>
            </ConfirmButton>
          </ModalizeButtonContainer>
        </ModalizeContainer>
      </Modalize>
      <Modalize ref={removeVacancyRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja remover{`\n`}essa vaga?
          </ModalizeTitle>
          <ModalizeButtonContainer>
            <CancelButton onPress={() => removeVacancyRef.current?.close()}>
              <CancelTextButton>Cancelar</CancelTextButton>
            </CancelButton>
            <ConfirmButton onPress={() => removeVacancyRef.current?.close()}>
              <ConfirmTextButton>Sim</ConfirmTextButton>
            </ConfirmButton>
          </ModalizeButtonContainer>
        </ModalizeContainer>
      </Modalize>
    </SafeContainer>
  );
}

export default Profile;
