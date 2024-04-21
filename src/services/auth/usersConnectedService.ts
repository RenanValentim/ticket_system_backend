import { ApplicationError, CommonError } from '../../lib/api';
import prismaClient from '../../database/prismaClient';

export class UsersConectedService {
  async execute() {
    try {
      const users = await prismaClient.user.findMany({
        where: {
          is_logged: true,
        },
      });

      return users;
    } catch (error) {
      throw new ApplicationError(CommonError.BAD_REQUEST);
    }
  }
}
