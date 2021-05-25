import React from 'react';
import { TextInputProps, TextInput } from 'react-native';

import { color } from '../../constants';

import {
  InputContainer,
  Icon,
  StyledInput,
  SimpleButton,
  Error,
  Container,
} from './styles';

export interface InputProps extends TextInputProps {
  passwordIsVisible: boolean;
  setPasswordIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reference: React.Ref<TextInput> | undefined;
  icon: string;
  error: string | undefined | boolean;
}

function Input({
  passwordIsVisible,
  setPasswordIsVisible,
  icon,
  error,
  reference,
  ...rest
}: Partial<InputProps>) {
  return (
    <Container>
      <InputContainer error={error}>
        <Icon
          name={icon}
          size={18}
          color={error ? color.error : color.text.tertiary}
        />
        <StyledInput
          error={error}
          ref={reference}
          placeholderTextColor={error ? color.error : color.text.tertiary}
          {...rest}
        />
        {setPasswordIsVisible && (
          <SimpleButton
            onPress={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            {passwordIsVisible ? (
              <Icon
                name="eye"
                size={18}
                color={error ? color.error : color.text.primary}
              />
            ) : (
              <Icon
                name="eye-slash"
                size={18}
                color={error ? color.error : color.text.primary}
              />
            )}
          </SimpleButton>
        )}
      </InputContainer>
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default Input;
