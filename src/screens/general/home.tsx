import { FlatList, Image, StyleSheet } from 'react-native';
import { Flex, View, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Button, OnlineStatus, Text } from '../../components/atoms';
import { astrologers } from '../../utils/constants/mock.data/astrologers';
import { colors, hp, wp } from '../../utils/constants';
import { generalStyles } from '../../utils/styles';
import { AirbnbRating } from 'react-native-ratings';

export const Home = () => {
  return (
    <Layout title="" isScrollable={true}>
      <Text type="h3">Astrologers</Text>
      <WhiteSpace size="lg" />
      <FlatList
        data={astrologers}
        style={{ marginHorizontal: wp('-5%'), paddingHorizontal: wp('5%') }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Flex
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              marginBottom: hp('2%'),
              backgroundColor: colors.white,
              ...generalStyles.shadowContainer,
            }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ height: '100%', width: 120 }}
            />
            <View style={{ padding: wp('3%') }}>
              <Text type="h4">{item?.name?.toUpperCase()}</Text>
              <OnlineStatus status={item.onlineStatus} />
              <WhiteSpace size="xs" />
              <View
                style={{
                  height: 3,
                  width: wp('20%'),
                  borderRadius: 20,
                  backgroundColor: colors.grey,
                }}>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    height: 3,
                    width: wp('15%'),
                    borderRadius: 20,
                  }}
                />
              </View>
              <WhiteSpace size="xs" />
              <AirbnbRating
                showRating={false}
                size={10}
                count={5}
                defaultRating={item.ratings}
                ratingContainerStyle={{
                  alignItems: 'flex-start',
                }}
              />
              <WhiteSpace size="xs" />
              <Text numberOfLines={1} style={{ width: wp('54%') }}>
                {item.description}
              </Text>
              <WhiteSpace size="sm" />
              <Flex>
                <Button
                  type="primary"
                  style={{
                    width: 80,
                    height: 30,
                    borderRadius: 25,
                  }}
                  size="small"
                  textType="regular"
                  title={
                    <>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 10,
                          color: colors.white,
                        }}>
                        ${item.mailRate}
                      </Text>
                      <Text
                        style={{
                          fontSize: 8,
                          color: colors.white,
                        }}>
                        /Mail
                      </Text>
                    </>
                  }
                  leftIcon={'mail'}
                  iconSize={'xs'}
                />
                <WingBlank size="sm" />
                <Button
                  variant={!item.isOnline ? 'warning' : 'success'}
                  style={{
                    width: 80,
                    height: 30,
                    borderRadius: 25,
                  }}
                  textType="regular"
                  title={
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 10,
                        color: !item.isOnline ? colors.black : colors.white,
                      }}>
                      ${item.chatRate}
                      <Text
                        style={{
                          fontSize: 8,
                          color: !item.isOnline ? colors.black : colors.white,
                        }}>
                        /Min
                      </Text>
                    </Text>
                  }
                  leftIcon={'message'}
                  iconSize={'xs'}
                />
              </Flex>
            </View>
          </Flex>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({});
