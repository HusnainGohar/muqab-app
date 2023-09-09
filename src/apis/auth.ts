import { api } from '.';
import { ForgetParams, LoginParams, SignUpParams, VerfiyParams } from '../utils/types';

export const authApis = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<any, LoginParams>({
            query: ({ username, password }) => ({
                url: '/user/login',
                method: 'POST',
                body: { username, password }
            }),
        }),

        signUp: builder.mutation<any, SignUpParams>({
            query: ({ email, password, phone, firstName, lastName, website }) => ({
                url: '/user/register',
                method: 'POST',
                body: { email, password, phone, firstName, lastName, website }
            }),
        }),

        verfiy: builder.mutation<any, VerfiyParams>({
            query: ({ username, otp }) => ({
                url: '/user/verify-otp',
                method: 'POST',
                body: { username, otp }
            }),
        }),

        sendOtp: builder.mutation<any, any>({
            query: ({ username }) => ({
                url: '/user/send-otp',
                method: 'POST',
                body: { username }
            }),
        }),

        forgetPassword: builder.mutation<any, ForgetParams>({
            query: (data) => ({
                url: '/user/add-new-password',
                method: 'POST',
                body: { password: data.password, verificationToken: data.verificationToken }
            }),
        }),
    }),
});

export const { useSignUpMutation, useLoginMutation, useVerfiyMutation, useSendOtpMutation, useForgetPasswordMutation } = authApis;