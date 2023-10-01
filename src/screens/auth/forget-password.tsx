import { StyleSheet } from 'react-native';
import { hp, verifyOtpScreen } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, verifyEmailSchema } from '../../utils/schemas';
import { emailVerifyFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';

export const ForgetPassword = () => {
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const defaultValues = {
    email: '',
  };

  const handleForgetPassword = (params: FormSchema) => {
    navigate(verifyOtpScreen, {
      username: params.email,
      forResetPassword: true,
    });
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
