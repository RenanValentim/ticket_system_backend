import { Access_status, Genre, Role } from '@prisma/client';

export type TUser = {
  name: string;
  email: string;
  document: string;
  rg: string;
  phone_number: string;
  city: string;
  password: string;
  genre: Genre;
  user_type: Role;

  address: {
    cep: string;
    street_name: string;
    street_number: string;
    neighborhood: string;
    city: string;
    uf_state: string;
    country: string;
    complement: string;
  };
};

export type TChangePassword = {
  userId: number;
  data: { password: string; confirmPassword: string };
};

export type TResultUser = {
  id: number;
  email: string;
  name: string;
  user_type: Role;
  access_status: Access_status;
  createdAt: Date;
};
