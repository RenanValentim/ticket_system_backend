import { Role } from '@prisma/client';
import { compare } from 'bcrypt';
import prismaClient from '../../database/prismaClient';
import { ApplicationError } from '../../lib/api';
import { AuthErrors } from '../../controllers/auth/auth.errors';

export class VerifyPasswordService {
  async execute(userId: number, password: string) {
    const userExists = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (!userExists) return null;

    if (
      userExists.user_type !== Role.administrator &&
      userExists.user_type !== Role.technician
    )
      throw new ApplicationError(AuthErrors.DONT_HAVE_ACCESS);

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new ApplicationError(AuthErrors.INVALID_PASSWORD);
    }

    return { message: 'success' };
  }
}
