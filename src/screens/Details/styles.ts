import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { color } from '../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${color.background};
  align-items: center;
  margin-top: ${getStatusBarHeight()}px;
`;

