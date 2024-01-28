import { Toast } from '@ant-design/react-native';
import { api } from '.';
import { handleError, transformAuthData } from '../utils/functions';
import {
  ResponseType,
  ErrorResponse,
  ForgetParams,
  LoginParams,
  SignUpParams,
  VerfiyParams,
  SocialAuthArgs,
  ChangePasswordParams,
} from '../utils/types';

export const authApis = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<any, LoginParams>({
      query: ({ username, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: { username, password },
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data } = baseQueryReturnValue;
        return transformAuthData(data);
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    signUp: builder.mutation<any, SignUpParams>({
      query: ({ email, password, phone, firstName, lastName }) => ({
        url: '/user/register',
        method: 'POST',
        body: { email, password, phone, firstName, lastName },
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data } = baseQueryReturnValue;
        return transformAuthData(data);
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    socialAuth: builder.mutation<any, SocialAuthArgs>({
      query: args => ({
        url: `/user/auth/social/${args.authProvider}`,
        method: 'POST',
        body: args.credentials,
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data } = baseQueryReturnValue;
        return transformAuthData(data);
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    verfiy: builder.mutation<any, VerfiyParams>({
      query: ({ username, otp, forResetPassword }) => ({
        url: '/user/verify-otp',
        method: 'POST',
        body: { username, otp, forResetPassword },
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data } = baseQueryReturnValue;
        return transformAuthData(data);
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    sendOtp: builder.mutation<any, any>({
      query: ({ username }) => ({
        url: '/user/send-otp',
        method: 'POST',
        body: { username },
      }),
      transformResponse(baseQueryReturnValue: any) {
        const { data } = baseQueryReturnValue;
        Toast.success({
          content: data?.message,
          duration: 2,
        });
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    setNewPassword: builder.mutation<any, ForgetParams>({
      query: data => ({
        url: '/user/add-new-password',
        method: 'POST',
        body: {
          password: data.password,
          verificationToken: data.verificationToken,
        },
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data, code } = baseQueryReturnValue;
        if (code === 1) {
          Toast.success({
            content: data?.message,
            duration: 2,
          });
        }
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    changePassword: builder.mutation<any, ChangePasswordParams>({
      query: data => ({
        url: '/user/change-password',
        method: 'POST',
        body: { password: data.password, newPassword: data.newPassword },
      }),
      transformResponse(baseQueryReturnValue: ResponseType) {
        const { data, code } = baseQueryReturnValue;
        if (code === 1) {
          Toast.success({
            content: data?.message,
            duration: 2,
          });
        }
        return baseQueryReturnValue;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),

    logout: builder.mutation<any, any>({
      query: () => ({
        url: '/user/logout',
        method: 'POST',
      }),
      transformResponse(baseQueryReturnValue: any) {
        const { data } = baseQueryReturnValue;
        Toast.success({
          content: data?.message,
          duration: 2,
        });
        return data;
      },
      transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
        const error = handleError(baseQueryReturnValue);
        return error;
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useVerfiyMutation,
  useSendOtpMutation,
  useSetNewPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = authApis;
