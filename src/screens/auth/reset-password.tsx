import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, resetPasswordSchema } from '../../utils/schemas';
import { resetPasswordFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';

export const ResetPassword = () => {
  const defaultValues = {
    password: '',
    retypePassword: '',
  };

  const handleResetPassword = (params: FormSchema) => {
    console.log('params...', params);
  };

  return (
    <AuthLayout title="Set New Password" isLogin={false} paddingTop={hp('10%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={resetPasswordFields}
        validationSchema={resetPasswordSchema}
        onSubmit={handleResetPassword}
        defaultValues={defaultValues}
      />
      <WhiteSpace size="lg" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
