import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { emailSettingsFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from '../../apis/profile';

export const NotificationSettings = () => {
  const defaultValues = {
    isEmailNotificationsEnabled: false,
    isNewOfferEmailsEnabled: false,
    isNewsLetterAndHoroscopeEnabled: false,
  };
  const { data, isFetching: isProfileLoading } = useGetMyProfileQuery({});

  const { user } = data;

  const {
    isEmailNotificationsEnabled,
    isNewOfferEmailsEnabled,
    isNewsLetterAndHoroscopeEnabled,
  } = user ?? {};

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  return (
    <Layout
      title="Notification Settings"
      subTitle="Settings"
      description="Even if you turn on all notifications, we may sometimes need to email you important notices about your contact."
      hasBack={true}
      isLoading={isProfileLoading}>
      <WhiteSpace size="lg" />
      <Form
        fields={emailSettingsFields}
        values={{
          isEmailNotificationsEnabled,
          isNewOfferEmailsEnabled,
          isNewsLetterAndHoroscopeEnabled,
        }}
        submitButtonLabel="Update"
        onSubmit={updateProfile}
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
    </Layout>
  );
};

const styles = StyleSheet.create({});
