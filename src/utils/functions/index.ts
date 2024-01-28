import { Toast } from '@ant-design/react-native';
import { DataResponse, ErrorResponse } from '../types';
import { store } from '../../store';
import { logout } from '../../store/slices';
export * from './social-auth';

export const handleError = (err: ErrorResponse) => {
  const errorMessage = err?.data?.message ?? '';
  const errorMessageDescription = err?.data?.data?.message ?? '';
  const errorStatus = err.status ?? 0;
  if (errorStatus === 401) {
    store.dispatch(logout());
  }
  const error = {
    message: errorMessage,
    status: errorStatus,
    data: {
      message: errorMessageDescription,
    },
  };
  Toast.fail({
    content:
      errorStatus === 401
        ? 'Session got expired! Login again to continue'
        : errorMessage || `Something went wrong! ${errorStatus}`,
    duration: 2,
  });
  return error;
};

export const transformAuthData = (data: DataResponse) => {
  return {
    verificationToken: data?.verificationToken,
    token: data?.accessToken,
    user: data?.user,
    // user: {
    //   id: data.user?._id,
    //   email: data.user?.email,
    //   phone: data.user?.phone,
    //   firstName: data.user?.firstName,
    //   lastName: data.user?.lastName,
    //   currency: data.user?.currency,
    //   isActive: Boolean(data.user?.isActive),
    //   isAdmin: Boolean(data.user?.isAdmin),
    //   isEmailVerified: Boolean(data.user?.isEmailVerified),
    //   isPhoneVerified: Boolean(data.user?.isPhoneVerified),
    //   createdAt: data.user?.createdAt,
    //   updatedAt: data.user?.updatedAt,
    //   userRole: data.user?.userRole,
    // },
  };
};
