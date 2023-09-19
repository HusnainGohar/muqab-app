import { FC } from 'react';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Button, Text } from '../atoms';
import { Facebook, Google } from '../../assets/svg';
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
            <Flex style={{ width: 120 }} justify="between">
              <Button
                type="ghost"
                style={{ width: 50 }}
                icon={<Facebook />}
                onPress={() => {}}
              />
              <Button
                type="ghost"
                style={{ width: 50 }}
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
            title="Contiue with Facebook"
          />
          <WhiteSpace size="lg" />
          <Button
            type="ghost"
            leftIcon={<Google />}
            onPress={() => {}}
            title="Contiue with Google"
          />
        </>
      )}
    </Flex>
  );
};
