import dayjs from 'dayjs';
import { z } from 'zod';

const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const required = z.string();

const emailValidation = z.string().email();

const phoneValidation = z.string().refine(value => phoneRegex.test(value), {
  message: 'Invalid Phone Number.',
});

const passwordValidation = z.string().min(8, {
  message: 'Password must be at least 8 characters long.',
});

const otpValidation = z.string().min(4, {
  message: 'OTP not Valid',
});

const dateOfBirthValidation = z
  .date()
  .max(
    dayjs().subtract(18, 'years').toDate(),
    'You must be atleast 18 year old to use the App',
  );

export const loginWithEmailSchema = z
  .object({
    username: emailValidation,
    password: passwordValidation,
  })
  .required();

export const loginWithPhoneSchema = z
  .object({
    username: phoneValidation,
    password: passwordValidation,
  })
  .required();

export const registerSchema = z
  .object({
    firstName: required,
    lastName: required,
    email: emailValidation,
    phone: phoneValidation,
    password: passwordValidation,
    retypePassword: required,
  })
  .required()
  .refine(data => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ['retypePassword'], // path of error
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export type FormSchema = {
  [key: string]: string | boolean | Date | undefined;
};

export const changePasswordSchema = z
  .object({
    oldPassword: passwordValidation,
    password: passwordValidation,
    retypePassword: required,
  })
  .required()
  .refine(data => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ['retypePassword'], // path of error
  });

export const verifyEmailSchema = z
  .object({
    email: emailValidation,
  })
  .required();

export const verifyPhoneSchema = z
  .object({
    email: phoneValidation,
  })
  .required();

export const verifyOtpSchema = z
  .object({
    otp: otpValidation,
  })
  .required();

export const resetPasswordSchema = z
  .object({
    password: passwordValidation,
    retypePassword: required,
  })
  .required()
  .refine(data => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ['retypePassword'], // path of error
  });

export const updateProfileSchema = z
  .object({
    firstName: required,
    lastName: required,
    email: emailValidation,
    phone: phoneValidation,
    dateOfBirth: dateOfBirthValidation,
  })
  .required();

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
