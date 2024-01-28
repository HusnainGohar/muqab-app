import { InputModeOptions } from 'react-native';
import { InputTypeOptions } from '../../components/atoms';

export type SectionDetails = {
  id: number;
  title: string;
  description?: string;
  order: number;
  fields: FieldDetails[];
};

export type FieldTypeOptions =
  | InputTypeOptions
  | 'switch'
  | 'radio'
  | 'date'
  | 'datetime'
  | 'time';
export interface Option {
  label: string;
  value: string;
}

export type FieldDetails = {
  name: string;
  type?: FieldTypeOptions;
  inputMode?: InputModeOptions;
  placeholder?: string;
  label?: string;
  subText?: string;
  isOTP?: boolean;
  disabled?: boolean;
  options?: Option[];
};

export interface InputFieldsDetails {
  [key: string]: FieldDetails;
}

export type LoginFieldsDetails = {
  [key in 'email' | 'phone' | 'password']: FieldDetails;
};
