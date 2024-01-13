import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const ShareApp = () => {
  return (
    <Layout title="Share">
      <WhiteSpace size="lg" />
      <Text>Share App</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
