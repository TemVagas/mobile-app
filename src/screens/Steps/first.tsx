import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import { Container, Image, Title, Button } from './styles';

import FirstIMG from '../../assets/first.png';
import { color } from '../../constants';

function First() {
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    route => {
      navigate(route);
    },
    [navigate],
  );

  return (
    <Container>
      <Title>
        Busque{'\n'}por vagas de{'\n'}forma fácil
      </Title>
      <Image source={FirstIMG} />
      <Button onPress={() => handleNavigate('Second')}>
        <FontAwesome name="chevron-right" color={color.primary} size={20} />
      </Button>
    </Container>
  );
}

export default First;
