import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
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
  FavoriteButton,
} from './styles';

const infoCard = [
  { id: '1', icon: 'phone', value: '(89) 99999-9999' },
  { id: '2', icon: 'map-marker', value: 'Picos - PI' },
  { id: '3', icon: 'briefcase', value: 'Estagio' },
  { id: '4', icon: 'address-card', value: 'Programador' },
];

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: string;
}

function VacancyDetails() {
  const { goBack } = useNavigation();

  const contactRef = useRef<Modalize>(null);

  const ContactWhatsApp = () => {
    const url =
      'whatsapp://send?text=Vim através do aplicativo JobFinder e gostaria de me candidatar para a vaga!&phone=5589999191275';
    Linking.openURL(url);
  };

  const ContactMail = () => {
    const url = 'mailto:toliveira@slideworks.cc';
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
          <FavoriteButton>
            <FontAwesome name="bookmark" color={color.background} size={24} />
          </FavoriteButton>
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
          Doloribus quasi nemo corrupti aut. Rerum a adipisci voluptatibus
          perspiciatis perferendis consequatur ab. Sed nihil autem harum id.
          Omnis quo sit est culpa molestiae odio sequi quis eaque. Quia deleniti
          maiores iusto dolores et dolor eos unde et. Est dolorem consequatur
          itaque blanditiis atque est. Autem molestias rerum et reiciendis ipsa
          assumenda molestiae. Nesciunt dignissimos non nobis modi modi quia
          numquam nisi. Molestias et totam nisi tempore aliquam esse asperiores
          facere.
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
