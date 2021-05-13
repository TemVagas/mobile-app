import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { color } from '../../constants';

import {
  Container,
  HeaderContainer,
  GoBackButton,
  Title,
  Header,
  StyledImage,
  Profession,
  Describe,
  Button,
  ButtonText,
  CurriculumButton,
  CurriculumText,
  Content,
} from './styles';

function VacancyDetails() {
  const { goBack } = useNavigation();
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
          </GoBackButton>
          <Title>Detalhes da Recolocação</Title>
        </Header>
      </HeaderContainer>
      <Content>
        <StyledImage source={{ uri: 'https://picsum.photos/200' }} />
        <Profession>Usuário</Profession>
        <Describe>
          Esta em busca de recoloção no mercado de trabalho na area de
          Desenvolvimento de software.
        </Describe>
        <Describe>Sobre o usuário.</Describe>
        <CurriculumButton>
          <CurriculumText>Visualizar Curriculo</CurriculumText>
          <FontAwesome
            name="long-arrow-right"
            color={color.primary}
            size={20}
          />
        </CurriculumButton>
        <Button activeOpacity={0.8}>
          <ButtonText>CONTATAR</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

export default VacancyDetails;