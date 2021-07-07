import React, { useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Modalize } from 'react-native-modalize';

import { Linking } from 'react-native';
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
  ModalizeContainer,
  ContactButton,
} from './styles';
import { JobsProps } from '../Profile';

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: string;
}

function VacancyDetails() {
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

  const { goBack } = useNavigation();

  const contactRef = useRef<Modalize>(null);

  const ContactWhatsApp = () => {
    const url = `whatsapp://send?text=Vim através do aplicativo JobFinder e gostaria de me candidatar para a vaga!&phone=55${job.phone_number.replace(
      /[^\d]/g,
      '',
    )}`;
    Linking.openURL(url);
  };

  const ContactMail = () => {
    const url = `mailto:${job.email}`;
    Linking.openURL(url);
  };

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
        <Represents>Usuário representando</Represents>
        <Profession>Empresa</Profession>
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
                : `R$ ${job.remuneration_value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
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

        <Button activeOpacity={0.8} onPress={() => contactRef.current?.open()}>
          <ButtonText>CONTATAR</ButtonText>
        </Button>
      </Content>
      <Modalize ref={contactRef} adjustToContentHeight>
        <ModalizeContainer>
          <ContactButton onPress={ContactWhatsApp}>
            <FontAwesome name="whatsapp" size={hp(8)} color={color.primary} />
          </ContactButton>
          <ContactButton onPress={ContactMail}>
            <FontAwesome name="envelope" size={hp(8)} color={color.primary} />
          </ContactButton>
        </ModalizeContainer>
      </Modalize>
    </Container>
  );
}

export default VacancyDetails;
