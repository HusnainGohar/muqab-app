import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://muqab.up.railway.app/api`,
    // baseUrl: `http://192.168.205.84:3000/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any)?.auth?.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
});
