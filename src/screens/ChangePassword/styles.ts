import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Animated } from 'react-native';
import { color, font } from '../../constants';

export const Container = styled.SafeAreaView`
  background-color: ${color.background};
  flex: 1;
`;
export const HeaderContainer = styled.View`
  height: ${hp(15)}px;
  width: 100%;
  background-color: ${color.primary};
  margin-bottom: ${hp(4)}px;
`;
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${getStatusBarHeight()}px;
`;
export const GoBackButton = styled.TouchableOpacity`
  height: ${hp(8)}px;
  width: 100%;
  margin-top: ${hp(0.5)}px;
  margin-left: ${wp(4)}px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;
export const Title = styled.Text`
  color: ${color.background};
  font-family: ${font.bold};
  font-size: ${wp(6)}px;
  flex: 1;
  margin-left: ${wp(4)}px;
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
