import { FieldDetails, SectionDetails } from '../types';

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

export const profileSections: SectionDetails[] = [
  {
    id: 1,
    title: 'Personal Information',
    order: 1,
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: 'John',
        type: 'text',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Doe',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        placeholder: 'example@example.com',
        type: 'email-address',
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'radio',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Contact Information',
    order: 2,
    fields: [
      {
        name: 'country',
        label: 'Country',
        placeholder: 'Pakistan',
        type: 'text',
      },
      {
        name: 'city',
        label: 'City',
        placeholder: 'Gujranwala',
        type: 'text',
      },
      {
        name: 'zipcode',
        label: 'Zipcode',
        placeholder: '50700',
        type: 'text',
      },
      {
        name: 'phone',
        label: 'Phone no.',
        placeholder: '212 456 7890',
        type: 'phone',
      },
    ],
  },
];
