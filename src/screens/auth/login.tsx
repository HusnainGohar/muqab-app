import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';
import { Link, ParamListBase, useNavigation } from '@react-navigation/native';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth';
import { Alert, StyleSheet } from 'react-native';
import { colors, forgetPasswordScreen, hp, wp } from '../../utils/constants';
import { Flex, SegmentedControl, WhiteSpace } from '@ant-design/react-native';
import { Button, Controller, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams } from '../../utils/types';
import {
  loginWithEmailSchema,
  loginWithPhoneSchema,
} from '../../utils/schemas';
import { loginFields } from '../../utils/input-fields-details';
import { StackNavigationProp } from '@react-navigation/stack';

export const Login = () => {
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
  const { navigate }: StackNavigationProp<ParamListBase> = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();

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

  const handleLogin = (params: LoginParams) => {
    loginUser({
      username: params.username,
      password: params.password,
    })
      .unwrap()
      .then((res: any) => {
        if (res.data.user.email && !res.data.user.isEmailVerified) {
          sendOtp({ username: res.data.user.email })
            .unwrap()
            .then(() => {
              Alert.alert('success');
            });
        }
        dispatch(logIn(res.data));
      });
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
