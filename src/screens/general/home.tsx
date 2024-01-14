import { FlatList, StyleSheet } from 'react-native';
import { WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Card, Text } from '../../components/atoms';
import { astrologers } from '../../utils/constants/mock.data/astrologers';
import { hp, wp } from '../../utils/constants';

export const Home = () => {
  return (
    <Layout title="" isScrollable={false}>
      <Text type="h3">Astrologers</Text>
      <WhiteSpace size="lg" />
      <FlatList
        data={astrologers}
        contentContainerStyle={{ paddingBottom: hp('25%') }}
        style={{
          marginHorizontal: wp('-5%'),
          paddingHorizontal: wp('5%'),
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            key={index}
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            ratings={item.ratings}
            onlineStatus={item.onlineStatus}
            chatRate={item.chatRate}
            mailRate={item.mailRate}
          />
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
