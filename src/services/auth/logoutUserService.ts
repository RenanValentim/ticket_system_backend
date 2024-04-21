import { ApplicationError, CommonError } from '../../lib/api';
import prismaClient from '../../database/prismaClient';
import { TLogout } from '../../controllers/auth/auth.types';
import { AuthErrors } from '../../controllers/auth/auth.errors';

export class LogoutUserService {
  async execute({ id }: TLogout) {
    const userExists = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!userExists) throw new ApplicationError(AuthErrors.USER_NOT_FOUND);

    try {
      await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          is_logged: false,
        },
      });

      return { signin: true };
    } catch (error) {
      console.log(error);
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(CommonError.INTERNAL_SERVER_ERROR);
    }
  }
}
