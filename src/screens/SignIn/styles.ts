import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { Animated } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { color, font } from '../../constants';

export const Container = styled(Animated.ScrollView)`
  flex: 1;
  background-color: ${color.background};
`;
export const Image = styled.Image`
  width: 90%;
  margin: ${hp(4)}px 0px;
  height: ${hp(45)}px;
`;
export const InputContainer = styled.View`
  margin-bottom: ${hp(2)}px;
  background-color: ${color.input};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  border-radius: ${hp(1)}px;
  padding: 0px ${wp(4)}px;
`;
export const Input = styled.TextInput`
  flex: 1;
  height: ${hp(7)}px;
  padding-left: ${wp(3)}px;
  font-family: ${font.regular};
  color: ${color.text.secondary};
`;
export const Icon = styled(FontAwesome)``;
export const SimpleButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
`;
export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;
  background-color: ${color.primary};
  height: ${hp(7)}px;
  border-radius: ${hp(1)}px;
  width: 90%;
`;
export const ButtonText = styled.Text`
  color: ${color.background};
  font-size: ${wp(5)}px;
  font-family: ${font.medium};
`;
export const SignUpText = styled.Text`
  margin-right: ${wp(2)}px;
  font-family: ${font.regular};
  color: ${color.text.tertiary};
  font-size: ${wp(4.5)}px;
`;

export const SignUpContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${hp(5)}px 0px;
`;
export const SignUpButtonText = styled.Text`
  font-family: ${font.bold};
  color: ${color.primary};
  font-size: ${wp(4.5)}px;
`;
