import { Toast } from "@ant-design/react-native";
import { ErrorResponse } from "../types";
export * from './social-auth'

export const handleError = (err: ErrorResponse) => {
  const errorMessage = err?.data?.message ?? ''
  const errorMessageDescription = err?.data?.data?.message ?? ''
  const error = {
    message: errorMessage,
    status: err.status,
    data: {
      message: errorMessageDescription
    }
  }
  Toast.fail({
    content: errorMessage,
    duration: 2,
  })
  return error
}