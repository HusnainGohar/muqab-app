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
  },
};

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