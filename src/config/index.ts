export const secret_token = process.env.SECRET_TOKEN as string;
export const APP_HOST = process.env.APP_HOST;
export const HTTP_PORT = process.env.HTTP_PORT || 3335;
export const HTTP_HOST = APP_HOST || `http://localhost:${HTTP_PORT}`;
export const SECRET_CRYPTO_KEY = process.env.SECRET_CRYPTO_KEY as string;
