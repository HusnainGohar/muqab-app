import { InputModeOptions } from "react-native";
import { InputTypeOptions } from "../../components/atoms";

export type FieldDetails = {
  name: string,
  type?: InputTypeOptions,
  inputMode?: InputModeOptions,
  placeholder?: string,
  label?: string,
}

export interface InputFieldsDetails {
  [key: string]: FieldDetails
}

export type LoginFieldsDetails = {
  [key in 'email' | 'phone' | 'password']: FieldDetails;
};
