import { StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';

export const FavouriteReaders = () => {
  return (
    <Layout title="Favourite Readers">
      <WhiteSpace size="lg" />
      <Text>Favourite Readers</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
