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
  changePasswordScreen,
  chatScreen,
  chatRequestScreen,
  colors,
  creditsScreen,
  dashboardScreen,
  deleteAccountScreen,
  favouriteReadersScreen,
  forgetPasswordScreen,
  gallerySettingsScreen,
  helpSupportScreen,
  homeScreen,
  hp,
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
  Home,
  Inbox,
  Chat,
  Logout,
  NotificationSettings,
  GallerySettings,
  PrivacyPolicy,
  Profile,
  ProfileSettings,
  ShareApp,
  Shop,
  TermsConditions,
  TransactionHistory,
  ChatRequest,
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
  [chatScreen]: { userId: string };
  [chatRequestScreen]: { userId: string };
  [transactionHistoryScreen]: undefined;
  [profileSettingsScreen]: undefined;
  [gallerySettingsScreen]: undefined;
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

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        name={homeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
        component={Home}>
        {/* {Home} */}
      </Tab.Screen>
      <Tab.Screen
        name={shopScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
        component={Shop}></Tab.Screen>
      <Tab.Screen
        name={inboxScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <Icon name="message" size={size} color={color} />
          ),
        }}
        component={Inbox}></Tab.Screen>
      <Tab.Screen
        name={profileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
        component={Profile}></Tab.Screen>
    </Tab.Navigator>
  );
};

export const Routes = () => {
  const auth = useSelector(state => state.auth);
  const { user, token } = auth;

  const initialRouteName = useMemo(() => {
    if (!token) return authMainScreen;
    if (!user?.isEmailVerified) return verifyOtpScreen;
    // if (!user?.isPhoneVerified) return verifyOtpScreen;
    return dashboardScreen;
  }, [user, token]);

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}>
      {!token ? (
        <>
          {/* Auth Routes */}
          <Stack.Screen
            name={authMainScreen}
            component={AuthMain}></Stack.Screen>
          <Stack.Screen name={loginScreen} component={Login}></Stack.Screen>
          <Stack.Screen
            name={registerScreen}
            component={Register}></Stack.Screen>
          <Stack.Screen
            name={forgetPasswordScreen}
            component={ForgetPassword}></Stack.Screen>
          <Stack.Screen
            name={verifyOtpScreen}
            component={VerifyOtp}></Stack.Screen>
          <Stack.Screen
            name={resetPasswordScreen}
            component={ResetPassword}></Stack.Screen>
        </>
      ) : (
        <>
          {/* Protected Routes */}
          <Stack.Screen
            name={dashboardScreen}
            component={Dashboard}></Stack.Screen>
          <Stack.Screen
            name={profileSettingsScreen}
            component={ProfileSettings}></Stack.Screen>
          <Stack.Screen name={chatScreen} component={Chat}></Stack.Screen>
          <Stack.Screen
            name={chatRequestScreen}
            options={{ presentation: 'transparentModal' }}
            component={ChatRequest}></Stack.Screen>
          <Stack.Screen
            name={notificationSettingsScreen}
            component={NotificationSettings}></Stack.Screen>
          <Stack.Screen
            name={gallerySettingsScreen}
            component={GallerySettings}></Stack.Screen>
          <Stack.Screen
            name={changePasswordScreen}
            component={ChangePassword}></Stack.Screen>
          <Stack.Screen
            name={transactionHistoryScreen}
            component={TransactionHistory}></Stack.Screen>
          <Stack.Screen
            name={favouriteReadersScreen}
            component={FavouriteReaders}></Stack.Screen>
          <Stack.Screen name={creditsScreen} component={Credits}></Stack.Screen>
          <Stack.Screen
            name={becomeReaderScreen}
            component={BecomeReader}></Stack.Screen>
          <Stack.Screen
            name={shareAppScreen}
            component={ShareApp}></Stack.Screen>
          <Stack.Screen
            name={helpSupportScreen}
            component={HelpSupport}></Stack.Screen>
          <Stack.Screen
            name={deleteAccountScreen}
            options={{ presentation: 'transparentModal' }}
            component={DeleteAccount}></Stack.Screen>
          <Stack.Screen
            name={logoutScreen}
            options={{ presentation: 'transparentModal' }}
            component={Logout}></Stack.Screen>
        </>
      )}
      {/* General Routes */}
      <Stack.Screen
        name={privacyPolicyScreen}
        component={PrivacyPolicy}></Stack.Screen>
      <Stack.Screen
        name={termsConditionsScreen}
        component={TermsConditions}></Stack.Screen>
    </Stack.Navigator>
  );
};
