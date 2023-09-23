import { FieldDetails, LoginFieldsDetails } from "../types/input-fields-details";

export const loginFields: LoginFieldsDetails = {
  email: {
    name: "username",
    label: 'Business Email',
    placeholder: 'example@example.com',
    type: 'email-address',
    inputMode: 'email',
  },
  phone: {
    name: "username",
    label: 'Phone no.',
    placeholder: '212 456 7890',
    type: 'phone',
    inputMode: 'tel',
  },
  password: {
    name: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
    inputMode: 'text',
  },
};

export const loginWithEmailFields: FieldDetails[] = [
  {
    name: "email",
    label: 'Email',
    placeholder: 'example@example.com',
    type: 'email-address',
    inputMode: 'email',
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your Password",
    type: "password",
    inputMode: 'text'
  }
];

export const loginWithPhoneFields: FieldDetails[] = [
  {
    name: "phone",
    label: 'Phone no.',
    placeholder: '212 456 7890',
    type: 'phone',
    inputMode: 'tel',
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your Password",
    type: "password",
    inputMode: 'text'
  }
];

export const emailVerifyFields: FieldDetails[] = [
  {
    name: "email",
    label: 'Email',
    placeholder: 'example@example.com',
    type: 'email-address',
    inputMode: 'email',
  },
];

export const phoneVerifyFields: FieldDetails[] = [
  {
    name: "phone",
    label: 'Phone no.',
    placeholder: '212 456 7890',
    type: 'phone',
    inputMode: 'tel',
  },
];

export const verifyOtpFields: FieldDetails[] = [
  {
    name: "otp",
    label: '',
    placeholder: '',
    type: 'digit',
    inputMode: 'tel',
    isOTP: true,
  },
];


export const resetPasswordFields: FieldDetails[] = [
  {
    name: "password",
    label: "New Password",
    placeholder: "Password must be at least 8 characters",
    type: "password",
    inputMode: 'text'
  },
  {
    name: "retypePassword",
    label: "Retype Password",
    placeholder: "Re-Enter new Password",
    type: "password",
    inputMode: 'text'
  },
];

export const changePasswordFields: FieldDetails[] = [
  {
    name: "password",
    label: 'Current Password',
    placeholder: 'Enter your current password',
    type: 'password',
    inputMode: 'text',
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Password must be at least 8 characters",
    type: "password",
    inputMode: 'text'
  },
  {
    name: "retypePassword",
    label: "Retype Password",
    placeholder: "Re-Enter new Password",
    type: "password",
    inputMode: 'text'
  },
];

export const registerFields: FieldDetails[] = [
  {
    name: "firstName",
    label: 'First Name',
    placeholder: 'John',
    type: 'text',
    inputMode: 'text',
  },
  {
    name: "lastName",
    label: 'Last Name',
    placeholder: 'Doe',
    type: 'text',
    inputMode: 'text',
  },
  {
    name: "email",
    label: 'Email',
    placeholder: 'example@example.com',
    type: 'email-address',
    inputMode: 'email',
  },
  {
    name: "phone",
    label: 'Phone no.',
    placeholder: '212 456 7890',
    type: 'phone',
    inputMode: 'tel',
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password must be at least 8 characters",
    type: "password",
    inputMode: 'text'
  },
  {
    name: "retypePassword",
    label: "Retype Password",
    placeholder: "Re-Enter Your Password",
    type: "password",
    inputMode: 'text'
  },
];