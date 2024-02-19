import { ReactNode } from 'react';
import { ModalProps as AntModalProps } from '@ant-design/react-native/lib/modal/Modal';
import { User } from './auth';
import { Option } from './input-fields-details';
import { StyleProp, ViewStyle } from 'react-native';

export interface ErrorResponse {
  data: {
    code: number;
    data: {
      message: string;
    };
    message: string;
  };
  status: number;
}

export type OnlineStatus = 'online' | 'offline' | 'busy' | 'away';

export type OneToHundred =
  | `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | ''}`
  | '100';

export type CustomWidth =
  | 'auto'
  | 'full'
  | 'half'
  | OneToHundred
  | `${OneToHundred}%`;
export interface ModalProps extends AntModalProps {
  isLoading?: boolean;
  description?: string;
  onApply?: () => void;
  onCancel?: () => void;
  applyButtonText?: string;
  cancelButtonText?: string;
  children?: ReactNode;
}

export interface PopoverProps {
  trigger?: ReactNode;
  triggerStyle?: StyleProp<ViewStyle>;
  options: Option[];
  children?: ReactNode;
  renderItem?: ({ item, index }: { item: Option; index: number }) => ReactNode;
  onPickerOptionPress?: (item: Option) => void;
}

export interface SuccessType {
  user?: User;
}
