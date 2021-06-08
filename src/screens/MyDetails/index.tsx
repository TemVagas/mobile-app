import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { color } from '../../constants';
import { JobsProps } from '../Profile';

import {
  Container,
  GoBackButton,
  Header,
  HeaderContainer,
  StyledImage,
  Title,
  Content,
  Describe,
  InfoContainer,
  Info,
  Role,
  RemunerationContainer,
  RoleContainer,
  Remuneration,
  CardInfo,
  CardList,
  Separator,
} from './styles';

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: string;
}

function MyDetails() {
  const { goBack } = useNavigation();
  const { params } = useRoute();

  const job = params as JobsProps;

  const infoCard = [
    {
      id: '1',
      icon: 'phone',
      value: job.phone_number || 'Dado não encontrado',
    },
    { id: '2', icon: 'map-marker', value: job.city || 'Dado não encontrado' },
    { id: '3', icon: 'briefcase', value: job.type || 'Dado não encontrado' },
    {
      id: '4',
      icon: 'address-card',
      value: job.title || 'Dado não encontrado',
    },
  ];

  return (
    <Container showsVerticalScrollIndicator={false}>
      <HeaderContainer>
        <Header>
          <GoBackButton onPress={() => goBack()}>
            <FontAwesome
              name="chevron-left"
              color={color.background}
              size={20}
            />
            <Title>Voltar</Title>
          </GoBackButton>
        </Header>
      </HeaderContainer>
      <Content>
        <StyledImage source={{ uri: 'https://picsum.photos/200' }} />
        <InfoContainer>
          <RoleContainer>
            <Info>Titulo da vaga</Info>
            <Role>{job.title}</Role>
          </RoleContainer>
          <RemunerationContainer>
            <Info>Remuneração</Info>
            <Remuneration>
              {job.remuneration_value === 0
                ? 'A combinar'
                : `R$ ${job.remuneration_value}`}
            </Remuneration>
          </RemunerationContainer>
        </InfoContainer>
        <Describe>{job.description}</Describe>

        <CardList
          data={infoCard}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={info => info.id}
          numColumns={2}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({ item: info }) => {
            return (
              <CardInfo key={info.id}>
                <FontAwesome size={45} color={color.primary} name={info.icon} />
                <Info style={{ marginTop: 10 }}>{info.value}</Info>
              </CardInfo>
            );
          }}
        />
      </Content>
    </Container>
  );
}

export default MyDetails;
