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
  dashboardScreen,
  forgetPasswordScreen,
  homeScreen,
  inboxScreen,
  loginScreen,
  privacyPolicyScreen,
  profileScreen,
  registerScreen,
  resetPasswordScreen,
  shopScreen,
  termsConditionsScreen,
  verifyOtpScreen,
} from '../utils/constants';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  Home,
  Inbox,
  PrivacyPolicy,
  Profile,
  Shop,
  TermsConditions,
} from '../screens/general';
import { useSelector } from '../store';
import { useMemo } from 'react';

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
  [dashboardScreen]: undefined;
};

type TabParamList = {
  [homeScreen]: undefined;
  [shopScreen]: undefined;
  [inboxScreen]: undefined;
  [profileScreen]: undefined;
};

export type ScreensProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<StackParamList>
>;

const Stack = createStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const Dashboard = () => (
  <Tab.Navigator>
    <Tab.Screen name={homeScreen} component={Home} />
    <Tab.Screen name={shopScreen} component={Shop} />
    <Tab.Screen name={inboxScreen} component={Inbox} />
    <Tab.Screen name={profileScreen} component={Profile} />
  </Tab.Navigator>
);

export const Routes = () => {
  const auth = useSelector(state => state.auth);
  console.log('auth store...', auth);

  const initialRouteName = useMemo(() => {
    const { user, token } = auth;
    if (!token) return authMainScreen;
    if (!user?.isEmailVerified) return verifyOtpScreen;
    if (!user?.isPhoneVerified) return verifyOtpScreen;
    return dashboardScreen;
  }, [auth]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}>
      {/* Auth Routes */}
      <Stack.Screen name={authMainScreen} component={AuthMain} />
      <Stack.Screen name={loginScreen} component={Login} />
      <Stack.Screen name={registerScreen} component={Register} />
      <Stack.Screen name={forgetPasswordScreen} component={ForgetPassword} />
      <Stack.Screen name={verifyOtpScreen} component={VerifyOtp} />
      <Stack.Screen name={resetPasswordScreen} component={ResetPassword} />
      <Stack.Screen name={changePasswordScreen} component={ChangePassword} />

      {/* General Routes */}
      <Stack.Screen name={privacyPolicyScreen} component={PrivacyPolicy} />
      <Stack.Screen name={termsConditionsScreen} component={TermsConditions} />
      <Stack.Screen name={dashboardScreen} component={Dashboard} />
    </Stack.Navigator>
  );
};
