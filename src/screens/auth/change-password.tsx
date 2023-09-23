import { StyleSheet } from 'react-native';
import { hp } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, changePasswordSchema } from '../../utils/schemas';
import { changePasswordFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';

export const ChangePassword = () => {
  const defaultValues = {
    oldPassword: '',
    password: '',
    retypePassword: '',
  };

  const handleChangePassword = (params: FormSchema) => {
    console.log('params...', params);
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
      />
      <WhiteSpace size="lg" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({});
