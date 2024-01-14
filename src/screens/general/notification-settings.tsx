import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { FormSchema } from '../../utils/schemas';
import { emailSettingsFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { useChangePasswordMutation } from '../../apis/auth';

export const NotificationSettings = () => {
  const defaultValues = {
    isEmailNotificationsEnabled: false,
    isNewOfferEmailsEnabled: false,
    isNewsLetterAndHoroscopeEnabled: false,
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangeNotificationSettings = (params: FormSchema) => {
    // changePassword({
    //   password: params.oldPassword,
    //   newPassword: params.password,
    // });
  };

  return (
    <Layout
      title="Notification Settings"
      subTitle="Settings"
      description="Even if you turn on all notifications, we may sometimes need to email you important notices about your contact."
      hasBack={true}>
      <WhiteSpace size="lg" />
      <Form
        fields={emailSettingsFields}
        validationSchema={{}}
        submitButtonLabel="Update"
        onSubmit={handleChangeNotificationSettings}
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
    </Layout>
  );
};

const styles = StyleSheet.create({});
