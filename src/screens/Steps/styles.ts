import styled from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RectButton } from 'react-native-gesture-handler';

import { color, font } from '../../constants';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  background-color: ${color.background};
  padding: 0px ${wp(4)}px;
`;
export const Title = styled.Text`
  font-size: ${wp(8)}px;
  font-family: ${font.bold};
  color: ${color.primary};
  text-align: center;
`;
export const Image = styled.Image`
  width: 90%;
  height: ${hp(45)}px;
`;
export const Button = styled(RectButton)`
  align-items: center;
  justify-content: center;
  width: ${hp(8)}px;
  height: ${hp(8)}px;
  align-self: flex-end;
`;
