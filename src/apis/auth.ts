import { api } from '.';
import { handleError } from '../utils/functions';
import { AuthResponseType, ErrorResponse, DataResponse, ForgetParams, LoginParams, SignUpParams, VerfiyParams } from '../utils/types';

const transformData = (data: DataResponse) => {
    return {
        token: data?.accessToken,
        user: {
            id: data._id,
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName,
            currency: data.currency,
            isActive: Boolean(data.isActive),
            isAdmin: Boolean(data.isAdmin),
            isEmailVerified: Boolean(data.isEmailVerified),
            isPhoneVerified: Boolean(data.isPhoneVerified),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userRole: data.userRole,
            website: data.website,
        }
    }
}

export const authApis = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<any, LoginParams>({
            query: ({ username, password }) => ({
                url: '/user/login',
                method: 'POST',
                body: { username, password }
            }),
            transformResponse(baseQueryReturnValue: AuthResponseType) {
                const { data } = baseQueryReturnValue;
                return transformData(data)
            },
            transformErrorResponse(baseQueryReturnValue: ErrorResponse) {
                const error = handleError(baseQueryReturnValue);
                return error
            },
        }),

        signUp: builder.mutation<any, SignUpParams>({
            query: ({ email, password, phone, firstName, lastName, website }) => ({
                url: '/user/register',
                method: 'POST',
                body: { email, password, phone, firstName, lastName, website }
            }),
            transformResponse(baseQueryReturnValue: AuthResponseType) {
                const { data } = baseQueryReturnValue;
                return transformData(data)
            },
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