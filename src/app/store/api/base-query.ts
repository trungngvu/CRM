import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';

import { API_CONFIG } from '@configs';
import { UserSliceProps } from '@types';
import convertNullToUndefined from '@utils/convert-null-to-undefined';

const { BASE_URL } = API_CONFIG;

type RootState = {
  user: UserSliceProps;
};

export const baseInstance = axios.create({
  baseURL: BASE_URL || '',
});

const axiosBaseQuery =
  (): BaseQueryFn =>
  async (requestOpts, { getState }) => {
    try {
      const token = (getState() as RootState)?.user?.accessToken;

      const result = await baseInstance({
        ...requestOpts,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: convertNullToUndefined(result.data) };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return { error: { status: err.response?.status, data: err.response?.data } };
    }
  };

export const baseQuery = axiosBaseQuery();
