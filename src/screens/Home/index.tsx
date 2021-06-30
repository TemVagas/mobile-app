import React, { useCallback, useEffect, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Logo,
  Search,
  SearchContainer,
  Icon,
  Button,
  NavigateContainer,
  ShadowList,
  ShadowMap,
  ButtonNavigate,
  TextList,
  TextMap,
  List,
  Separator,
  Loading,
  Interest,
  CardInterest,
  CardListInterest,
  Info,
  TextCard,
  InfoCompany,
  InfoWage,
  InfoCompanyContainer,
  InfoWageContainer,
} from './styles';

import { color } from '../../constants';

import VacancyCard from '../../components/Card/vacancy';
import RecolocationCard from '../../components/Card/recolocation';

const data = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

const interestCard = [
  { id: '1', icon: 'phone', company: 'Uber', wage: 'R$100' },
  { id: '2', icon: 'map-marker', company: 'Uber', wage: 'R$5000' },
  { id: '3', icon: 'briefcase', company: 'Uber', wage: 'R$5000' },
  { id: '4', icon: 'address-card', company: 'Uber', wage: 'R$45000' },
  { id: '5', icon: 'address-card', company: 'Uber', wage: 'R$2500' },
  { id: '6', icon: 'address-card', company: 'Uber', wage: 'A combinar' },
];

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  company: string;
  wage: string;
}

function JobVacancies() {
  const { navigate } = useNavigation();

  const [search, setSearch] = useState('');
  const [navigation, setNavigation] = useState('list');
  const [slice, setSlice] = useState(6);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>();

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  const keyboardDidShow = () => setKeyboardStatus(true);
  const keyboardDidHide = () => setKeyboardStatus(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  return (
    <Container>
      <Logo>JobFinder</Logo>
      <SearchContainer>
        <Search
          placeholder="Buscar"
          placeholderTextColor={color.text.tertiary}
          value={search}
          onChangeText={text => setSearch(text)}
        />
        {search?.length > 1 ? (
          <Button onPress={() => setSearch('')}>
            <Icon name="times" size={18} color={color.text.tertiary} />
          </Button>
        ) : (
          <Icon name="search" size={18} color={color.text.tertiary} />
        )}
      </SearchContainer>

      {!keyboardStatus && (
        <NavigateContainer>
          <ShadowList navigation={navigation}>
            <ButtonNavigate
              onPress={() => {
                setNavigation('list');
                setSlice(6);
              }}
              activeOpacity={0.8}
            >
              <Icon
                size={20}
                color={
                  navigation === 'list'
                    ? color.background
                    : color.text.secondary
                }
                name="list"
              />
              <TextList navigation={navigation}>Vagas</TextList>
            </ButtonNavigate>
          </ShadowList>
          <ShadowMap navigation={navigation}>
            <ButtonNavigate
              onPress={() => {
                setNavigation('recolocation');
                setSlice(6);
              }}
              activeOpacity={0.8}
            >
              <Icon
                size={20}
                color={
                  navigation === 'recolocation'
                    ? color.background
                    : color.text.secondary
                }
                name="briefcase"
              />
              <TextMap navigation={navigation}>Recolocação</TextMap>
            </ButtonNavigate>
          </ShadowMap>
        </NavigateContainer>
      )}

      {navigation === 'list' && !keyboardStatus && search.length === 0 && (
        <>
          <Interest>Do seu interesse</Interest>
          <CardListInterest
            showsHorizontalScrollIndicator={false}
            horizontal
            data={interestCard}
            keyExtractor={info => info.id}
            renderItem={({ item: info }) => {
              return (
                <CardInterest
                  key={info.id}
                  activeOpacity={0.8}
                  onPress={() => handleNavigate('VacancyDetails')}
                >
                  <TextCard>
                    Usuário está buscando por Product Designer
                  </TextCard>
                  <Info>
                    <InfoCompanyContainer>
                      <InfoCompany>{info.company}</InfoCompany>
                    </InfoCompanyContainer>
                    <InfoWageContainer>
                      <InfoWage>
                        {info.wage.length > 6
                          ? `${info.wage.substring(0, 5)}...`
                          : info.wage}
                      </InfoWage>
                    </InfoWageContainer>
                  </Info>
                </CardInterest>
              );
            }}
          />
        </>
      )}
      <List
        contentContainerStyle={{
          width: wp(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onEndReached={() => {
          if (slice < data.length) {
            setSlice(state => state + 6);
          }
        }}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        data={data.slice(0, slice)}
        keyExtractor={item => String(item)}
        renderItem={() => {
          return navigation === 'list' ? <VacancyCard /> : <RecolocationCard />;
        }}
        ItemSeparatorComponent={() => <Separator />}
        ListFooterComponent={
          slice < data.length ? (
            <Loading size="small" color={color.primary} />
          ) : (
            <Separator />
          )
        }
      />
    </Container>
  );
}

export default JobVacancies;
