import { api } from '.';
import { AdvisorQueryKey } from '../utils/constants';
import { handleError } from '../utils/functions';
import { ErrorResponse } from '../utils/types';

export const advisorApis = api.injectEndpoints({
  endpoints: builder => ({
    getAdvisor: builder.query<any, any>({
      query: data => ({
        url: `/advisors/`,
        method: 'POST',
        body: {
          offset: data.offset,
          limit: data.limit,
          search: data.searchAdvisor,
          filters: {
            onlineStatus: data.filterStatus,
            ratings: data.ratingsFilter,
            price: data.minPrice,
            topics: data.topics,
            tools: data.tools,
          },
        },
      }),
      providesTags: (_, __, arg) => {
        console.log('arg...', arg, AdvisorQueryKey);

        return [{ id: 1, type: AdvisorQueryKey, ...arg }];
      },
      transformResponse(baseQueryReturnValue: any) {
        const { data } = baseQueryReturnValue;
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),
    getAdvisorById: builder.query<any, any>({
      query: id => ({
        url: `/advisors/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAdvisorQuery, useGetAdvisorByIdQuery } = advisorApis;
