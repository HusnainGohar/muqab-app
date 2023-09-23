import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, verifyEmailSchema } from '../../utils/schemas';
import { emailVerifyFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';

export const ForgetPassword = () => {
  const defaultValues = {
    email: '',
  };

  const handleForgetPassword = (params: FormSchema) => {
    console.log('params...', params);
  };

  return (
    <AuthLayout
      title="Recover Your Password"
      isLogin={false}
      paddingTop={hp('10%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={emailVerifyFields}
        validationSchema={verifyEmailSchema}
        onSubmit={handleForgetPassword}
        defaultValues={defaultValues}
      />
      <WhiteSpace size="lg" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
