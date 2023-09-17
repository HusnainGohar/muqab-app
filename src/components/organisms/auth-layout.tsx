import { FC, ReactNode } from 'react';
import { Flex } from '@ant-design/react-native';
import { AuthFooter, AuthHeader } from '../molecules';
import { Image, StyleSheet } from 'react-native';
import { group } from '../../assets/images';
interface AuthLayoutProps {
  title?: string
  children: ReactNode
}

export const AuthLayout: FC<AuthLayoutProps> = ({ title = '', children }) => {

  return (
    <Flex style={styles.container} justify='center' direction='column' >
      <AuthHeader title={title} />
      {children}
      <AuthFooter />
      <Image style={styles.footerImage} source={group} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  footerImage: { position: 'absolute', bottom: 0, left: 0, zIndex: 1, resizeMode: 'contain' }
})