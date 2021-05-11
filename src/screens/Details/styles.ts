import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { color, font } from '../../constants';

export const Container = styled.ScrollView`
  background-color: ${color.background};
`;

export const HeaderContainer = styled.View`
  height: ${hp(30)}px;
  width: 100%;
  background-color: ${color.primary};
`;
export const GoBackButton = styled.TouchableOpacity`
  width: ${hp(8)}px;
  height: ${hp(8)}px;
  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text`
  color: ${color.background};
  font-family: ${font.bold};
  font-size: ${wp(7)}px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight()}px;
`;
export const StyledImage = styled.Image`
  width: ${hp(24)}px;
  height: ${hp(24)}px;
  border-radius: ${hp(24)}px;
  align-self: center;
`;
export const Content = styled.View`
  position: relative;
  bottom: ${hp(12)}px;
  margin-bottom: ${hp(-10)}px;
`;
export const Profession = styled.Text`
  align-self: center;
  font-family: ${font.medium};
  font-size: ${wp(8)}px;
  color: ${color.primary};
  margin-bottom: ${hp(2)}px;
`;
export const Describe = styled.Text`
  padding: 0px ${wp(3)}px;
  font-family: ${font.regular};
  color: ${color.text.secondary};
  font-size: ${wp(4)}px;
`;
export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${color.secondary};
  height: ${hp(8)}px;
  margin: ${wp(3)}px ${wp(3)}px 0px;
  border-radius: ${hp(1)}px;
`;
export const ButtonText = styled.Text`
  color: ${color.background};
  font-size: ${wp(5)}px;
  font-family: ${font.medium};
`;
export const InfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin: ${hp(2)}px ${wp(3)}px;
`;
export const Info = styled.Text`
  font-family: ${font.medium};
  font-size: ${wp(4)}px;
  color: ${color.text.tertiary};
`;
export const Represents = styled.Text`
  font-family: ${font.medium};
  font-size: ${wp(4)}px;
  color: ${color.text.tertiary};
  align-self: center;
  margin-top: ${wp(3)}px;
`;
export const Role = styled.Text`
  font-family: ${font.medium};
  font-size: ${wp(8)}px;
  color: ${color.primary};
`;
export const RoleContainer = styled.View`
  flex: 1;
`;
export const RemunerationContainer = styled.View`
  flex: 0.7;
`;
export const Remuneration = styled.Text`
  font-family: ${font.medium};
  font-size: ${wp(8)}px;
  color: ${color.secondary};
`;
export const CurriculumButton = styled.TouchableOpacity`
  height: ${hp(8)}px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: ${hp(3)}px ${wp(3)}px 0px;
  border-radius: ${hp(1)}px;
`;
export const CurriculumText = styled.Text`
  font-size: ${wp(5)}px;
  font-family: ${font.medium};
  margin-right: ${wp(4)}px;
`;
