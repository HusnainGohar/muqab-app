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
}

export interface ForgetParams {
  password: string;
  verificationToken: string;
}