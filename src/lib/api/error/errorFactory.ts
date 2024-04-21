import * as Yup from 'yup';
import { ApplicationError } from './applicationError';

export const createError = (error: Error, overrides?: object) => {
  const isYupError = error instanceof Yup.ValidationError;
  if (isYupError) {
    const yupError = mapYupValidationError(error);
    return new ApplicationError(yupError, overrides);
  }
  return new ApplicationError(error, overrides);
};

const mapYupValidationError = (error: Yup.ValidationError) => {
  return {
    type: ApplicationError.type.APP_NAME,
    code: 'VALIDATION_ERROR',
    message: error.message,
    errors: error.inner,
    statusCode: 400,
    meta: {
      context: error.value,
    },
  };
};
