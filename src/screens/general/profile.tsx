import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const Profile = () => {
  return (
    <Layout title="Profile">
      <WhiteSpace size="lg" />
      <Text>Profile</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
