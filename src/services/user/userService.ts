import { UserErrors } from '../../controllers/user/user.errors';
import prismaClient from '../../database/prismaClient';
import { hash } from 'bcrypt';
import { ApplicationError } from '../../lib/api';
import { Access_status, Prisma } from '@prisma/client';
import { TChangePassword, TResultUser, TUser } from './user.service.types';
import { IPagination } from 'types/pagination';
import { Pagination } from '../../validations/validate';

export class UserService {
  async Register({
    name,
    email,
    password,
    genre,
    document,
    rg,
    phone_number,
    user_type,
    address,
  }: TUser) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ApplicationError(UserErrors.EMAIL_ALREADY_USED);
    }

    const passwordHash = await hash(password, 8);

    try {
      const user = await prismaClient.user.create({
        data: {
          name,
          genre,
          email,
          document,
          rg,
          phone_number,
          password: passwordHash,
          user_type,
          access_status: Access_status.active,

          Address: {
            create: {
              ...address,
            },
          },
        },
      });
      return user;
    } catch (error) {
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(UserErrors.ERROR_CREATE_USER);
    }
  }

  async ChangePassword(values: TChangePassword) {
    try {
      const passwordHash = await hash(values.data.password, 8);
      const user = await prismaClient.user.update({
        where: {
          id: values.userId,
        },
        data: {
          password: passwordHash,
        },
      });

      return user;
    } catch (error) {
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(UserErrors.CHANGE_USER_PASSWORD);
    }
  }

  async GetAll({ search, skip, take }: IPagination) {
    const where: Prisma.UserWhereInput = {};

    let pagination = {};

    if (skip && take) pagination = Pagination(skip, take);

    if (search && !isNaN(Number(search))) {
      where.id = {
        equals: Number(search),
      };
    }

    if (search && isNaN(Number(search))) {
      where.email = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (search && isNaN(Number(search))) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    // if (status) where.access_status = status;

    const [users, total] = await prismaClient.$transaction([
      prismaClient.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          user_type: true,
          access_status: true,
          createdAt: true,

          Address: {
            select: {
              city: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
        ...pagination,
      }),

      prismaClient.user.count({ where }),
    ]);

    const result: { users: TResultUser[]; total: number; totalPage?: number } =
      {
        users,
        total,
      };

    if (take && !isNaN(take)) result.totalPage = Math.ceil(total / take);

    return result;
  }

  async GetById(id: number) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          document: true,
          rg: true,
          genre: true,
          phone_number: true,
          name: true,
          user_type: true,
          access_status: true,
          createdAt: true,
          Address: true,
        },
      });

      return user;
    } catch (error) {
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(UserErrors.USER_NOT_FOUND);
    }
  }

  async UpdateStatus(id: number) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        access_status: true,
      },
    });

    if (!userExists) {
      throw new ApplicationError(UserErrors.USER_NOT_FOUND);
    }

    try {
      const user = await prismaClient.user.update({
        where: {
          id: id,
        },
        data: {
          access_status:
            userExists.access_status == Access_status.active
              ? Access_status.inactive
              : Access_status.active,
        },
      });

      return user;
    } catch (error) {
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(UserErrors.USER_TOGGLE);
    }
  }

  async Update(
    id: number,
    { name, document, email, genre, phone_number, user_type, address }: TUser,
  ) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        access_status: true,
      },
    });

    if (!userExists) {
      throw new ApplicationError(UserErrors.USER_NOT_FOUND);
    }

    try {
      const user = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          name,
          document,
          email,
          genre,
          phone_number,
          user_type,

          Address: {
            update: {
              ...address,
            },
          },
        },
      });

      return user;
    } catch (error) {
      if (error.code) throw new ApplicationError(error);
      throw new ApplicationError(UserErrors.USER_TOGGLE);
    }
  }
}
