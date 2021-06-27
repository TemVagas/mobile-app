import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Animated, FlatList } from 'react-native';

import { color, font } from '../../constants';
import { JobsProps } from '../Profile';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${color.background};
  margin-top: ${getStatusBarHeight()}px;
`;
export const Logo = styled.Text`
  font-family: ${font.bold};
  font-size: ${wp(6)}px;
  color: ${color.primary};
  text-align: center;
`;
export const ButtonRemove = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${hp(14)}px;
  background-color: ${color.error};
  border-top-right-radius: ${hp(2)}px;
  border-bottom-right-radius: ${hp(2)}px;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 20px;
  margin: ${hp(1)}px 0px;
`;
export const Vacancy = styled(Animated.View)`
  margin: ${hp(1)}px ${wp(4)}px;
  height: ${hp(14)}px;
  background-color: ${color.placeholder};
  border-radius: ${hp(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const VacancyButton = styled.TouchableOpacity`
  border-radius: ${hp(2)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const VacancyTitle = styled.Text`
  text-align: center;
  flex: 1;
  font-family: ${font.medium};
  color: ${color.text.secondary};
  font-size: ${wp(6)}px;
`;
export const VacancyInfo = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-right: ${wp(4)}px;
`;
export const Company = styled.Text`
  font-size: ${wp(6)}px;
  font-family: ${font.medium};
  color: ${color.text.secondary};
`;
export const Remuneration = styled.Text`
  font-size: ${wp(4)}px;
  font-family: ${font.regular};
  color: ${color.text.tertiary};
`;
export const ModalizeContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: ${hp(4)}px 0px;
  color: ${color.background};
`;
export const ModalizeTitle = styled.Text`
  font-family: ${font.medium};
  font-size: ${wp(4.5)}px;
  color: ${color.text.secondary};
  text-align: center;
`;
export const ModalizeButtonContainer = styled.View`
  margin-top: ${hp(2)}px;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
export const ConfirmButton = styled.TouchableOpacity`
  background-color: ${color.secondary};
  width: ${wp(35)}px;
  height: ${hp(7.5)}px;
  border-radius: ${hp(1)}px;
  align-items: center;
  justify-content: center;
`;
export const ConfirmTextButton = styled.Text`
  color: ${color.background};
  font-family: ${font.medium};
  font-size: ${wp(4.2)}px;
`;
export const CancelButton = styled.TouchableOpacity`
  background-color: ${color.placeholder};
  width: ${wp(35)}px;
  height: ${hp(7.5)}px;
  border-radius: ${hp(1)}px;
  align-items: center;
  justify-content: center;
`;
export const CancelTextButton = styled.Text`
  font-family: ${font.medium};
  color: ${color.text.primary};
  font-size: ${wp(4.2)}px;
`;
export const FlatListItems = styled(FlatList as new () => FlatList<JobsProps>)`
  width: 100%;
  height: ${hp(83)}px;
`;
export const Separator = styled.View`
  height: ${hp(2)}px;
`;
export const Loading = styled.ActivityIndicator`
  height: ${hp(8)}px;
`;
export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${color.background};
  margin-top: ${getStatusBarHeight()}px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${hp(40)}px;
`;
export const TextNotFound = styled.Text`
  font-family: ${font.regular};
  font-size: ${wp(5)}px;
  color: ${color.text.secondary};
`;
