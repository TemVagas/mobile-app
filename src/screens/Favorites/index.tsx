import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ToastAndroid, ActivityIndicator } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { color } from '../../constants';
import { useAuth } from '../../contexts/auth';

import { JobsProps } from '../Profile';

import { Icon } from '../Home/styles';

import {
  Container,
  Logo,
  ButtonRemove,
  Company,
  Vacancy,
  VacancyInfo,
  VacancyTitle,
  Remuneration,
  CancelButton,
  CancelTextButton,
  ConfirmButton,
  ConfirmTextButton,
  ModalizeButtonContainer,
  ModalizeContainer,
  ModalizeTitle,
  VacancyButton,
  FlatListItems,
  Loading,
  Separator,
  LoadingContainer,
  SafeContainer,
  TextNotFound,
} from './styles';
import api from '../../services/api';

function Favorites() {
  const focused = useIsFocused();

  const { data } = useAuth();

  const { navigate } = useNavigation();
  const [slice, setSlice] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const removeVacancyRef = useRef<Modalize>(null);

  const [myFavoriteJobs, setMyFavoriteJobs] = useState<JobsProps[]>([]);

  const [removeJobById, setRemoveJobById] = useState('');

  useEffect(() => {
    async function getMyFavoritesJobs() {
      setIsLoading(true);
      api
        .get(`/accounts/favorites`)
        .then(response => {
          setMyFavoriteJobs(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
          setIsLoading(false);
        });
    }
    getMyFavoritesJobs();
  }, [focused, data]);

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
    <Container showsVerticalScrollIndicator={false}>
      <Logo>Meus Favoritos</Logo>

      {myFavoriteJobs.length > 0 ? (
        <FlatListItems
          showsVerticalScrollIndicator={false}
          data={myFavoriteJobs.slice(0, slice)}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (slice < myFavoriteJobs.length) {
              setSlice(state => state + 10);
            }
          }}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
            <Swipeable
              overshootRight={false}
              renderRightActions={() => (
                <Animated.View style={{ flexDirection: 'row' }}>
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
                <VacancyButton
                  onPress={() =>
                    navigate('MyDetails', {
                      phone_number: item.phone_number,
                      city: {
                        name: item.city.name,
                        state: {
                          name: item.city.state.name,
                        },
                      },
                      type: item.type,
                      category: {
                        name: item.category.name,
                      },
                      represents: item.represents,
                      email: item.email,
                      id: item.id,
                      user: {
                        name: data?.name,
                        avatar_uri: data?.avatar_uri,
                      },
                      remuneration_value: item.remuneration_value,
                      title: item.title,
                      description: item.description,
                      favorite: true,
                    })
                  }
                >
                  <VacancyTitle>{item.title.substring(0, 16)}...</VacancyTitle>
                  <VacancyInfo>
                    <Company>{item.description.substring(0, 5)}...</Company>
                    <Remuneration>
                      {item.remuneration_value === 0
                        ? 'A combinar'
                        : `R$ ${item.remuneration_value
                            .toFixed(2)
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
                    </Remuneration>
                  </VacancyInfo>
                </VacancyButton>
              </Vacancy>
            </Swipeable>
          )}
          ListFooterComponent={
            slice < myFavoriteJobs.length ? (
              <Loading size="large" color={color.primary} />
            ) : (
              <Separator />
            )
          }
        />
      ) : (
        <LoadingContainer>
          <TextNotFound>Nenhuma vaga favoritada</TextNotFound>
        </LoadingContainer>
      )}

      <Modalize ref={removeVacancyRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja remover{`\n`}esse favorito?
          </ModalizeTitle>
          <ModalizeButtonContainer>
            <CancelButton onPress={() => removeVacancyRef.current?.close()}>
              <CancelTextButton>Cancelar</CancelTextButton>
            </CancelButton>
            <ConfirmButton
              onPress={async () => {
                await api.delete(`jobs/dislike/${removeJobById}`);
                removeVacancyRef.current?.close();
                setMyFavoriteJobs(
                  myFavoriteJobs.filter(job => job.id !== removeJobById),
                );
                ToastAndroid.show(
                  'Vaga removida de favorito com sucesso.',
                  ToastAndroid.SHORT,
                );
              }}
            >
              <ConfirmTextButton>Sim</ConfirmTextButton>
            </ConfirmButton>
          </ModalizeButtonContainer>
        </ModalizeContainer>
      </Modalize>
    </Container>
  );
}

export default Favorites;
