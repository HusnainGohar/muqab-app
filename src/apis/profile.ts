import { Toast } from '@ant-design/react-native';
import { api } from '.';
import { handleError } from '../utils/functions';
import {
  UpdateProfileParams,
  ErrorResponse,
  ResponseType,
} from '../utils/types';
import { MyProfileQueryKey } from '../utils/constants';

export const profileApis = api.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<any, any>({
      query: () => {
        return {
          url: '/user/profile',
          method: 'GET',
        };
      },
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data } = baseQueryReturnValue;
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
      providesTags: [MyProfileQueryKey],
    }),

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
      invalidatesTags: [MyProfileQueryKey],
    }),

    updateProfile: builder.mutation<any, UpdateProfileParams>({
      query: data => {
        console.log('body...', data);

        return {
          url: '/user/updateUserProfile',
          method: 'PATCH',
          body: data,
        };
      },
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data, code, message } = baseQueryReturnValue;
        console.log('data...', data, code);

        if (code === 1) {
          Toast.success({
            content: message,
            duration: 2,
          });
        }
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
      invalidatesTags: [MyProfileQueryKey],
    }),

    uploadUserProfileMedia: builder.mutation<any, any>({
      query: file => {
        const formData = new FormData();
        formData.append('media', file);
        return {
          url: '/user/profile/media/upload',
          method: 'PATCH',
          body: formData,
        };
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
      invalidatesTags: [MyProfileQueryKey],
    }),

    removeUserProfileMedia: builder.mutation<any, any>({
      query: file => {
        return {
          url: '/user/profile/media/remove',
          method: 'PATCH',
          body: {
            media: file,
          },
        };
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
      invalidatesTags: [MyProfileQueryKey],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUploadProfilePicMutation,
  useUpdateProfileMutation,
  useUploadUserProfileMediaMutation,
  useRemoveUserProfileMediaMutation,
} = profileApis;
