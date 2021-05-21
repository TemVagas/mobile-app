import styled, { css } from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { color, font } from '../../constants';

interface InputProps {
  error: string | undefined | boolean;
}

export const Container = styled.View`
  margin-bottom: ${hp(2)}px;
  width: 90%;
  justify-content: center;
`;

export const InputContainer = styled.View<InputProps>`
  background-color: ${color.input};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex: 1;
  border-radius: ${hp(1)}px;
  padding: 0px ${wp(4)}px;
  ${props =>
    props.error &&
    css`
      border: 1px solid ${color.error};
    `}
`;
export const StyledInput = styled.TextInput<InputProps>`
  flex: 1;
  height: ${hp(7)}px;
  padding-left: ${wp(3)}px;
  font-family: ${font.regular};
  ${props =>
    props.error
      ? css`
          color: ${color.error};
        `
      : css`
          color: ${color.text.secondary};
        `}
`;
export const Icon = styled(FontAwesome)``;
export const SimpleButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
`;
export const Error = styled.Text`
  color: ${color.error};
  font-family: ${font.regular};
  font-size: ${wp('3')}px;
`;
