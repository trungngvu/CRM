import { createApi } from '@reduxjs/toolkit/query/react';

import { API_CONFIG } from '@configs';
import {
  API_METHOD,
  CreateRoleProps,
  CreateRoleResponse,
  DeleteRoleProps,
  GetPermissionResponse,
  GetRoleProps,
  GetRoleResponse,
  GetRolesResponse,
  UpdateRoleProps,
  UpdateRoleResponse,
} from '@types';

import { baseQuery } from './base-query';

const { PERMISSION, ROLE } = API_CONFIG;
const { POST, GET, PATCH, DELETE } = API_METHOD;

export const ROLE_API_REDUCER_KEY = 'roleAPI';

export const roleAPI = createApi({
  reducerPath: ROLE_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: builder => ({
    createRole: builder.mutation<CreateRoleResponse, CreateRoleProps>({
      query: data => ({
        url: ROLE,
        method: POST,
        data,
      }),
    }),
    getRoles: builder.query<GetRolesResponse, void>({
      query: data => ({
        url: ROLE,
        method: GET,
        data,
      }),
    }),
    getRoleById: builder.query<GetRoleResponse, GetRoleProps>({
      query: data => ({
        url: `${ROLE}/${data.id}`,
        method: GET,
      }),
    }),
    updateRole: builder.mutation<UpdateRoleResponse, UpdateRoleProps>({
      query: data => ({
        url: `${ROLE}/${data.id}`,
        method: PATCH,
        data,
      }),
    }),
    deleteRoleById: builder.mutation<void, DeleteRoleProps>({
      query: data => ({
        url: `${ROLE}/${data.id}`,
        method: DELETE,
      }),
    }),

    getPermissions: builder.query<GetPermissionResponse, void>({
      query: data => ({
        url: PERMISSION,
        method: GET,
        data,
      }),
    }),
  }),
});

export const roleApiReducer = roleAPI.reducer;

export const {
  useCreateRoleMutation,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
  useDeleteRoleByIdMutation,
} = roleAPI;
