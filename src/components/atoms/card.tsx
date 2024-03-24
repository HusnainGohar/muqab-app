import { Flex, View, WhiteSpace, WingBlank } from '@ant-design/react-native';
import {
  IMAGE_PLACEHOLDER,
  chatRequestScreen,
  chatScreen,
  colors,
  hp,
  wp,
} from '../../utils/constants';
import { generalStyles } from '../../utils/styles';
import { Image } from 'react-native';
import { Text } from './text';
import { OnlineStatus } from './online-status';
import { AirbnbRating } from 'react-native-ratings';
import { Button } from './button';
import { ONLINE_STATUS } from '../../utils/enums';
import { OnlineStatus as OnlineStatusType } from '../../utils/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../routes';

export interface CardProps {
  imageUrl?: string;
  id?: string;
  name?: string;
  ratings?: number;
  description?: string;
  onlineStatus?: string;
  mailRate?: number;
  chatRate?: number;
}

export const Card = ({
  imageUrl = IMAGE_PLACEHOLDER,
  id = '',
  name,
  ratings = 0,
  description = '',
  onlineStatus = ONLINE_STATUS.OFFLINE,
  mailRate = 0,
  chatRate = 0,
}: CardProps) => {
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  const isOnline = onlineStatus === ONLINE_STATUS.ONLINE;
  const isBusy = onlineStatus === ONLINE_STATUS.BUSY;
  const chatButtonVariant =
    onlineStatus === ONLINE_STATUS.ONLINE
      ? 'success'
      : onlineStatus === ONLINE_STATUS.BUSY
      ? 'danger'
      : onlineStatus === ONLINE_STATUS.AWAY
      ? 'warning'
      : 'ghost';

  return (
    <Flex
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: hp('2%'),
        width: wp('90%'),
        backgroundColor: colors.white,
        ...generalStyles.shadowContainer,
      }}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          height: '100%',
          width: wp('30%'),
        }}
      />
      <View
        style={{
          padding: wp('3%'),
          width: wp('60%'),
          ...generalStyles.shadowContainer,
        }}>
        <Text type="h4">{name?.toUpperCase()}</Text>
        <OnlineStatus status={onlineStatus as OnlineStatusType} />
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
          isDisabled
          defaultRating={ratings}
          ratingContainerStyle={{
            alignItems: 'flex-start',
          }}
        />
        <WhiteSpace size="xs" />
        <Text numberOfLines={1} style={{ width: wp('54%') }}>
          {description}
        </Text>
        <WhiteSpace size="sm" />
        <Flex>
          <Button
            type="primary"
            style={{
              width: wp('22%'),
              height: 30,
              borderRadius: 25,
            }}
            size="small"
            textType="regular"
            title={
              <>
                <Text type="h6" color={colors.white}>
                  ${mailRate}
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
            variant={chatButtonVariant}
            style={{
              width: wp('22%'),
              height: 30,
              borderRadius: 25,
            }}
            size="small"
            textType="regular"
            title={
              <>
                <Text
                  type="h6"
                  color={!(isOnline || isBusy) ? colors.black : colors.white}>
                  ${chatRate}
                </Text>
                <Text
                  color={!(isOnline || isBusy) ? colors.black : colors.white}
                  style={{
                    fontSize: 8,
                  }}>
                  /Min
                </Text>
              </>
            }
            onPress={() => navigate(chatRequestScreen, { userId: id })}
            leftIcon={'message'}
            iconSize={'xs'}
          />
        </Flex>
      </View>
    </Flex>
  );
};
