import { FC } from 'react';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../atoms';
import { Facebook, Google } from '../../assets/svg';
import { StyleSheet } from 'react-native';
interface SocialAuthProps {
  title?: string;
  variant?: 'primary' | 'secondary';
}

export const SocialAuth: FC<SocialAuthProps> = ({
  title = 'Or SigUp With',
  variant = 'primary',
}) => {
  return (
    <Flex justify="center" direction="column">
      {variant === 'primary' ? (
        <>
          <Flex justify="center" direction="column">
            <Flex style={styles.buttonRow} justify="between">
              <Button
                type="ghost"
                style={styles.button}
                icon={<Facebook />}
                onPress={() => {}}
              />
              <Button
                type="ghost"
                style={styles.button}
                icon={<Google />}
                onPress={() => {}}
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
            onPress={() => {}}
            title="Facebook"
          />
          <WhiteSpace size="lg" />
          <Button
            type="ghost"
            leftIcon={<Google />}
            onPress={() => {}}
            title="Google"
          />
        </>
      )}
    </Flex>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    width: 120,
  },
  button: {
    width: 50,
  },
});
