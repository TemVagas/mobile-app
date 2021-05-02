import * as Yup from 'yup';

export const SignInValidateShape = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é um campo obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .required('Senha é um campo obrigatório'),
});
