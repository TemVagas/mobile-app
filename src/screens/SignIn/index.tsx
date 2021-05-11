import React from 'react';
import { Button, Text } from 'react-native';

import { useFirstSteps } from '../../contexts/steps';

import { Container } from './styles';

function SignIn() {
  const { removeSteps } = useFirstSteps();
  return (
    <Container>
      <Text>Entrar</Text>
      <Button title="login" onPress={() => removeSteps()} />
    </Container>
  );
}

export default SignIn;
