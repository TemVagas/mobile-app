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
} from './styles';

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
        <Profession>Empresa - Picos/PI</Profession>
        <InfoContainer>
          <RoleContainer>
            <Info>Estágio</Info>
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
        <Button activeOpacity={0.8}>
          <ButtonText>CONTATAR</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

export default VacancyDetails;
