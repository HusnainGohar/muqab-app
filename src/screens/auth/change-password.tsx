import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, changePasswordSchema } from '../../utils/schemas';
import { changePasswordFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { useChangePasswordMutation } from '../../apis/auth';

export const ChangePassword = () => {
  const defaultValues = {
    oldPassword: '',
    password: '',
    retypePassword: '',
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = (params: FormSchema) => {
    changePassword({
      password: params.oldPassword,
      newPassword: params.password,
    });
  };

  return (
    <AuthLayout
      title="Change Your Password"
      isLogin={false}
      paddingTop={hp('10%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={changePasswordFields}
        validationSchema={changePasswordSchema}
        onSubmit={handleChangePassword}
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
