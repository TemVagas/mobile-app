import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Modalize } from 'react-native-modalize';
import { Linking, View } from 'react-native';
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

function VacancyDetails() {
  const { goBack, navigate } = useNavigation();

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
          <StyledImage source={{ uri: 'https://picsum.photos/200' }} />
          <Profession>Usuário</Profession>
          <Describe>
            Esta em busca de recoloção no mercado de trabalho na area de
            Desenvolvimento de software.
          </Describe>
          <Describe>
            Doloribus quasi nemo corrupti aut. Rerum a adipisci voluptatibus
            perspiciatis perferendis consequatur ab. Sed nihil autem harum id.
            Omnis quo sit est culpa molestiae odio sequi quis eaque. Quia
            deleniti maiores iusto dolores et dolor eos unde et. Est dolorem
            consequatur itaque blanditiis atque est. Autem molestias rerum et
            reiciendis ipsa assumenda molestiae. Nesciunt dignissimos non nobis
            modi modi quia numquam nisi. Molestias et totam nisi tempore aliquam
            esse asperiores facere.
          </Describe>
          <CurriculumButton onPress={() => navigate('Curriculum')}>
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
