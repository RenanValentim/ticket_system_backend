import { ApplicationError } from '../../lib/api';

export const AuthErrors = {
  EMAIL_ALREADY_USED: {
    type: ApplicationError.type.APP_NAME,
    code: 'EMAIL_ALREADY_USED',
    message: 'The given email is already used.',
    statusCode: 400,
  },
  ERROR_CREATE_USER: {
    type: ApplicationError.type.APP_NAME,
    code: 'ERROR_CREATE_USER',
    message: 'An error occurred in the user creation process. Try again later.',
    statusCode: 500,
  },
  INVALID_USER_PASSWORD: {
    type: ApplicationError.type.APP_NAME,
    code: 'INVALID_USER_PASSWORD',
    message: 'Incorrect email or password.',
    statusCode: 400,
  },
  INVALID_PASSWORD: {
    type: ApplicationError.type.APP_NAME,
    code: 'INVALID_PASSWORD',
    message: 'Incorrect password.',
    statusCode: 400,
  },
  DISABLED_USER: {
    type: ApplicationError.type.APP_NAME,
    code: 'DISABLED_USER',
    message: 'Inactivated user.',
    statusCode: 403,
  },
  DONT_HAVE_ACCESS: {
    type: ApplicationError.type.APP_NAME,
    code: 'DONT_HAVE_ACCESS',
    message: 'You do not have authorization to access.',
    statusCode: 403,
  },
  USER_NOT_FOUND: {
    type: ApplicationError.type.APP_NAME,
    code: 'USER_NOT_FOUND',
    message: 'User not found.',
    statusCode: 404,
  },
};
