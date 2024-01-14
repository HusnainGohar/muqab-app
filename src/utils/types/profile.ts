import { IconNames } from '@ant-design/react-native/lib/icon';
import { ReactNode } from 'react';
import { StackParamList } from '../../routes';

export interface ProfileMenuOption {
  label: ReactNode;
  icon: IconNames;
  action?: () => void;
  navigateTo: keyof StackParamList;
  right?: ReactNode;
}

export interface ProfileMenu {
  title: string;
  options: ProfileMenuOption[];
}

export interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  city?: string;
  dateOfBirth?: any;
  country?: string;
  zipCode?: string;
  isNewsLetterAndHoroscopeEnabled?: boolean;
  isEmailNotificationsEnabled?: boolean;
  isNewOfferEmailsEnabled?: boolean;
}
