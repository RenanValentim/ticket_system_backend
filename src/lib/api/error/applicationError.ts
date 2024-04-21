/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
export class ApplicationError {
  name: string;
  code: string;
  type: string;
  message: string;
  errors: any;
  meta: object;
  statusCode: number;

  static type = {
    APP_NAME: 'APP_NAME',
    INTERNAL: 'INTERNAL',
    NETWORK: 'NETWORK',
    UNKNOWN: 'UNKNOWN',
  };

  constructor(options, overrides?: any) {
    Object.assign(options, overrides);

    if (!ApplicationError.type.hasOwnProperty(options?.type)) {
      throw new Error(
        `ApplicationError: ${options?.type} is not a valid type.`,
      );
    }

    if (!options.message) {
      throw new Error('ApplicationError: error message required.');
    }

    if (!options.code) {
      throw new Error('ApplicationError: error code required.');
    }

    this.name = 'ApplicationError';
    this.type = options.type;
    this.code = options.code;
    this.message = options.message;
    this.errors = options.errors;
    this.meta = options.meta;
    // {
    //   redirect: 'path/to/navigate'
    //   analytics:  {},
    //   context: {}
    // }
    this.statusCode = options.statusCode;
  }
}
