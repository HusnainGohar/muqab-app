import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Form } from '../../components/molecules/form';
import { profileSections } from '../../utils/input-fields-details';
import { FormSchema, updateProfileSchema } from '../../utils/schemas';
import { AuthStoreType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices';
import { useUpdateProfileMutation } from '../../apis/profile';

export const ProfileSettings = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    country: '',
    city: '',
    zipCode: '',
    gender: '',
  };
  const [uploadProfile, { isLoading: isUpateProfileLoading }] =
    useUpdateProfileMutation();
  const dispatch = useDispatch();
  const handleUpdateProfile = async (params: FormSchema) => {
    console.log('params...', params);

    // const { user } = (await uploadProfile(params).unwrap()) as AuthStoreType;
    // dispatch(setUser({ user }));
  };
  return (
    <Layout title="Profile Settings" hasBack={true}>
      <WhiteSpace size="lg" />
      <Form
        sections={profileSections}
        validationSchema={updateProfileSchema}
        onSubmit={handleUpdateProfile}
        defaultValues={defaultValues}
        submitButtonLabel={'Update'}
        isLoading={isUpateProfileLoading}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
