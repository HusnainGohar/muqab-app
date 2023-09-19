import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';
import { Link, useNavigation } from '@react-navigation/native';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth';
import { Alert, StyleSheet } from 'react-native';
import { colors, forgetPasswordScreen, hp, wp } from '../../utils/constants';
import { Flex, SegmentedControl, WhiteSpace } from '@ant-design/react-native';
import { Button, InputField, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { Controller, useForm } from 'react-hook-form';

type LoginFormKeys = {
  phone: string;
  email: string;
  password: string;
};

export const Login = () => {
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormKeys>({
    defaultValues: {
      phone: '',
      email: '',
      password: '',
    },
  });

  const handleLogin = (params: LoginFormKeys) => {
    loginUser({
      username: params.email || params.phone,
      password: params.password,
    })
      .unwrap()
      .then((res: any) => {
        if (res.data.user.email && !res.data.user.isVerified) {
          sendOtp({ username: res.data.user.email })
            .unwrap()
            .then(() => {
              Alert.alert('success');
            });
        }
        dispatch(logIn(res.data));
      })
      .catch((err: any) => {
        console.log('error while login...', err);
        Alert.alert(err.data.message);
      });
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
        onValueChange={value => setIsLoginWithEmail(value === 'E-mail')}
      />
      <WhiteSpace size="lg" />
      <Flex direction="column">
        <>
          {isLoginWithEmail ? (
            <Controller
              control={control}
              rules={{
                required: 'Email is Required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Must be a valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type="email"
                  inputMode="email"
                  onChange={onChange}
                  errorMessage={errors.email?.message}
                  value={value}
                  onBlur={onBlur}
                  placeholder="Business Email"
                  label="Business Email"
                />
              )}
              name="email"
            />
          ) : (
            <Controller
              control={control}
              rules={{
                required: 'Phone is Required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  type="phone"
                  inputMode="tel"
                  label="Phone no."
                  onBlur={onBlur}
                  placeholder="Phone"
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
              name="phone"
            />
          )}
        </>
        <WhiteSpace />
        <Controller
          control={control}
          rules={{
            required: 'Password is Required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              type="password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              placeholder="Password"
              label="Password"
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
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

export const styles = StyleSheet.create({
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
    marginTop: -15,
  },
});
