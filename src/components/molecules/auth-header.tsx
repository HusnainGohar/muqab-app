import { FC } from 'react';
import { Bottom, Logo } from '../../assets/svg';
import { Title } from '../atoms/title';
import { Flex, View, WhiteSpace } from '@ant-design/react-native';
interface AuthHeaderProps {
  title: string
}

export const AuthHeader: FC<AuthHeaderProps> = ({ title }) => {

  return (
    <Flex justify='center' direction='column' >
      <Logo />
      <WhiteSpace size='lg' />
      <Title>{title}</Title>
      <WhiteSpace size='sm' />
      <Bottom />
    </Flex>
  );
};
