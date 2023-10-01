import { FC } from 'react';
import { ActivityIndicator, Flex, WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../atoms';
import { Apple, Facebook, Google } from '../../assets/svg';
import { StyleSheet } from 'react-native';
import { useSocialAuthMutation } from '../../apis/auth';
import {
  authenticateWithApple,
  authenticateWithFacebook,
  authenticationWithGoogle,
} from '../../utils/functions';
import { wp } from '../../utils/constants';
import { useOnAuthSuccess } from '../../hooks';
import { AuthStoreType } from '../../utils/types';
interface SocialAuthProps {
  title?: string;
  variant?: 'primary' | 'secondary';
}

export const SocialAuth: FC<SocialAuthProps> = ({
  title = 'Or SigUp With',
  variant = 'primary',
}) => {
  const [socialAuth, { isLoading }] = useSocialAuthMutation();
  const onAuthSuccess = useOnAuthSuccess();

  const handleAppleAuth = async () => {
    const credentials = await authenticateWithApple();
    if (!credentials?.code && !credentials?.authorizationCode) return;
    handleSocialLogin('apple', credentials);
  };

  const handleGoogleAuth = async () => {
    const credentials = await authenticationWithGoogle();
    if (!credentials?.code) return;
    handleSocialLogin('google', credentials);
  };

  const handleFacebookAuth = async () => {
    const credentials = await authenticateWithFacebook();
    if (!credentials?.code) return;
    handleSocialLogin('facebook', credentials);
  };

  const handleSocialLogin = async (authProvider: string, credentials: any) => {
    const response = (await socialAuth({
      credentials,
      authProvider,
    }).unwrap()) as AuthStoreType;
    onAuthSuccess(response);
  };

  return (
    <Flex justify="center" direction="column">
      {isLoading && (
        <ActivityIndicator
          animating={true}
          toast
          size="large"
          text="Loading..."
        />
      )}
      {variant === 'primary' ? (
        <>
          <Flex justify="center" direction="column">
            <Flex style={styles.buttonRow} justify="between">
              <Button
                type="ghost"
                style={styles.button}
                icon={<Facebook />}
                onPress={handleFacebookAuth}
              />
              <Button
                type="ghost"
                style={styles.button}
                icon={<Google />}
                onPress={handleGoogleAuth}
              />
              <Button
                type="ghost"
                style={styles.button}
                icon={<Apple />}
                onPress={handleAppleAuth}
              />
            </Flex>
            <WhiteSpace size="lg" />
            <Text type="h4">{title}</Text>
          </Flex>
        </>
      ) : (
        <>
          <Text type="h4">{title}</Text>
          <WhiteSpace size="lg" />
          <Button
            type="ghost"
            leftIcon={<Facebook />}
            onPress={handleFacebookAuth}
            title="Facebook"
          />
          <WhiteSpace size="lg" />
          <Button
            type="ghost"
            leftIcon={<Google />}
            onPress={handleGoogleAuth}
            title="Google"
          />
          <WhiteSpace size="lg" />
          <Button
            type="ghost"
            leftIcon={<Apple />}
            onPress={handleAppleAuth}
            title="Apple"
          />
        </>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    width: wp('50%'),
  },
  button: {
    width: 50,
  },
});
