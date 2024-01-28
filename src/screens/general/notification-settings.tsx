import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { FormSchema } from '../../utils/schemas';
import { emailSettingsFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { useSelector } from '../../store';
import { useUpdateProfileMutation } from '../../apis/profile';
import { AuthStoreType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices';

export const NotificationSettings = () => {
  const defaultValues = {
    isEmailNotificationsEnabled: false,
    isNewOfferEmailsEnabled: false,
    isNewsLetterAndHoroscopeEnabled: false,
  };

  const { user, token } = useSelector(state => state.auth);
  console.log('token...', token);

  const {
    isEmailNotificationsEnabled,
    isNewOfferEmailsEnabled,
    isNewsLetterAndHoroscopeEnabled,
  } = user ?? {};

  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleChangeNotificationSettings = async (params: FormSchema) => {
    const { user } = (await updateProfile(params).unwrap()) as AuthStoreType;
    console.log('user...', user);

    dispatch(setUser({ user }));
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
        values={{
          isEmailNotificationsEnabled,
          isNewOfferEmailsEnabled,
          isNewsLetterAndHoroscopeEnabled,
        }}
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
