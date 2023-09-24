import { FC } from 'react';
import { Bottom, Logo } from '../../assets/svg';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Text } from '../atoms';
interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Flex justify="center" direction="column">
      <Logo />
      <WhiteSpace size="lg" />
      <Text type="h2">{title}</Text>
      <WhiteSpace size="sm" />
      <Bottom />
    </Flex>
  );
};
