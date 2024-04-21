import { NextFunction, Request, Response } from 'express';
import { ApplicationError, CommonError, sendResponse } from '../lib/api';

export const syncValidationToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApplicationError(CommonError.UNAUTHORIZED);
    }

    try {
      if (authHeader !== 'Bearer ') {
        throw new ApplicationError(CommonError.INVALID_TOKEN);
      }

      next();
    } catch {
      throw new ApplicationError(CommonError.INVALID_TOKEN);
    }
  } catch (error) {
    return sendResponse(res, error);
  }
};
