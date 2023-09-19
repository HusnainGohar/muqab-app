import { useNavigation } from '@react-navigation/native';
import { fonts, registerScreen } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { ScreensProps } from '../../routes';
import { SocialAuth } from '../../components/molecules';

export const AuthMain = () => {
  const { navigate } = useNavigation<ScreensProps>();

  return (
    <AuthLayout title="SignUp Yor Account" isLogin={false}>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <Text
        type="caption"
        style={{
          fontSize: 17,
          textAlign: 'center',
          fontFamily: fonts.quicksand.semiBold,
        }}>
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
