import React, { useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Modalize } from 'react-native-modalize';
import { Linking, ToastAndroid, View } from 'react-native';
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
  ModalizeContainer,
  ContactButton,
} from './styles';

interface RecolocationProps {
  avatar_uri: string;
  curriculum_uri: string;
  name: string;
  category: CategoryProps;
  description: string;
  phone_number: string;
  email: string;
}

interface CategoryProps {
  id: string;
  name: string;
}

function VacancyDetails() {
  const { params } = useRoute();

  const recolocation = params as RecolocationProps;

  const { goBack, navigate } = useNavigation();

  const contactRef = useRef<Modalize>(null);

  const ContactWhatsApp = () => {
    const url = `whatsapp://send?text=Vim através do aplicativo JobFinder e tenho uma vaga pra voce!&phone=55${recolocation.phone_number.replace(
      /\D/g,
      '',
    )}`;
    Linking.openURL(url).catch(err =>
      ToastAndroid.show(
        'Instale o aplicativo Whatsapp para ter acesso a essa função.',
        ToastAndroid.SHORT,
      ),
    );
  };

  const ContactMail = () => {
    const url = `mailto:${recolocation.email}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
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
          <StyledImage source={{ uri: `https://${recolocation.avatar_uri}` }} />
          <Profession>{recolocation.name}</Profession>
          <Describe>
            Esta em busca de recoloção no mercado de trabalho na area de{' '}
            {recolocation.category.name}
          </Describe>
          <Describe>{recolocation.description}</Describe>
          <CurriculumButton
            onPress={() =>
              navigate('Curriculum', {
                uri: `https://${recolocation.curriculum_uri}`,
              })
            }
          >
            <CurriculumText>Visualizar Curriculo</CurriculumText>
            <FontAwesome
              name="long-arrow-right"
              color={color.primary}
              size={20}
            />
          </CurriculumButton>
          <Button
            activeOpacity={0.8}
            onPress={() => contactRef.current?.open()}
          >
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
    </View>
  );
}

export default VacancyDetails;
