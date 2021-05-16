import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { color, font } from '../../constants';

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
export const StyledInput = styled.TextInput`
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
