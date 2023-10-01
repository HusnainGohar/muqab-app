import { StyleSheet } from 'react-native';
import {
  colors,
  dashboardScreen,
  fonts,
  hp,
  resetPasswordScreen,
  wp,
} from '../../utils/constants';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { AuthLayout } from '../../components/organisms';
import { FormSchema, verifyOtpSchema } from '../../utils/schemas';
import { verifyOtpFields } from '../../utils/input-fields-details';
import { Form } from '../../components/molecules/form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Text } from '../../components/atoms';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSendOtpMutation, useVerfiyMutation } from '../../apis/auth';
import { StackParamList } from '../../routes';
import { AuthStoreType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';

export const VerifyOtp = () => {
  const route: RouteProp<StackParamList> = useRoute();
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const dispatch = useDispatch();
  const username = route?.params?.username;
  const forResetPassword = route?.params?.forResetPassword;
  const defaultValues = {
    otp: '',
  };

  const [timeRemaining, setTimeRemaining] = useState<number>(120);
  const [sendOtp, { isLoading: isSendOtpLoading }] = useSendOtpMutation();
  const [verfiy, { isLoading }] = useVerfiyMutation();

  const handleVerifyOtp = async (params: FormSchema) => {
    if (!username) return;
    const res = (await verfiy({
      username,
      otp: params.otp,
      forResetPassword,
    })) as AuthStoreType;

    const user = res?.user;
    if (forResetPassword)
      return navigate(resetPasswordScreen, {
        verificationToken: res?.verificationToken ?? '',
      });
    if (!user?.isEmailVerified) return sendOtp({ username: user?.email });
    // if (!user?.isPhoneVerified) return sendOtp({ username: user?.phone }); // Need to un comment when implment twillio sms
    dispatch(logIn({ user }));
    navigate(dashboardScreen);
  };

  const handleResendOtp = () => {
    if (!username) return;
    sendOtp({ username });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (username) sendOtp({ username });
    }, [username]),
  );

  const formatedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [timeRemaining]);

  return (
    <AuthLayout title="Verify OTP" isLogin={false} paddingTop={hp('10%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Form
        fields={verifyOtpFields}
        validationSchema={verifyOtpSchema}
        onSubmit={handleVerifyOtp}
        defaultValues={defaultValues}
        isLoading={isLoading}
      />
      <WhiteSpace size="lg" />
      <Flex justify="end">
        {timeRemaining > 0 ? (
          <Text
            style={{
              textAlign: 'right',
              fontFamily: fonts.quicksand.semiBold,
              color: timeRemaining > 20 ? colors.primary : colors.red,
            }}>
            {formatedTime}
          </Text>
        ) : (
          <Button
            title="Resend OTP"
            isLoading={isSendOtpLoading}
            onPress={handleResendOtp}
            style={styles.resendOtp}
            textStyle={{ fontSize: 10 }}
          />
        )}
      </Flex>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  resendOtp: {
    borderRadius: 100,
    width: wp('25%'),
    height: hp('2.5%'),
  },
});
