import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Form, Logo, Button, ButtonText } from './styles';

import Input from '../../components/Input';

function UpdateVacancy() {
  const { goBack } = useNavigation();
  return (
    <Container>
      <Logo>JobFinder - Atualizar</Logo>
      <Form contentContainerStyle={{ alignItems: 'center' }}>
        <Input
          placeholder="Titulo"
          icon="address-card"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="Descrição"
          icon="file"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="E-mail"
          icon="user"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="Telefone"
          icon="phone"
          returnKeyType="next"
          keyboardType="number-pad"
          autoCorrect={false}
        />
        <Input
          placeholder="Remuneração"
          icon="money"
          returnKeyType="next"
          keyboardType="number-pad"
          autoCorrect={false}
        />
        <Input
          placeholder="Estado"
          icon="globe"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="Cidade"
          icon="location-arrow"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="Tipo"
          icon="filter"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
        />
        <Input
          placeholder="Categoria"
          icon="building"
          returnKeyType="done"
          keyboardType="default"
          autoCorrect={false}
        />
        <Button activeOpacity={0.8} onPress={() => goBack()}>
          <ButtonText>SALVAR ALTERAÇÕES</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateVacancy;
