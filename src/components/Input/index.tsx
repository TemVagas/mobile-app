import React from 'react';
import { TextInputProps, TextInput } from 'react-native';

import { color } from '../../constants';

import { InputContainer, Icon, StyledInput, SimpleButton } from './styles';

interface InputProps extends TextInputProps {
  passwordIsVisible: boolean;
  setPasswordIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reference: React.Ref<TextInput> | undefined;
  icon: string;
}

function Input({
  passwordIsVisible,
  setPasswordIsVisible,
  icon,
  reference,
  ...rest
}: Partial<InputProps>) {
  return (
    <InputContainer>
      <Icon name={icon} size={18} color={color.text.tertiary} />
      <StyledInput
        ref={reference}
        placeholderTextColor={color.text.tertiary}
        {...rest}
      />
      {setPasswordIsVisible && (
        <SimpleButton onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
          {passwordIsVisible ? (
            <Icon name="eye" size={18} color={color.text.primary} />
          ) : (
            <Icon name="eye-slash" size={18} color={color.text.primary} />
          )}
        </SimpleButton>
      )}
    </InputContainer>
  );
}

export default Input;
