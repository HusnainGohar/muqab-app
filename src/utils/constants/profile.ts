import { ProfileMenu } from '../types';
import {
  becomeReaderScreen,
  changePasswordScreen,
  creditsScreen,
  deleteAccountScreen,
  favouriteReadersScreen,
  helpSupportScreen,
  logoutScreen,
  notificationSettingsScreen,
  privacyPolicyScreen,
  profileSettingsScreen,
  shareAppScreen,
  termsConditionsScreen,
  transactionHistoryScreen,
} from './route-names';

export const profileMenu: ProfileMenu[] = [
  {
    title: 'PROFILE',
    options: [
      {
        label: 'Profile Settings',
        navigateTo: profileSettingsScreen,
        icon: 'user',
      },
      {
        label: 'Reset Password',
        navigateTo: changePasswordScreen,
        icon: 'lock',
      },
      {
        label: 'Notification Settings',
        navigateTo: notificationSettingsScreen,
        icon: 'bell',
      },
      {
        label: 'Current Balance',
        navigateTo: creditsScreen,
        icon: 'dollar',
      },
    ],
  },
  {
    title: 'MEMBERSHIP STATUS',
    options: [
      {
        label: 'Favourite Readers',
        navigateTo: favouriteReadersScreen,
        icon: 'heart',
      },
      {
        label: 'Transaction History',
        navigateTo: transactionHistoryScreen,
        icon: 'history',
      },
    ],
  },
  {
    title: 'CONTENT & ACTIVITY',
    options: [
      {
        label: 'Rate The App',
        navigateTo: shareAppScreen,
        icon: 'star',
      },
      {
        label: 'Share App',
        navigateTo: shareAppScreen,
        icon: 'share-alt',
      },
      {
        label: 'Become A Reader',
        navigateTo: becomeReaderScreen,
        icon: 'user-switch',
      },
    ],
  },
  {
    title: 'SUPPORT',
    options: [
      {
        label: 'Contact Support',
        icon: 'customer-service',
        navigateTo: helpSupportScreen,
      },
      {
        label: 'Privacy Policy',
        icon: 'file-protect',
        navigateTo: privacyPolicyScreen,
      },
      {
        label: 'Terms & Conditions',
        icon: 'solution',
        navigateTo: termsConditionsScreen,
      },
      {
        label: 'Delete Account',
        icon: 'delete',
        navigateTo: deleteAccountScreen,
      },
      {
        label: 'Log Out',
        icon: 'logout',
        navigateTo: logoutScreen,
      },
    ],
  },
];
