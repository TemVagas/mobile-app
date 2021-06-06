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
  // image: Yup.string().min(6).required('Selecione uma foto de perfil'),
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

export const UpdateUserValidateShape = Yup.object().shape({
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
  state: Yup.string().required('É necessário selecionar um estado'),
  city: Yup.string().required('É necessário selecionar uma cidade'),
});

export const AddVacancyValidateShape = Yup.object().shape({
  title: Yup.string().required('Titulo é um campo obrigatório'),
  description: Yup.string().required('Descrição é um campo obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é um campo obrigatório'),
  phone: Yup.string()
    .min(11, 'O número de telefone deve conter 11 caracteres')
    .required('Telefone é um campo obrigatório'),
  // remuneration: Yup.string().required('Salario é um campo obrigatório'),
  state: Yup.string().required('É necessário selecionar um estado'),
  city: Yup.string().required('É necessário selecionar uma cidade'),
  type: Yup.string().required('É nesessário declarar um tipo'),
  category: Yup.string().required('É nesessário declarar uma categoria'),
});

export const UpdateVacancyValidateShape = Yup.object().shape({
  title: Yup.string().required('Titulo é um campo obrigatório'),
  description: Yup.string().required('Descrição é um campo obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é um campo obrigatório'),
  phone: Yup.string()
    .min(11, 'O número de telefone deve conter 11 caracteres')
    .required('Telefone é um campo obrigatório'),
  // remuneration: Yup.string().required('Salario é um campo obrigatório'),
  state: Yup.string().required('É necessário selecionar um estado'),
  city: Yup.string().required('É necessário selecionar uma cidade'),
  type: Yup.string().required('É nesessário declarar um tipo'),
  category: Yup.string().required('É nesessário declarar uma categoria'),
});

export const ChangePasswordValidateShape = Yup.object().shape({
  new_password: Yup.string()
    .min(6, 'O campo nova senha deve conter no minimo 6 caracteres')
    .required('Nova senha é um campo obrigatório'),
  old_password: Yup.string()
    .min(6, 'O campo sua senha deve conter no minimo 6 caracteres')
    .required('Sua senha é um campo obrigatório'),
});
