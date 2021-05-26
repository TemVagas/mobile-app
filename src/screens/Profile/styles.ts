import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated } from 'react-native';

import { color, font } from '../../constants';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${color.background};
  margin-top: ${getStatusBarHeight()}px;
`;
export const Header = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: ${hp(2)}px ${wp(4)}px;
`;
export const TextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;
export const FavoriteButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0px ${wp(4)}px ${hp(1)}px;
  align-items: center;
  justify-content: space-between;
`;
export const Text = styled.Text`
  font-family: ${font.regular};
  font-size: ${wp(6)}px;
  color: ${color.text.secondary};
`;
export const User = styled.Text`
  font-family: ${font.bold};
  font-size: ${wp(10)}px;
  color: ${color.text.primary};
`;
export const Avatar = styled.Image`
  width: ${hp(12)}px;
  height: ${hp(12)}px;
  border-radius: ${hp(12)}px;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 0px ${wp(4)}px;
  justify-content: space-between;
`;
export const Button = styled.TouchableOpacity``;
export const ButtonText = styled.Text`
  font-family: ${font.regular};
  font-size: ${wp(4.5)}px;
  color: ${color.text.secondary};
`;
export const CardContainer = styled.View`
  flex-direction: row;
`;
export const Card = styled.TouchableOpacity`
  background-color: ${color.placeholder};
  height: ${hp(22)}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: ${hp(2)}px ${wp(4)}px;
  border-radius: ${hp(2)}px;
`;
export const CardImage = styled.Image`
  flex: 1;
  width: 100%;
  height: ${hp(16)}px;
`;
export const CardTitle = styled.Text`
  padding-bottom: ${hp(1)}px;
  font-family: ${font.bold};
  font-size: ${wp(4)}px;
  color: ${color.text.secondary};
`;
export const RecolocationContainer = styled.View`
  flex-direction: row;
  margin: 0px ${wp(4)}px;
  align-items: center;
  justify-content: space-between;
`;
export const Recolocation = styled.Text`
  font-family: ${font.regular};
  font-size: ${wp(5)}px;
  color: ${color.text.secondary};
`;
export const RecolocationSwitch = styled.Switch``;
export const Vacancy = styled(Animated.View)`
  margin: ${hp(1)}px ${wp(4)}px;
  height: ${hp(14)}px;
  background-color: ${color.placeholder};
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

export const ButtonUpdate = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${hp(14)}px;
  background-color: ${color.text.tertiary};
  justify-content: center;
  align-items: center;
  position: relative;
  right: 20px;
  margin: ${hp(1)}px 0px;
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
