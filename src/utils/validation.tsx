import * as Yup from 'yup';

export const SignInValidateShape = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é um campo obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .required('Senha é um campo obrigatório'),
});

export const SignUpValidateShape = Yup.object().shape({
  image: Yup.string().min(6).required('Selecione uma foto de perfil'),
  firstname: Yup.string().required('Nome é um campo obrigatório'),
  lastname: Yup.string().required('Sobrenome é um campo obrigatório'),
  about: Yup.string().required('Este é um campo obrigatório'),
  interests: Yup.string().required('É nesessário declarar algum interesse'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é um campo obrigatório'),
  phone: Yup.string()
    .min(11, 'O número de telefone deve conter 11 caracteres')
    .required('Telefone é um campo obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .required('Senha é um campo obrigatório'),
  state: Yup.string().required('É necessário selecionar um estado'),
  city: Yup.string().required('É necessário selecionar uma cidade'),
});
