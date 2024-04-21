/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError, createError } from '../error';

export const formatError = (error, overrides = {}) => {
  const stackTrace: any = JSON.stringify(error, ['stack'], 4) || {};
  const newError = JSON.parse(JSON.stringify(error));

  newError.statusCode = undefined;
  delete newError.meta;

  return {
    error: {
      ...newError,
      stack: stackTrace.stack,
    },
    success: false,
    ...overrides,
  };
};

export const formatResponse = (result, override = {}) => ({
  ...result,
  ...override,
  // success: true,
});

export const sendResponse = (res, payload, statusCode = 200) => {
  if (payload instanceof ApplicationError) {
    const code = payload.statusCode || 500;
    return res.status(code).json(formatError(payload));
  }

  if (payload instanceof Error) {
    const newError = createError(payload, {});
    const code = newError.statusCode || 500;
    return res.status(code).json(formatError(newError));
  }

  return res.status(statusCode).json(formatResponse(payload));
};
