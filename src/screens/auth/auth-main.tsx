import { useNavigation } from '@react-navigation/native';
import { fonts, hp, registerScreen } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { ScreensProps } from '../../routes';
import { SocialAuth } from '../../components/molecules';
import { StyleSheet } from 'react-native';

export const AuthMain = () => {
  const { navigate } = useNavigation<ScreensProps>();

  return (
    <AuthLayout
      title="SignUp Your Account"
      isLogin={false}
      paddingTop={hp('15%')}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Text type="caption" style={styles.subTitle}>
        Create a profile, meet Readers, Save your record, and more
      </Text>
      <WhiteSpace size="lg" />
      <Button
        type="primary"
        leftIcon={'user'}
        onPress={() => navigate(registerScreen)}
        title="Sign Up With Phone or Email"
      />
      <WhiteSpace size="lg" />
      <SocialAuth variant="secondary" />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: fonts.quicksand.semiBold,
  },
});
