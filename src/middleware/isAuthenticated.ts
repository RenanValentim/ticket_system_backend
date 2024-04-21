/* eslint-disable @typescript-eslint/ban-types */
import { AuthErrors } from '../controllers/auth/auth.errors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ApplicationError, CommonError, sendResponse } from '../lib/api';
import { secret_token } from '../config';
import prismaClient from '../database/prismaClient';

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApplicationError(CommonError.UNAUTHORIZED);
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verify(token, secret_token) as IPayload;

      const userExists = await prismaClient.user.update({
        data: {
          is_logged: true,
        },
        where: {
          id: +user_id,
        },
      });

      if (!userExists) {
        throw new ApplicationError(AuthErrors.USER_NOT_FOUND);
      }

      req.params = {
        id: +user_id,
        type: userExists.user_type,
      };

      next();
    } catch {
      throw new ApplicationError(CommonError.INVALID_TOKEN);
    }
  } catch (error) {
    return sendResponse(res, error);
  }
};
