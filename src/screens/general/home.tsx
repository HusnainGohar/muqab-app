import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const Home = () => {
  return (
    <Layout title="">
      <WhiteSpace size="lg" />
      <Text>Home</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
