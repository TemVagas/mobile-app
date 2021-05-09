import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  CardContainer,
  Image,
  Info,
  Title,
  Remuneration,
  Subtitle,
  SubtitleContainer,
  RemunerationContainer,
} from './styles';

function VacancyCard() {
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <CardContainer
      onPress={() => handleNavigate('VacancyDetails')}
      activeOpacity={0.8}
    >
      <Image source={{ uri: 'https://picsum.photos/200' }} />
      <Info>
        <Title>Usuário está buscando por Visual Designer</Title>
        <SubtitleContainer>
          <Subtitle>Spotfy</Subtitle>
          <RemunerationContainer>
            <Remuneration>A combinar</Remuneration>
          </RemunerationContainer>
        </SubtitleContainer>
      </Info>
    </CardContainer>
  );
}

export default VacancyCard;
