import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  CardContainer,
  Image,
  Info,
  Title,
  Subtitle,
  SubtitleContainer,
} from './styles';

function RecolocationCard() {
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <CardContainer
      onPress={() => handleNavigate('RecolocationDetails')}
      activeOpacity={0.8}
    >
      <Image source={{ uri: 'https://picsum.photos/200' }} />
      <Info>
        <Title>Usuário está buscando por Recolocação</Title>
        <SubtitleContainer>
          <Subtitle>Profissão</Subtitle>
        </SubtitleContainer>
      </Info>
    </CardContainer>
  );
}

export default RecolocationCard;
