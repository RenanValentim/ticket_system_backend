import { randomBytes } from 'crypto';
import { AES, enc } from 'crypto-js';
import { SECRET_CRYPTO_KEY } from '.';

export const encrypt = (value: string) => {
  const iv = Buffer.from(randomBytes(16));

  const cipherText = AES.encrypt(value, SECRET_CRYPTO_KEY).toString();

  return `${iv.toString('hex')}-${cipherText}`;
};

export const decrypt = (value: string) => {
  if (!value.includes('-')) return '';
  const [, encrypted] = value.split('-');

  const decry = AES.decrypt(encrypted, SECRET_CRYPTO_KEY);

  return decry.toString(enc.Utf8);
};
