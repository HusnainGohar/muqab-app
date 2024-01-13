import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const Credits = () => {
  return (
    <Layout title="Current Balance">
      <WhiteSpace size="lg" />
      <Text>Current Balance</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
