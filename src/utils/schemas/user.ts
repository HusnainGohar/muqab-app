import { z } from "zod";

const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/

const required = z.string()

const emailValidation = z.string().email()

const phoneValidation = z.string().refine(value => phoneRegex.test(value), {
  message: 'Invalid Phone Number.',
})

const passwordValidation = z.string().min(8, {
  message: 'Password must be at least 8 characters long.',
})

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
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords don't match",
    path: ["retypePassword"], // path of error
  });

export type RegisterSchema = z.infer<typeof registerSchema>