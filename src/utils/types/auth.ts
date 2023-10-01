export interface DataResponse {
  message?: string
  user: {
    [key: string]: string | boolean | number
  },
  accessToken?: string
  verificationToken?: string
}
export interface AuthResponseType {
  code: number
  data: DataResponse,
  message: string
}
export interface User {
  _id: string,
  createdAt: string,
  currency: string,
  email: string,
  firstName: string,
  isActive: boolean,
  isAdmin: boolean,
  isEmailVerified: boolean,
  isPhoneVerified: boolean,
  lastName: string,
  phone: string,
  updatedAt: string,
  userRole: string,
  website: string
}
export interface AuthStoreType {
  token?: string;
  verificationToken?: string;
  user?: User
}
export interface LoginParams {
  username: string;
  password: string
}

export interface SignUpParams {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  website: string
}

export interface VerfiyParams {
  username: string;
  otp: string;
  forResetPassword?: boolean;
}

export interface ForgetParams {
  password: string;
  verificationToken: string;
}

export interface SocialAuthArgs {
  authProvider: string
  credentials: any
}

export interface ChangePasswordParams {
  password: string;
  newPassword: string;
}