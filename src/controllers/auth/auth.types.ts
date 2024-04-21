import { Genre, Role } from '@prisma/client';

export type TUser = {
  name: string;
  email: string;
  document: string;
  phone_number: string;
  password: string;
  genre: Genre;
  user_type: Role;
  city: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TLogout = {
  id: number;
};

export type VerifyPasswordParam = {
  id: number;
};

export type VerifyPasswordBody = {
  password: string;
};

export type UpdateUserParam = {
  id: number;
};
