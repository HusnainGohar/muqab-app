import { api } from '.';
import { handleError } from '../utils/functions';
import { UpdateProfileParams, ErrorResponse } from '../utils/types';

export const profileApis = api.injectEndpoints({
  endpoints: builder => ({
    uploadProfilePic: builder.mutation<any, any>({
      query: file => {
        const formData = new FormData();
        formData.append('image', file);
        return {
          url: '/user/updateProfilePhoto',
          method: 'PATCH',
          body: formData,
        };
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    updateProfile: builder.mutation<any, UpdateProfileParams>({
      query: data => ({
        url: '/user/updateUserProfile',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const { useUploadProfilePicMutation, useUpdateProfileMutation } =
  profileApis;
