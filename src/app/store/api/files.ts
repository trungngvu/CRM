import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import { API_METHOD, FileParserProps, FileParserResponse, GetFileProps, GetFileResponse } from '@types';

import { baseQuery } from './base-query';

const { FILES, FILES_UPLOAD } = API_CONFIG;
const { POST, GET } = API_METHOD;

export const FILES_API_REDUCER_KEY = 'filesApi';

export const fileApi = createApi({
  reducerPath: FILES_API_REDUCER_KEY,

  baseQuery,

  endpoints: builder => ({
    fileParser: builder.mutation<FileParserResponse, FileParserProps>({
      query: data => ({
        url: FILES_UPLOAD,
        method: POST,
        data,
      }),
    }),
    getFileByPath: builder.query<GetFileResponse, GetFileProps>({
      query: data => ({
        url: `${FILES}/${data.path}`,
        method: GET,
      }),
    }),
  }),
});

export const fileApiReducer = fileApi.reducer;

export const { useFileParserMutation, useGetFileByPathQuery } = fileApi;
