import jwtDecode from 'jwt-decode';

import { API_CONFIG } from '@configs';

import database from '../database.json';
import mock from '../mock';
import { JwtPayloadProps } from '../types';
import { generateJwtToken, verifyJwtToken } from '../utils';

mock.onPost(API_CONFIG.SIGN_IN_WITH_EMAIL_AND_PASSWORD).reply(config => {
  const data = JSON.parse(config.data as string);

  const { email, password } = data;

  const user = database.user.find(_user => _user.email === email);

  if (!user || user.password !== password) {
    return [
      400,
      {
        message: 'Login failed',
        error: {
          message: 'Invalid email or password',
        },
      },
    ];
  }

  const { password: userPassword, ...userWithOutPassword } = user;

  return [
    200,
    {
      message: 'Login successfully',
      data: {
        accessToken: generateJwtToken(userWithOutPassword),
        user: userWithOutPassword,
      },
    },
  ];
});

mock.onPost(API_CONFIG.SIGN_IN_WITH_TOKEN).reply(config => {
  const authHeader = config?.headers?.Authorization as string;
  const authHeaderSplit = authHeader?.split('Bearer ');
  const accessToken = authHeaderSplit[1];

  if (verifyJwtToken(accessToken)) {
    const { id } = jwtDecode<JwtPayloadProps>(accessToken);

    const user = database.user.find(_user => _user.id === id);

    if (!user) {
      return [
        400,
        {
          message: 'Login failed',
          error: {
            message: 'Invalid access token detected',
          },
        },
      ];
    }

    const { password: userPassword, ...userWithOutPassword } = user;

    return [
      200,
      {
        message: 'Login successfully',
        data: {
          accessToken: generateJwtToken(userWithOutPassword),
          user: userWithOutPassword,
        },
      },
    ];
  }

  return [
    400,
    {
      message: 'Login failed',
      error: {
        message: 'Invalid access token detected',
      },
    },
  ];
});
