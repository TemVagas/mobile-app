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

interface ItemProps {
  item: JobsProps;
}

interface JobsProps {
  category: CategoryProps;
  city: CityProps;
  id: string;
  name: string;
  description: string;
  email: string;
  fk_category_id: string;
  fk_user_id: string;
  phone_number: string;
  remuneration_value: number;
  represents: string;
  title: string;
  type: string;
  updated_at: string;
  avatar_uri: string;
  curriculum_uri: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

interface CityProps {
  id: string;
  name: string;
  state: StateProps;
}

interface StateProps {
  id: string;
  name: string;
}

function RecolocationCard({ item }: ItemProps) {
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
      <Image source={{ uri: `https://${item.avatar_uri}` }} />
      <Info>
        <Title>{item.name} está buscando por Recolocação</Title>
        <SubtitleContainer>
          <Subtitle>{item.category.name}</Subtitle>
        </SubtitleContainer>
      </Info>
    </CardContainer>
  );
}

export default RecolocationCard;
