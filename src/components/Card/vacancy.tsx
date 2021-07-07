import React from 'react';
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

  return (
    <CardContainer
      onPress={() => navigate('VacancyDetails', item)}
      activeOpacity={0.8}
    >
      {item.represents !== ' ' ? (
        <Image source={{ uri: `https://${item.user.avatar_uri}` }} />
      ) : (
        <Image
          source={{
            uri: `https://avatars.githubusercontent.com/u/83519462?s=400&u=746e11ce66b1ef17cde6d9e5167d431d16e3e8bd&v=4`,
          }}
        />
      )}
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
                : `R$ ${item.remuneration_value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Remuneration>
          </RemunerationContainer>
        </SubtitleContainer>
      </Info>
    </CardContainer>
  );
}

export default VacancyCard;
