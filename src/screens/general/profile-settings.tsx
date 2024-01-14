import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Form } from '../../components/molecules/form';
import { registerFields } from '../../utils/input-fields-details';
import { FormSchema, registerSchema } from '../../utils/schemas';
import { useSignUpMutation } from '../../apis/auth';
import { useOnAuthSuccess } from '../../hooks';
import { AuthStoreType } from '../../utils/types';

export const ProfileSettings = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: '',
  };
  const [registerUser, { isLoading: isLoading }] = useSignUpMutation();
  const onAuthSuccess = useOnAuthSuccess();
  const handleRegister = async (params: FormSchema) => {
    const { firstName, lastName, email, phone, password } = params;
    const res = (await registerUser({
      firstName,
      lastName,
      email,
      phone,
      password,
      website: '',
    }).unwrap()) as AuthStoreType;
    onAuthSuccess(res);
  };
  return (
    <Layout title="Profile Settings" hasBack={true}>
      <WhiteSpace size="lg" />
      <Form
        fields={registerFields}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
        defaultValues={defaultValues}
        submitButtonLabel={'Update'}
        isLoading={isLoading}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
