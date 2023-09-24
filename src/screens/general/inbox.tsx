import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const Inbox = () => {
  return (
    <Layout title="Inbox">
      <WhiteSpace size="lg" />
      <Text>Inbox</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
