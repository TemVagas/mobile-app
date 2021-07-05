import React, { useCallback, useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, ToastAndroid } from 'react-native';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Logo,
  Icon,
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
  LoadingContainer,
  Recolocation,
  NotFoundContainer,
  CardImage,
  SafeContainer,
} from './styles';

import { color } from '../../constants';

import VacancyCard from '../../components/Card/vacancy';
import RecolocationCard from '../../components/Card/recolocation';
import api from '../../services/api';

export interface JobsProps {
  category: CategoryProps;
  city: CityProps;
  id: string;
  description: string;
  email: string;
  fk_category_id: string;
  fk_user_id: string;
  name: string;
  phone_number: string;
  remuneration_value: number;
  represents: string;
  title: string;
  type: string;
  updated_at: string;
  user: UserProps;
}

interface UserProps {
  avatar_uri: string;
  curriculum_uri: string;
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

export interface ItemsProps {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  company: string;
  wage: string;
}

interface RecolocationProps {
  category: CategoryProps;
  city: CityProps;
  description: string;
  id: string;
  name: string;
  email: string;
  fk_category_id: string;
  fk_user_id: string;
}

function JobVacancies() {
  const focused = useIsFocused();
  const { navigate } = useNavigation();

  const { data, signed } = useAuth();

  const [navigation, setNavigation] = useState('list');
  const [slice, setSlice] = useState(6);
  const [jobs, setJobs] = useState<JobsProps[]>([]);
  const [recolocations, setRecolocations] = useState<RecolocationProps[]>([]);
  const [jobsInterested, setJobsInterested] = useState<JobsProps[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const interestedJobs = useCallback(() => {
    if (signed) {
      api
        .get(`jobs?category_id=${data?.category.id}`)
        .then(interest => {
          setJobsInterested(interest.data);
        })
        .catch(error => {
          setIsLoading(false);
          ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        });
    }
  }, [data?.category.id, signed]);

  async function getJobs() {
    api
      .get('jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
  }

  async function getRecolocations() {
    api
      .get('/accounts/recolocation')
      .then(response => {
        setRecolocations(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
  }

  useEffect(() => {
    setIsLoading(true);

    getJobs();
    getRecolocations();
    if (signed) {
      interestedJobs();
    }
    setIsLoading(false);
  }, [focused, data, signed, interestedJobs]);

  if (isLoading) {
    return (
      <SafeContainer>
        <LoadingContainer>
          <ActivityIndicator color={color.primary} size="large" />
        </LoadingContainer>
      </SafeContainer>
    );
  }

  return (
    <Container>
      <Logo>JobFinder</Logo>

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
                navigation === 'list' ? color.background : color.text.secondary
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

      {signed && navigation === 'list' && jobsInterested.length !== 0 && (
        <>
          <Interest>Do seu interesse</Interest>
          <CardListInterest
            showsHorizontalScrollIndicator={false}
            horizontal
            data={jobsInterested}
            keyExtractor={info => info.id}
            renderItem={({ item: info }) => {
              return (
                <CardInterest
                  activeOpacity={0.8}
                  onPress={() => navigate('VacancyDetails', info)}
                >
                  <CardImage
                    source={{
                      uri: `https://${info.user.avatar_uri}`,
                    }}
                  />
                  <TextCard>
                    {info.title.length > 20
                      ? `${info.title.substr(0, 17)}...`
                      : info.title}
                  </TextCard>
                  <Info>
                    {info.represents !== ' ' && (
                      <InfoCompanyContainer>
                        <InfoCompany>
                          {info.represents.length > 8
                            ? `${info.represents.substr(0, 6)}...`
                            : info.represents}
                        </InfoCompany>
                      </InfoCompanyContainer>
                    )}
                    <InfoWageContainer>
                      <InfoWage>
                        {info.remuneration_value !== 0
                          ? `R$ ${info.remuneration_value}`
                          : 'A combinar'}
                      </InfoWage>
                    </InfoWageContainer>
                  </Info>
                </CardInterest>
              );
            }}
          />
        </>
      )}

      {jobs.length === 0 && navigation === 'list' && (
        <LoadingContainer>
          <Recolocation>Nenhuma vaga encontrada</Recolocation>
        </LoadingContainer>
      )}

      {jobs.length !== 0 && navigation === 'list' && (
        <List
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onEndReached={() => {
            if (slice < jobs.length) {
              setSlice(state => state + 6);
            }
          }}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          data={jobs.slice(0, slice)}
          keyExtractor={(item: JobsProps) => item.id}
          renderItem={({ item }) => {
            return <VacancyCard item={item} />;
          }}
          ItemSeparatorComponent={() => <Separator />}
          ListFooterComponent={
            slice < jobs.length ? (
              <Loading size="small" color={color.primary} />
            ) : (
              <Separator />
            )
          }
        />
      )}

      {recolocations.length === 0 && navigation !== 'list' && (
        <LoadingContainer style={{ height: hp(80) }}>
          <Recolocation>Ninguem esta buscando</Recolocation>
          <Recolocation>por recolocação</Recolocation>
        </LoadingContainer>
      )}

      {recolocations.length !== 0 && navigation !== 'list' && (
        <List
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onEndReached={() => {
            if (slice < recolocations.length) {
              setSlice(state => state + 6);
            }
          }}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          data={recolocations.slice(0, slice)}
          keyExtractor={(item: RecolocationProps) => item.id}
          renderItem={({ item }) => {
            return <RecolocationCard item={item} />;
          }}
          ItemSeparatorComponent={() => <Separator />}
          ListFooterComponent={
            slice < recolocations.length ? (
              <Loading size="small" color={color.primary} />
            ) : (
              <Separator />
            )
          }
        />
      )}
    </Container>
  );
}

export default JobVacancies;
