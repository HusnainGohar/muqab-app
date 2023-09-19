import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../store/slices';
import { Link, useNavigation } from '@react-navigation/native';
import { useLoginMutation, useSendOtpMutation } from '../../apis/auth';
import { Alert, StyleSheet } from 'react-native';
import { colors, forgetPasswordScreen } from '../../utils/constants';
import {
  Flex,
  SegmentedControl,
  View,
  WhiteSpace,
} from '@ant-design/react-native';
import { Button, InputField, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';

export const Login = () => {
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<any>();
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoading }] = useLoginMutation();
  const [sendOtp] = useSendOtpMutation();

  const handleLogin = () => {
    if (!email) return Alert.alert(`Email can't be empty`);
    if (!password) return Alert.alert(`Password can't be empty`);
    loginUser({ username: email ?? phone, password })
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
    <AuthLayout title="SignUp Yor Account" isLogin={true}>
      <WhiteSpace size="lg" />
      <SegmentedControl
        selectedTextColor={colors.white}
        tintColor={colors.primary}
        style={styles.segmentedTabStyle}
        values={['Phone', 'E-mail']}
        onChange={() => {}}
        onValueChange={value => setIsLoginWithEmail(value === 'Email')}
      />
      <WhiteSpace size="lg" />
      <Flex direction="column">
        <>
          {isLoginWithEmail ? (
            <InputField
              type="email"
              onChange={(value: any) => setEmail(value)}
              value={email}
              placeholder="Business Email"
              label="Business Email"
            />
          ) : (
            <InputField
              type="phone"
              label="Phone no."
              placeholder="phone"
              onChange={value => setPhone(value)}
              value={phone}
            />
          )}
        </>
        <WhiteSpace size="lg" />
        <InputField
          type="password"
          value={password}
          onChange={(value: any) => setPassword(value)}
          placeholder="Password"
          label="Password"
        />
        <WhiteSpace size="lg" />
        <Link to={`/${forgetPasswordScreen}`}>
          <Text type="link">Forget password ?</Text>
        </Link>
        <WhiteSpace size="lg" />
        <Button
          type="primary"
          isLoading={isLoading}
          onPress={() => handleLogin()}
          title="Sign in"
        />
      </Flex>
      <WhiteSpace size="lg" />
      <SocialAuth />
    </AuthLayout>
  );
};

export const styles = StyleSheet.create({
  segmentedTabStyle: {
    height: 40,
    borderColor: colors.darkGrey,
    borderWidth: 1,
  },
});
