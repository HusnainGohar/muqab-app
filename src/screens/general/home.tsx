import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Flex, Icon, WhiteSpace } from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Button, Card, Text } from '../../components/atoms';
import { colors, hp, wp } from '../../utils/constants';
import { useGetAdvisorQuery } from '../../apis/advisor';
import { useState } from 'react';
import { psychicTools } from '../../utils/constants/mock.data';

export const Home = () => {
  const [offset, setOffset] = useState(0);
  const [tools, setTools] = useState<string[]>([]);
  const { data: advisorData, isLoading } = useGetAdvisorQuery({
    limit: 10,
    offset,
    tools, //paginationState, searchAdvisor: searchAdvisor, filterStatus, ratingsFilter, minPrice:{min:minPrice[0], max: minPrice[1]}, topics: selectedTools
  });
  const advisors = advisorData?.users ?? [];

  console.log('advisors...', advisors);

  const onPressCategory = (category: string) => {
    setTools(prevTools => {
      if (tools.includes(category))
        return prevTools.filter(item => item !== category);
      return [...prevTools, category];
    });
  };

  return (
    <Layout title="" isScrollable={false}>
      <WhiteSpace size="lg" />
      <View
        style={{
          marginHorizontal: wp('-5%'),
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: wp('5%') }}>
          {psychicTools.map((category, i) => {
            const isCategorySelected = tools.includes(category.value);
            return (
              <TouchableOpacity
                key={i}
                style={{ marginRight: wp('2%') }}
                onPress={() => onPressCategory(category.value)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    backgroundColor:
                      colors[isCategorySelected ? 'primary' : 'grey'],
                    borderWidth: 1,
                    borderColor:
                      colors[isCategorySelected ? 'primary' : 'black'],
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {!!category?.icon && (
                    <Icon name={category.icon} size={'lg'} />
                  )}
                </View>
                <WhiteSpace size="md" />
                <Text
                  type="h5"
                  numberOfLines={3}
                  style={{ textAlign: 'center', width: 100 }}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <WhiteSpace size="lg" />
      <Flex justify="between">
        <Button
          title="Popularity"
          style={{ width: wp('40%'), borderRadius: 100 }}
        />
        <Button
          title="Filters"
          variant="ghost"
          style={{
            width: wp('40%'),
            borderRadius: 100,
            backgroundColor: `${colors.secondary}80`,
          }}
          rightIcon={'filter'}
        />
      </Flex>
      <WhiteSpace size="lg" />
      <Text type="h3">Astrologers</Text>
      <WhiteSpace size="lg" />
      <FlatList
        data={advisors}
        contentContainerStyle={{
          paddingBottom: hp('1%'),
        }}
        style={{
          marginHorizontal: wp('-5%'),
          paddingHorizontal: wp('5%'),
          flex: 1 / 3,
        }}
        refreshing={isLoading}
        onRefresh={() => setOffset(0)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Card
            key={index}
            id={item?.id}
            name={`${item?.firstName} ${item?.lastName}`}
            description={''}
            imageUrl={item.profilePic}
            ratings={0}
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
