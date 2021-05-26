import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { color } from '../../constants';

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
} from './styles';

function Favorites() {
  const { navigate } = useNavigation();

  const removeVacancyRef = useRef<Modalize>(null);

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Logo>Meus Favoritos</Logo>

      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
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
          <VacancyButton onPress={() => handleNavigate('VacancyDetails')}>
            <VacancyTitle>Visual Designer</VacancyTitle>
            <VacancyInfo>
              <Company>Spotfy</Company>
              <Remuneration>A combinar</Remuneration>
            </VacancyInfo>
          </VacancyButton>
        </Vacancy>
      </Swipeable>
      <Modalize ref={removeVacancyRef} adjustToContentHeight>
        <ModalizeContainer>
          <ModalizeTitle>
            Tem certeza que deseja remover{`\n`}esse favorito?
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
    </Container>
  );
}

export default Favorites;
