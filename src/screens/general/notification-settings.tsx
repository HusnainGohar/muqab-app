import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const NotificationSettings = () => {
  return (
    <Layout title="Notification Settings">
      <WhiteSpace size="lg" />
      <Text>Notification Settings</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
