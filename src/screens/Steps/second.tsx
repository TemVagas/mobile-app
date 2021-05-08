import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Container, Image, Title, Button } from './styles';

import SecondIMG from '../../assets/second.png';
import { color } from '../../constants';
import { useFirstSteps } from '../../contexts/steps';

function Second() {
  const { completeSteps } = useFirstSteps();
  return (
    <Container>
      <Title>
        Anuncie{'\n'} vagas de diversas{'\n'}áreas
      </Title>
      <Image source={SecondIMG} />
      <Button onPress={completeSteps}>
        <FontAwesome name="chevron-right" color={color.primary} size={20} />
      </Button>
    </Container>
  );
}

export default Second;
