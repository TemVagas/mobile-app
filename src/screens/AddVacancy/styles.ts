import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { color, font } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${color.background};
  align-items: center;
  margin-top: ${getStatusBarHeight()}px;
`;
export const Logo = styled.Text`
  font-family: ${font.bold};
  font-size: ${wp(6)}px;
  color: ${color.primary};
  text-align: center;
`;
export const Form = styled(Animated.ScrollView)`
  width: 100%;
  margin-top: ${hp(2)}px;
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
export const Select = styled(Picker)`
  height: ${hp(5)};
  width: 90%;
`;
export const Error = styled.Text`
  color: ${color.error};
  text-align: center;
  font-family: ${font.regular};
  font-size: ${wp(3)}px;
  margin-bottom: ${hp(2)}px;
`;
