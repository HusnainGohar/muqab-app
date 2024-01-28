export interface DataResponse {
  message?: string;
  user: {
    [key: string]: string | boolean | number;
  };
  accessToken?: string;
  verificationToken?: string;
}
export interface ResponseType {
  code: number;
  data: DataResponse;
  message: string;
}

export type ToolTopicType = {
  _id: string;
  name: string;
  title: string;
};
export interface User {
  id: string;
  createdAt: string;
  currency: string;
  email: string;
  firstName: string;
  isActive: boolean;
  isAdmin: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastName: string;
  phone: string;
  updatedAt: string;
  userRole: string;
  isEmailNotificationsEnabled: true;
  isNewOfferEmailsEnabled: true;
  isNewsLetterAndHoroscopeEnabled: true;
  media?: string[];
  gifts?: string[];
  tools?: ToolTopicType[];
  hobbies?: string[];
  languages?: string[];
  permissions?: [];
  topics?: ToolTopicType[];
  profilePic?: string;
  dateOfBirth?: string;
  gender?: string;
  country?: string;
  city?: string;
}
export interface AuthStoreType {
  token?: string;
  verificationToken?: string;
  user?: User;
}
export interface LoginParams {
  username: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
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
  authProvider: string;
  credentials: any;
}

export interface ChangePasswordParams {
  password: string;
  newPassword: string;
}
