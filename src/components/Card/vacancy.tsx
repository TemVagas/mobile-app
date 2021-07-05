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
  user: UserProps;
}

interface UserProps {
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

function VacancyCard({ item }: ItemProps) {
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
      <Image source={{ uri: `https://${item.user.avatar_uri}` }} />
      <Info>
        <Title>
          {item.title.length > 25
            ? `${item.title.substr(0, 22)}...`
            : item.title}
        </Title>
        <SubtitleContainer>
          <Subtitle>{item.represents !== ' ' && item.represents}</Subtitle>
          <RemunerationContainer>
            <Remuneration>
              {item.remuneration_value === 0
                ? 'A combinar'
                : `R$ ${item.remuneration_value}`}
            </Remuneration>
          </RemunerationContainer>
        </SubtitleContainer>
      </Info>
    </CardContainer>
  );
}

export default VacancyCard;
