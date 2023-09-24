export interface ErrorResponse {
  data: {
    code: number;
    data: {
      message: string;
    },
    message: string;
  },
  status: number;
}