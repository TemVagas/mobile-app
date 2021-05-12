import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { color } from '../../constants';

import {
  Container,
  GoBackButton,
  Header,
  HeaderContainer,
  StyledImage,
  Title,
  Content,
  Button,
  ButtonText,
  Describe,
  InfoContainer,
  Info,
  Role,
  RemunerationContainer,
  RoleContainer,
  Remuneration,
  Profession,
  Represents,
  CardInfo,
  CardList,
  Separator,
} from './styles';

const infoCard = [
  { id: '1', icon: 'phone', value: '(89) 99999-9999' },
  { id: '2', icon: 'map-marker', value: 'Picos - PI' },
  { id: '3', icon: 'briefcase', value: 'Estagio' },
  { id: '4', icon: 'address-card', value: 'Programador' },
];

export interface ItemsProps {
  id: string;
  icon: string;
  value: string;
}

function VacancyDetails() {
  const { goBack } = useNavigation();

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <GoBackButton onPress={() => goBack()}>
            <FontAwesome
              name="chevron-left"
              color={color.background}
              size={20}
            />
          </GoBackButton>
          <Title>Detalhes da Vaga</Title>
        </Header>
      </HeaderContainer>
      <Content>
        <StyledImage source={{ uri: 'https://picsum.photos/200' }} />
        <Represents>Usuário representando</Represents>
        <Profession>Empresa</Profession>
        <InfoContainer>
          <RoleContainer>
            <Info>Cargo</Info>
            <Role>Programador</Role>
          </RoleContainer>
          <RemunerationContainer>
            <Info>Remuneração</Info>
            <Remuneration>R$ 800</Remuneration>
          </RemunerationContainer>
        </InfoContainer>
        <Describe>
          Use suas habilidades como gostar tecnologia e de ajudar pessoas para
          fazer parte de uma das melhores empresas para trabalhar no Brasil.
        </Describe>

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

        <Button activeOpacity={0.8}>
          <ButtonText>CONTATAR</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

export default VacancyDetails;
