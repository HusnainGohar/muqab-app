import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const TransactionHistory = () => {
  return (
    <Layout title="Transaction History">
      <WhiteSpace size="lg" />
      <Text>Transaction History</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
