import { StyleSheet } from 'react-native';
import {
  colors,
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
import { useEffect, useMemo, useState } from 'react';
import { Button, Text } from '../../components/atoms';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const VerifyOtp = () => {
  const { navigate }: StackNavigationProp<ParamListBase> = useNavigation();
  const defaultValues = {
    otp: '',
  };

  const [timeRemaining, setTimeRemaining] = useState<number>(120);

  const handleVerifyOtp = (params: FormSchema) => {
    console.log('params...', params);
    navigate(resetPasswordScreen);
  };

  const handleResendOtp = () => {
    console.log('handleResendOtp...');
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
