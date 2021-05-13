import React, { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

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
} from './styles';

import { useFirstSteps } from '../../contexts/steps';
import { color } from '../../constants';
import { Icon } from '../Home/styles';

import AddVacancyImg from '../../assets/add-vacancy.png';
import UpdateProfile from '../../assets/update-profile.png';

function Profile() {
  const [isEnabled, setIsEnabled] = useState(false);
  const { removeSteps } = useFirstSteps();

  const toggleSwitch = () => setIsEnabled(state => !state);

  return (
    <SafeContainer>
      <Header>
        <TextContainer>
          <Text>Olá,</Text>
          <User>Usuário</User>
        </TextContainer>
        <Avatar
          source={{ uri: 'https://picsum.photos/200' }}
          resizeMode="cover"
        />
      </Header>
      <ButtonContainer>
        <Button>
          <ButtonText>Excluir conta</ButtonText>
        </Button>
        <Button onPress={removeSteps}>
          <ButtonText>Sair</ButtonText>
        </Button>
      </ButtonContainer>
      <CardContainer>
        <Card>
          <CardImage source={AddVacancyImg} resizeMode="stretch" />
          <CardTitle>Anunciar Vaga</CardTitle>
        </Card>
        <Card>
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
            <ButtonUpdate activeOpacity={0.7}>
              <Icon name="edit" size={24} color={color.background} />
            </ButtonUpdate>
            <ButtonRemove activeOpacity={0.7}>
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
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View style={{ flexDirection: 'row' }}>
            <ButtonUpdate activeOpacity={0.7}>
              <Icon name="edit" size={24} color={color.background} />
            </ButtonUpdate>
            <ButtonRemove activeOpacity={0.7}>
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
    </SafeContainer>
  );
}

export default Profile;
