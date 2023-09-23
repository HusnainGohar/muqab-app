import {
  StackScreenProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  AuthMain,
  ChangePassword,
  ForgetPassword,
  Login,
  Register,
  ResetPassword,
  VerifyOtp,
} from '../screens/auth';
import {
  authMainScreen,
  changePasswordScreen,
  forgetPasswordScreen,
  loginScreen,
  privacyPolicyScreen,
  registerScreen,
  resetPasswordScreen,
  termsConditionsScreen,
  verifyOtpScreen,
} from '../utils/constants';
import { CompositeScreenProps } from '@react-navigation/native';
import { PrivacyPolicy, TermsConditions } from '../screens/general';

type StackParamList = {
  [authMainScreen]: undefined;
  [loginScreen]: undefined;
  [registerScreen]: undefined;
  [verifyOtpScreen]: undefined;
  [forgetPasswordScreen]: undefined;
  [resetPasswordScreen]: undefined;
  [changePasswordScreen]: undefined;
  [privacyPolicyScreen]: undefined;
  [termsConditionsScreen]: undefined;
};

type TabParamList = {
  [loginScreen]: undefined;
  [registerScreen]: undefined;
  [verifyOtpScreen]: undefined;
  [forgetPasswordScreen]: undefined;
  [resetPasswordScreen]: undefined;
  [changePasswordScreen]: undefined;
};

export type ScreensProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<StackParamList>
>;

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth Routes */}
      <Stack.Screen name={verifyOtpScreen} component={VerifyOtp} />
      <Stack.Screen name={authMainScreen} component={AuthMain} />
      <Stack.Screen name={loginScreen} component={Login} />
      <Stack.Screen name={registerScreen} component={Register} />
      <Stack.Screen name={forgetPasswordScreen} component={ForgetPassword} />
      <Stack.Screen name={resetPasswordScreen} component={ResetPassword} />
      <Stack.Screen name={changePasswordScreen} component={ChangePassword} />

      {/* General Routes */}
      <Stack.Screen name={privacyPolicyScreen} component={PrivacyPolicy} />
      <Stack.Screen name={termsConditionsScreen} component={TermsConditions} />
    </Stack.Navigator>
  );
};
