import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  CardContainer,
  Image,
  Info,
  Title,
  Remuneration,
  Company,
  CompanyContainer,
  RemunerationContainer,
} from './styles';

function Card() {
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <CardContainer
      onPress={() => handleNavigate('JobDetails')}
      activeOpacity={0.8}
    >
      <Image source={{ uri: 'https://picsum.photos/200' }} />
      <Info>
        <Title>Usuário está buscando por Visual Designer</Title>
        <CompanyContainer>
          <Company>Spotfy</Company>
          <RemunerationContainer>
            <Remuneration>A combinar</Remuneration>
          </RemunerationContainer>
        </CompanyContainer>
      </Info>
    </CardContainer>
  );
}

export default Card;
