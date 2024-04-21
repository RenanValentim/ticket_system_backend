import { mixed, object, string } from 'yup';

export const CreateUserSchema = object({
  name: string().required(),
  email: string().required(),
  password: string().required(),
  document: string().required(),
  rg: string().required(),
  phone_number: string().required(),
  genre: mixed().oneOf(['MALE', 'FEMALE']).defined().required(),
  user_type: mixed()
    .oneOf(['administrator', 'technician', 'common'])
    .defined()
    .required(),

  address: object({
    cep: string().required(),
    street_name: string().required(),
    street_number: string().required(),
    neighborhood: string().required(),
    city: string().required(),
    uf_state: string().required(),
    country: string().required(),
    complement: string(),
  }),
});

export const UpdateUserSchema = object({
  name: string().required(),
  document: string().required(),
  genre: mixed().oneOf(['MALE', 'FEMALE']).defined().required(),
  rg: string().required(),
  email: string().required(),
  phone_number: string().required(),
  user_type: mixed()
    .oneOf(['ADMINISTRATOR', 'OPERATOR', 'DRIVER', 'AGENCY'])
    .defined()
    .required(),
});
