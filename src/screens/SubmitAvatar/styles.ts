import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated } from 'react-native';

import { color, font } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${color.background};
  align-items: center;
  margin-top: ${getStatusBarHeight()}px;
`;
export const Form = styled(Animated.ScrollView)`
  width: 100%;
  margin-top: ${hp(2)}px;
  border: 1px solid #000;
`;
export const HeaderContainer = styled.View`
  height: ${hp(30)}px;
  width: 100%;
  background-color: ${color.primary};
`;
export const Title = styled.Text`
  color: ${color.background};
  font-family: ${font.bold};
  font-size: ${wp(6)}px;
  padding: 0px ${wp(3)}px;
  flex: 1;
  text-align: center;
  margin-top: ${wp(4)}px;
`;

export const StyledImage = styled.Image`
  width: ${hp(24)}px;
  height: ${hp(24)}px;
  border-radius: ${hp(24)}px;
  align-self: center;
  margin-bottom: ${hp(2)}px;
`;
export const Content = styled.View`
  position: relative;
  bottom: ${hp(12)}px;
  margin-bottom: ${hp(-16)}px;
`;
export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${color.secondary};
  height: ${hp(7)}px;
  border-radius: ${hp(1)}px;
  width: 90%;
  margin-bottom: ${hp(2)}px;
`;
export const ButtonText = styled.Text`
  color: ${color.background};
  font-size: ${wp(4.5)}px;
  font-family: ${font.medium};
`;
export const ButtonCamera = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: ${wp(45)}px;
  align-self: center;
`;
export const CameraIcon = styled.View`
  align-items: center;
  justify-content: center;
  height: ${hp(5)}px;
  width: ${hp(5)}px;
  background-color: ${color.secondary};
  position: relative;
  bottom: ${hp(7)}px;
  left: ${wp(16)}px;
`;
export const Error = styled.Text`
  color: ${color.error};
  text-align: center;
  font-family: ${font.regular};
  font-size: ${wp(3)}px;
  margin-bottom: ${hp(2)}px;
`;
