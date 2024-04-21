import { Request, Response } from 'express';
import {
  ApplicationError,
  CommonError,
  createError,
  formatError,
  sendResponse,
} from '../lib/api';

export const errorHandler = (req: Request, res: Response, err) => {
  // const { analytics = {} } = err.meta || {};
  // // logging for analytics
  // console.log({ analytics });

  if (err instanceof ApplicationError) {
    const code = err.statusCode || 500;
    return res.status(code).json(formatError(err));
  }

  if (err instanceof Error) {
    const newError = createError(err, {});
    const code = newError.statusCode || 500;
    return res.status(code).json(formatError(newError));
  }

  const unknownError = new ApplicationError(CommonError.RESOURCE_NOT_FOUND);

  return sendResponse(res, unknownError, err.statusCode);
};
