import React, { useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Modalize } from 'react-native-modalize';

import { Linking, ToastAndroid } from 'react-native';
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
  FavoriteButton,
} from './styles';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: string;
}

interface VacancyProps {
  category: CategoryProps;
  city: CityProps;
  description: string;
  email: string;
  id: string;
  phone_number: string;
  represents: string;
  type: string;
  title: string;
  remuneration_value: number;
  user: UserProps;
}

interface UserProps {
  avatar_uri: string;
  curriculum_uri: string;
  description: string;
  email: string;
  name: string;
  phone_number: string;
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

function VacancyDetails() {
  const { params } = useRoute();
  const { signed } = useAuth();
  const { goBack } = useNavigation();

  const info = params as VacancyProps;

  const contactRef = useRef<Modalize>(null);

  const infoCard = [
    { id: '1', icon: 'phone', value: info.phone_number },
    {
      id: '2',
      icon: 'map-marker',
      value: `${info.city.name} - ${info.city.state.name
        .substr(0, 2)
        .toUpperCase()}`,
    },
    { id: '3', icon: 'briefcase', value: info.type },
    { id: '4', icon: 'address-card', value: info.category.name },
  ];

  const ContactWhatsApp = () => {
    const url = `whatsapp://send?text=Vim através do aplicativo JobFinder e gostaria de me candidatar para a vaga!&phone=55${info.phone_number.replace(
      /\D/g,
      '',
    )}}`;
    Linking.openURL(url);
  };

  const ContactMail = () => {
    const url = `mailto:${info.email}`;

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
          {signed && (
            <FavoriteButton
              onPress={() => {
                ToastAndroid.show(
                  'Favoritando vaga, aguarde...',
                  ToastAndroid.SHORT,
                );
                api
                  .post(`/jobs/like/${info.id}`)
                  .then(() =>
                    ToastAndroid.show(
                      'Vaga favoritada com sucesso!',
                      ToastAndroid.SHORT,
                    ),
                  )
                  .catch(error => {
                    ToastAndroid.show(
                      error.response.data.message,
                      ToastAndroid.SHORT,
                    );
                  });
              }}
            >
              <FontAwesome name="bookmark" color={color.background} size={24} />
            </FavoriteButton>
          )}
        </Header>
      </HeaderContainer>
      <Content>
        {info.represents !== ' ' ? (
          <>
            <StyledImage source={{ uri: `https://${info.user.avatar_uri}` }} />
            <Represents>{info.user.name} representando</Represents>
          </>
        ) : (
          <>
            <StyledImage
              source={{
                uri: `https://avatars.githubusercontent.com/u/83519462?s=400&u=746e11ce66b1ef17cde6d9e5167d431d16e3e8bd&v=4`,
              }}
            />
            <Represents>Essa vaga veio de outra plataforma</Represents>
          </>
        )}
        <Profession>{info.represents}</Profession>
        <InfoContainer>
          <RoleContainer>
            <Info>Cargo</Info>
            <Role>{info.category.name}</Role>
          </RoleContainer>
          <RemunerationContainer>
            <Info>Remuneração</Info>
            <Remuneration>
              {info.remuneration_value === 0
                ? 'A combinar'
                : `R$${info.remuneration_value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            </Remuneration>
          </RemunerationContainer>
        </InfoContainer>
        <Describe>{info.title}</Describe>
        <Describe>{info.description}</Describe>

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
