import { mixed, object, string } from 'yup';

export const CreateUserSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().required(),
  document: string().required(),
  phone_number: string().required(),
  genre: mixed().oneOf(['MALE', 'FEMALE']).defined().required(),
  user_type: mixed()
    .oneOf(['ADMINISTRATOR', 'OPERATOR', 'DRIVER'])
    .defined()
    .required(),
});

export const UpdateUserSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().required(),
  genre: mixed().oneOf(['MALE', 'FEMALE']).defined().required(),
});

export const LoginSchema = object({
  email: string().required(),
  password: string().required(),
});

export const VerifyPasswordSchema = object({
  password: string().required(),
});
