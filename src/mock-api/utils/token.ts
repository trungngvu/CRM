import CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import HmacSHA256 from 'crypto-js/hmac-sha256';

import { JwtPayloadProps } from '../types';

const JWT_SECRET = 'JWT_SECRET';

export const base64url = (source: CryptoJS.lib.WordArray): string => {
  let encodedSource = Base64.stringify(source);

  encodedSource = encodedSource.replace(/=+$/, '');

  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

export const generateJwtToken = (tokenPayload: JwtPayloadProps): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const date = new Date();
  const iat = Math.floor(date.getTime() / 1000);
  const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);

  const payload = {
    iat,
    exp,
    ...tokenPayload,
  };

  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
  const encodedPayload = base64url(stringifiedPayload);

  const signature = base64url(HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET));

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const verifyJwtToken = (token: string): boolean => {
  const parts = token.split('.');
  const header = parts[0];
  const payload = parts[1];
  const signature = parts[2];

  const signatureCheck = base64url(HmacSHA256(`${header}.${payload}`, JWT_SECRET));

  return signature === signatureCheck;
};
