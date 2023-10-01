import { StyleSheet } from 'react-native';
import { hp, loginScreen } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, resetPasswordSchema } from '../../utils/schemas';
import { resetPasswordFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { useSetNewPasswordMutation } from '../../apis/auth';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackParamList } from '../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStoreType } from '../../utils/types';

export const ResetPassword = () => {
  const route: RouteProp<StackParamList> = useRoute();
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const verificationToken = route?.params?.verificationToken;
  const defaultValues = {
    password: '',
    retypePassword: '',
  };

  const [setNewPassword, { isLoading }] = useSetNewPasswordMutation();

  const handleResetPassword = (params: FormSchema) => {
    setNewPassword({ password: params.password, verificationToken })
      .unwrap()
      .then((res: AuthStoreType) => {
        if (res?.code === 1) {
          navigate(loginScreen);
        }
      });
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
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
