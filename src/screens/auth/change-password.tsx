import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
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
    <Layout
      title="Password Settings"
      subTitle="Reset Your Password"
      description="To Change your passwords enter the following values"
      hasBack={true}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={changePasswordFields}
        validationSchema={changePasswordSchema}
        submitButtonLabel="Update"
        onSubmit={handleChangePassword}
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
    </Layout>
  );
};

const styles = StyleSheet.create({});
