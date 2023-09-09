import { createStackNavigator } from '@react-navigation/stack';
import { ChangePassowrd, ForgetPassowrd, Login, Register, ResetPassword, VerifyOtp } from '../screens/auth';
import { changePasswordScreen, forgetPasswordScreen, loginScreen, registerScreen, resetPasswordScreen, verifyOtpScreen } from '../utils/constants';

type StackParamList = {
  [loginScreen]: undefined;
  [registerScreen]: undefined;
  [verifyOtpScreen]: undefined;
  [forgetPasswordScreen]: undefined;
  [resetPasswordScreen]: undefined;
  [changePasswordScreen]: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={loginScreen} component={Login} />
      <Stack.Screen name={registerScreen} component={Register} />
      <Stack.Screen name={verifyOtpScreen} component={VerifyOtp} />
      <Stack.Screen name={forgetPasswordScreen} component={ForgetPassowrd} />
      <Stack.Screen name={resetPasswordScreen} component={ResetPassword} />
      <Stack.Screen name={changePasswordScreen} component={ChangePassowrd} />
    </Stack.Navigator>
  );
}