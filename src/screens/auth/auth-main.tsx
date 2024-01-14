import { ParamListBase, useNavigation } from '@react-navigation/native';
import { fonts, hp, registerScreen } from '../../utils/constants';
import { WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../../components/atoms';
import { AuthLayout } from '../../components/organisms';
import { SocialAuth } from '../../components/molecules';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export const AuthMain = () => {
  const { navigate }: StackNavigationProp<ParamListBase> = useNavigation();

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
        width="80%"
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
