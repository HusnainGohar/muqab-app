import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { FormSchema, registerSchema } from '../../utils/schemas';
import { registerFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';

export const Register = () => {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: '',
  };
  const handleRegister = (params: FormSchema) => {
    console.log('params...', params);
  };

  return (
    <AuthLayout
      title="SignUp Your Account"
      isLogin={false}
      paddingTop={hp('5%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={registerFields}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
        defaultValues={defaultValues}
        submitButtonLabel={'SignUp'}
      />
      <WhiteSpace size="lg" />
      <SocialAuth title="Or SignUp With" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
