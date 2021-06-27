import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Animated, ToastAndroid, ActivityIndicator } from 'react-native';
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
  FlatListItems,
  Loading,
  Separator,
  SwipeableButton,
  LoadingContainer,
} from './styles';

import { useFirstSteps } from '../../contexts/steps';
import { color } from '../../constants';
import { Icon } from '../Home/styles';

import AddVacancyImg from '../../assets/add-vacancy.png';
import UpdateProfile from '../../assets/update-profile.png';
import api from '../../services/api';

export interface JobsProps {
  id: string;
  title: string;
  description: string;
  remuneration_value: number;
  phone_number: string;
  email: string;
  type: string;
  represents: string;
  fk_user_id: string;
  category: CategoriesProps;
  city: CitiesProps;
}

interface CategoriesProps {
  id: string;
  name: string;
}

interface StatesProps {
  id: string;
  sigla: string;
  name: string;
}

interface CitiesProps {
  id: number;
  name: string;
  state: StatesProps;
}

function Profile() {
  const focused = useIsFocused();

  const [slice, setSlice] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const { navigate } = useNavigation();
  const { removeSteps } = useFirstSteps();
  const { signOut, data, updateUser } = useAuth();

  const [removeJobById, setRemoveJobById] = useState('');

  const signOutRef = useRef<Modalize>(null);
  const excludeAccountRef = useRef<Modalize>(null);
  const removeVacancyRef = useRef<Modalize>(null);

  const [isEnabled, setIsEnabled] = useState<boolean>();
  const [myJobs, setMyJobs] = useState<JobsProps[]>([]);

  const toggleSwitch = () => setIsEnabled(state => !state);

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  const handleDeleteAccount = useCallback(async () => {
    ToastAndroid.show('Deletando a sua conta.', ToastAndroid.SHORT);
    try {
      await api.delete('accounts');
      ToastAndroid.show('Conta deletada com sucesso.', ToastAndroid.SHORT);
      removeSteps();
    } catch {
      ToastAndroid.show(
        'Houve um erro ao deletar sua conta, tente mais tarde.',
        ToastAndroid.SHORT,
      );
    }
  }, [removeSteps]);

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const response = await api.get('/accounts/infos');

      updateUser(response.data);
      setIsEnabled(response.data.is_recolocation);
      setIsLoading(false);
    }
    getUser();
  }, [focused, updateUser]);

  async function isRecolocation() {
    try {
      const response = await api.patch(`/accounts/recolocation`);

      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Houve um erro, tente mais tarde.', ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    async function getMyJobs() {
      const response = await api.get('/accounts/jobs');
      setMyJobs(response.data);
    }
    getMyJobs();
  }, [focused]);

  if (isLoading) {
    return (
      <SafeContainer>
        <LoadingContainer>
          <ActivityIndicator color={color.primary} size="large" />
        </LoadingContainer>
      </SafeContainer>
    );
  }

  return (
    <SafeContainer>
      <Header>
        <TextContainer>
          <Text>Bem-vindo</Text>
          <User>{data?.name}</User>
        </TextContainer>
        {data?.avatar_uri && (
          <Avatar
            source={{ uri: `https://${data?.avatar_uri}` }}
            resizeMode="cover"
          />
        )}
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
          onValueChange={() => {
            toggleSwitch();
            isRecolocation();
          }}
          value={isEnabled}
        />
      </RecolocationContainer>

      {myJobs.length > 0 ? (
        <FlatListItems
          showsVerticalScrollIndicator={false}
          data={myJobs.slice(0, slice)}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (slice < myJobs.length) {
              setSlice(state => state + 5);
            }
          }}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <Swipeable
              overshootRight={false}
              renderRightActions={() => (
                <Animated.View style={{ flexDirection: 'row' }}>
                  <ButtonUpdate
                    activeOpacity={0.7}
                    onPress={() => navigate('UpdateVacancy', item)}
                  >
                    <Icon name="edit" size={24} color={color.background} />
                  </ButtonUpdate>
                  <ButtonRemove
                    activeOpacity={0.7}
                    onPress={() => {
                      removeVacancyRef.current?.open();
                      setRemoveJobById(item.id);
                    }}
                  >
                    <Icon name="trash" size={24} color={color.background} />
                  </ButtonRemove>
                </Animated.View>
              )}
            >
              <Vacancy>
                <SwipeableButton onPress={() => navigate('MyDetails', item)}>
                  <VacancyTitle>{item.title.substring(0, 16)}...</VacancyTitle>
                  <VacancyInfo>
                    <Company>{item.description.substring(0, 5)}...</Company>
                    <Remuneration>
                      {item.remuneration_value === 0
                        ? 'A combinar'
                        : `R$ ${item.remuneration_value}`}
                    </Remuneration>
                  </VacancyInfo>
                </SwipeableButton>
              </Vacancy>
            </Swipeable>
          )}
          ListFooterComponent={
            slice < myJobs.length ? (
              <Loading size="large" color={color.primary} />
            ) : (
              <Separator />
            )
          }
        />
      ) : (
        <LoadingContainer>
          <Recolocation>Nenhuma vaga cadastrada</Recolocation>
        </LoadingContainer>
      )}

      <Modalize ref={excludeAccountRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja excluir{`\n`}a sua conta?
          </ModalizeTitle>
          <ModalizeButtonContainer>
            <CancelButton onPress={() => excludeAccountRef.current?.close()}>
              <CancelTextButton>Cancelar</CancelTextButton>
            </CancelButton>
            <ConfirmButton onPress={handleDeleteAccount}>
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
            <ConfirmButton
              onPress={async () => {
                await api.delete(`/jobs/${removeJobById}`);
                removeVacancyRef.current?.close();
                setMyJobs(myJobs.filter(job => job.id !== removeJobById));
                ToastAndroid.show(
                  'Vaga removida com sucesso.',
                  ToastAndroid.SHORT,
                );
              }}
            >
              <ConfirmTextButton>Sim</ConfirmTextButton>
            </ConfirmButton>
          </ModalizeButtonContainer>
        </ModalizeContainer>
      </Modalize>
    </SafeContainer>
  );
}

export default Profile;
