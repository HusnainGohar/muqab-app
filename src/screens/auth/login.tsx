import { useState } from 'react';
import { Link } from '@react-navigation/native';
import { useLoginMutation } from '../../apis/auth';
import { StyleSheet } from 'react-native';
import { colors, forgetPasswordScreen, hp, wp } from '../../utils/constants';
import { Flex, SegmentedControl, WhiteSpace } from '@ant-design/react-native';
import { Button, Controller, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStoreType, LoginParams } from '../../utils/types';
import {
  loginWithEmailSchema,
  loginWithPhoneSchema,
} from '../../utils/schemas';
import { loginFields } from '../../utils/input-fields-details';
import { useOnAuthSuccess } from '../../hooks';

export const Login = () => {
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const onAuthSuccess = useOnAuthSuccess();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: zodResolver(
      isLoginWithEmail ? loginWithEmailSchema : loginWithPhoneSchema,
    ),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async (params: LoginParams) => {
    const res = (await loginUser({
      username: params.username,
      password: params.password,
    }).unwrap()) as AuthStoreType;
    onAuthSuccess(res);
  };

  const handleSegmentedTabChange = (value: string) => {
    setIsLoginWithEmail(value === 'E-mail');
    resetField('username');
  };

  return (
    <AuthLayout
      title="Login Your Account"
      isLogin={true}
      paddingTop={hp('10%')}>
      <WhiteSpace size="lg" />
      <SegmentedControl
        selectedTextColor={colors.white}
        tintColor={colors.primary}
        style={styles.segmentedTabStyle}
        values={['E-mail', 'Phone']}
        onValueChange={handleSegmentedTabChange}
      />
      <WhiteSpace size="lg" />
      <Flex direction="column">
        <Controller
          control={control}
          errorMessage={errors.username?.message}
          {...loginFields[isLoginWithEmail ? 'email' : 'phone']}
        />
        <WhiteSpace />
        <Controller
          control={control}
          errorMessage={errors.password?.message}
          {...loginFields.password}
        />
        <WhiteSpace size="sm" />
        <Text type="link" style={styles.forgetPassword}>
          <Link to={`/${forgetPasswordScreen}`}>Forget password ?</Link>
        </Text>
        <WhiteSpace size="lg" />
        <Button
          type="primary"
          isLoading={isLoading}
          onPress={handleSubmit(handleLogin)}
          title="Sign in"
        />
      </Flex>
      <WhiteSpace size="lg" />
      <SocialAuth title="Or Login With" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  segmentedTabStyle: {
    height: 40,
    borderColor: colors.darkGrey,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  forgetPassword: {
    width: wp('80%'),
    textAlign: 'right',
    color: colors.primary,
    marginTop: -10,
  },
});
