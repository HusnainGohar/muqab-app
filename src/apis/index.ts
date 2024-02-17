import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../config';
import { AdvisorQueryKey, MyProfileQueryKey } from '../utils/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [AdvisorQueryKey, MyProfileQueryKey],
});
