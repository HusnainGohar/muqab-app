import { FieldDetails } from '../types';

export const emailSettingsFields: FieldDetails[] = [
  {
    name: 'isEmailNotificationsEnabled',
    label: 'Email Notifications',
    subText: 'Receive weekly email notification',
    placeholder: '',
    type: 'switch',
  },
  {
    name: 'isNewOfferEmailsEnabled',
    label: 'New Offer Email',
    subText: 'Receive Email When new offer come',
    placeholder: '',
    type: 'switch',
  },
  {
    name: 'isNewsLetterAndHoroscopeEnabled',
    label: 'Muqab Newsletter & Horoscope',
    subText: 'Receive Email',
    placeholder: '',
    type: 'switch',
  },
];
