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
  becomeReaderScreen,
  bottomTabs,
  changePasswordScreen,
  colors,
  creditsScreen,
  dashboardScreen,
  deleteAccountScreen,
  favouriteReadersScreen,
  forgetPasswordScreen,
  helpSupportScreen,
  homeScreen,
  inboxScreen,
  loginScreen,
  logoutScreen,
  notificationSettingsScreen,
  privacyPolicyScreen,
  profileScreen,
  profileSettingsScreen,
  registerScreen,
  resetPasswordScreen,
  shareAppScreen,
  shopScreen,
  termsConditionsScreen,
  transactionHistoryScreen,
  verifyOtpScreen,
} from '../utils/constants';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  DeleteAccount,
  HelpSupport,
  Logout,
  NotificationSettings,
  PrivacyPolicy,
  ProfileSettings,
  ShareApp,
  TermsConditions,
  TransactionHistory,
} from '../screens/general';
import { useSelector } from '../store';
import { useMemo } from 'react';
import { Icon } from '@ant-design/react-native';
import { BecomeReader, Credits, FavouriteReaders } from '../screens/client';

export type StackParamList = {
  [authMainScreen]: undefined;
  [loginScreen]: undefined;
  [registerScreen]: undefined;
  [verifyOtpScreen]: { username: string; forResetPassword?: boolean };
  [forgetPasswordScreen]: undefined;
  [resetPasswordScreen]: { verificationToken: string };
  [changePasswordScreen]: undefined;
  [privacyPolicyScreen]: undefined;
  [termsConditionsScreen]: undefined;
  [dashboardScreen]: undefined;
  [transactionHistoryScreen]: undefined;
  [profileSettingsScreen]: undefined;
  [notificationSettingsScreen]: undefined;
  [shareAppScreen]: undefined;
  [logoutScreen]: undefined;
  [deleteAccountScreen]: undefined;
  [helpSupportScreen]: undefined;
  [creditsScreen]: undefined;
  [favouriteReadersScreen]: undefined;
  [becomeReaderScreen]: undefined;
};

export type TabParamList = {
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
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
    }}>
    {bottomTabs.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={{
          tabBarLabel: tab.label,
          tabBarIcon: ({ color, size }) => (
            <Icon name={tab.icon} size={size} color={color} />
          ),
        }}
      />
    ))}
  </Tab.Navigator>
);

export const Routes = () => {
  const auth = useSelector(state => state.auth);

  const initialRouteName = useMemo(() => {
    const { user, token } = auth;
    if (!token) return authMainScreen;
    if (!user?.isEmailVerified) return verifyOtpScreen;
    // if (!user?.isPhoneVerified) return verifyOtpScreen;
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
      <Stack.Screen name={profileSettingsScreen} component={ProfileSettings} />
      <Stack.Screen
        name={notificationSettingsScreen}
        component={NotificationSettings}
      />
      <Stack.Screen
        name={transactionHistoryScreen}
        component={TransactionHistory}
      />
      <Stack.Screen
        name={favouriteReadersScreen}
        component={FavouriteReaders}
      />
      <Stack.Screen name={creditsScreen} component={Credits} />
      <Stack.Screen name={becomeReaderScreen} component={BecomeReader} />
      <Stack.Screen name={shareAppScreen} component={ShareApp} />
      <Stack.Screen name={helpSupportScreen} component={HelpSupport} />
      <Stack.Screen
        name={deleteAccountScreen}
        component={DeleteAccount}
        options={{ presentation: 'transparentModal' }}
      />
      <Stack.Screen
        name={logoutScreen}
        component={Logout}
        options={{ presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
};
