import { ReactNode } from 'react';
import { ModalProps as AntModalProps } from '@ant-design/react-native/lib/modal/Modal';

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
