import { FC, ReactNode } from 'react';
import { AuthFooter, AuthHeader } from '../molecules';
import { ImageBackground, StyleSheet } from 'react-native';
import { group } from '../../assets/images';
import { authMainScreen, hp, loginScreen, wp } from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '../atoms';
import { Link } from '@react-navigation/native';
import { WhiteSpace } from '@ant-design/react-native';
interface AuthLayoutProps {
  title?: string;
  isLogin?: boolean;
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({
  title = '',
  isLogin = false,
  children,
}) => {
  return (
    <ImageBackground
      style={styles.bg}
      source={group}
      imageStyle={styles.footerImage}>
      <KeyboardAwareScrollView style={styles.container}>
        <AuthHeader title={title} />
        {children}
        <WhiteSpace size="lg" />
        <Text type="h6" style={{ textAlign: 'center' }}>
          {isLogin ? 'Not a member Yet? ' : 'Already Have an Account'}{' '}
          <Link to={`/${isLogin ? authMainScreen : loginScreen}`}>
            <Text type="link">{isLogin ? 'Join Now' : 'Login'}</Text>
          </Link>
        </Text>
        <WhiteSpace size="lg" />
        <AuthFooter />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('10%'),
  },
  bg: {
    width: wp('100%'),
    height: hp('100%'),
  },
  footerImage: {
    resizeMode: 'contain',
    marginTop: hp('35%'),
  },
});
