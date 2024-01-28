import { Toast } from '@ant-design/react-native';
import { api } from '.';
import { handleError } from '../utils/functions';
import {
  UpdateProfileParams,
  ErrorResponse,
  ResponseType,
} from '../utils/types';

export const profileApis = api.injectEndpoints({
  endpoints: builder => ({
    uploadProfilePic: builder.mutation<any, any>({
      query: file => {
        console.log('file...', file);

        const formData = new FormData();
        formData.append('image', file);
        return {
          url: '/user/updateProfilePhoto',
          method: 'PATCH',
          body: formData,
        };
      },
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data, code } = baseQueryReturnValue;
        if (code === 1) {
          Toast.success({
            content: data?.message,
            duration: 2,
          });
        }
        return data;
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
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data, code } = baseQueryReturnValue;
        if (code === 1) {
          Toast.success({
            content: data?.message,
            duration: 2,
          });
        }
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),
  }),
});

export const { useUploadProfilePicMutation, useUpdateProfileMutation } =
  profileApis;
