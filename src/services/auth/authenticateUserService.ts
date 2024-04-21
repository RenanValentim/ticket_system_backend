import prismaClient from '../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { secret_token } from '../../config';
import { Access_status } from '@prisma/client';
import { TLogin } from '../../controllers/auth/auth.types';
import { ApplicationError, CommonError } from '../../lib/api';
import { AuthErrors } from '../../controllers/auth/auth.errors';

export class AuthenticateUserService {
  async execute({ email, password }: TLogin) {
    try {
      const userExists = await prismaClient.user.findFirst({
        where: {
          email,
        },

        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          user_type: true,
          access_status: true,
        },
      });

      if (!userExists) {
        throw new ApplicationError(AuthErrors.INVALID_USER_PASSWORD);
      }

      const passwordMatch = await compare(password, userExists.password);

      if (!passwordMatch) {
        throw new ApplicationError(AuthErrors.INVALID_USER_PASSWORD);
      }

      if (userExists.access_status == Access_status.inactive) {
        throw new ApplicationError(AuthErrors.DISABLED_USER);
      }

      await prismaClient.user.update({
        where: {
          id: userExists.id,
        },
        data: {
          is_logged: true,
        },
      });

      const token = sign({}, secret_token, {
        subject: String(userExists.id),
        expiresIn: '1d',
      });

      return {
        user: {
          id: userExists.id,
          name: userExists.name,
          email: userExists.email,
          user_type: userExists.user_type,
        },
        token,
      };
    } catch (error) {
      console.log(error);
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(CommonError.INTERNAL_SERVER_ERROR);
    }
  }
}
