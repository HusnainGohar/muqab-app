import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const ProfileSettings = () => {
  return (
    <Layout title="Profile Settings">
      <WhiteSpace size="lg" />
      <Text>Profile Settings</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
