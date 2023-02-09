import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import { DeleteUserProps } from '@src/app/types/api/user/delete-user';
import {
  API_METHOD,
  ChangePasswordProps,
  ChangePasswordResponse,
  CreateUserProps,
  CreateUserResponse,
  ForgotPasswordProps,
  ForgotPasswordResponse,
  GetUserProps,
  GetUserResponse,
  GetUsersResponse,
  SignInWithEmailAndPasswordProps,
  SignInWithEmailAndPasswordResponse,
  SignInWithTokenResponse,
  UpdateUserProps,
  UpdateUserResponse,
} from '@types';

import { baseQuery } from './base-query';

const { SIGN_IN_WITH_EMAIL_AND_PASSWORD, SIGN_IN_WITH_TOKEN, FORGOT_PASSWORD, CHANGE_PASSWORD, USERS } = API_CONFIG;
const { GET, POST, PATCH, DELETE } = API_METHOD;

export const USER_API_REDUCER_KEY = 'userApi';

export const userAPI = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    signInWithEmailAndPassword: builder.mutation<SignInWithEmailAndPasswordResponse, SignInWithEmailAndPasswordProps>({
      query: data => ({
        url: SIGN_IN_WITH_EMAIL_AND_PASSWORD,
        method: POST,
        data,
      }),
    }),
    signInWithToken: builder.mutation<SignInWithTokenResponse, void>({
      query: () => ({
        url: SIGN_IN_WITH_TOKEN,
        method: GET,
      }),
    }),

    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordProps>({
      query: data => ({
        url: FORGOT_PASSWORD,
        method: POST,
        data,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordProps>({
      query: data => ({
        url: CHANGE_PASSWORD,
        method: POST,
        data,
      }),
    }),

    createUser: builder.mutation<CreateUserResponse, CreateUserProps>({
      query: data => ({
        url: USERS,
        method: POST,
        data,
      }),
    }),
    getUsers: builder.query<GetUsersResponse, void>({
      query: () => ({
        url: USERS,
        method: GET,
      }),
    }),
    getUserById: builder.query<GetUserResponse, GetUserProps>({
      query: data => ({
        url: `${USERS}/${data.id}`,
        method: GET,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserProps>({
      query: data => ({
        url: `${USERS}/${data.id}`,
        method: PATCH,
        data,
      }),
    }),
    deleteUserById: builder.mutation<void, DeleteUserProps>({
      query: data => ({
        url: `${USERS}/${data.id}`,
        method: DELETE,
      }),
    }),
  }),
});

export const userAPIReducer = userAPI.reducer;

export const {
  useSignInWithEmailAndPasswordMutation,
  useSignInWithTokenMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useGetUsersQuery,
  useDeleteUserByIdMutation,
  useUpdateUserMutation,
  useCreateUserMutation,
  useGetUserByIdQuery,
} = userAPI;
