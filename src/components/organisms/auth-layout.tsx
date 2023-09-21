import { FC, ReactNode } from 'react';
import { AuthFooter, AuthHeader } from '../molecules';
import { Image, StyleSheet } from 'react-native';
import { group } from '../../assets/images';
import {
  authMainScreen,
  colors,
  hp,
  loginScreen,
  wp,
} from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '../atoms';
import { Link } from '@react-navigation/native';
import { View, WhiteSpace } from '@ant-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface AuthLayoutProps {
  title?: string;
  isLogin?: boolean;
  paddingTop?: number;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title = '',
  isLogin = false,
  paddingTop = 0,
  children,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainerStyle}>
      <Image source={group} style={styles.footerImage} />
      <View
        style={[
          styles.container,
          {
            minHeight: hp('95%'),
            paddingTop: paddingTop + top,
            paddingBottom: bottom,
          },
        ]}>
        <AuthHeader title={title} />
        {children}
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <Text type="h6" style={{ textAlign: 'center' }}>
          {isLogin ? 'Not a member Yet? ' : 'Already Have an Account?'}{' '}
          <Link to={`/${isLogin ? authMainScreen : loginScreen}`}>
            <Text style={{ color: colors.primary }} type="link">
              {isLogin ? 'Join Now' : 'Login'}
            </Text>
          </Link>
        </Text>
        <WhiteSpace size="lg" />
      </View>
      <AuthFooter />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('10%'),
  },
  contentContainerStyle: {
    minHeight: '100%',
  },
  bg: {
    width: wp('100%'),
    height: hp('100%'),
  },
  footerImage: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: -1,
  },
});
