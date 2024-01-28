import { StyleSheet } from 'react-native';
import {
  Flex,
  Icon,
  View,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native';
import { Layout } from '../../components/organisms';
import { Text } from '../../components/atoms';
import { colors } from '../../utils/constants';
import { profileMenu } from '../../utils/constants';
import { Fragment } from 'react';
import { Separator } from '../../components/atoms';
import { useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../routes';
import { StackNavigationProp } from '@react-navigation/stack';

export const Profile = () => {
  const { navigate }: StackNavigationProp<StackParamList> = useNavigation();
  return (
    <Layout title="Profile" isScrollable={true}>
      {profileMenu.map((item, i) => (
        <View key={i}>
          <Text type="h3" color={colors.darkGrey}>
            {item.title}
          </Text>
          <WhiteSpace size="lg" />
          {item?.options?.map((option, index) => (
            <Fragment key={index}>
              <Flex
                justify="between"
                onPress={
                  !!option?.navigateTo
                    ? //@ts-ignore
                      () => navigate(option.navigateTo)
                    : undefined
                }>
                <Flex>
                  <Icon name={option.icon} color={colors.darkGrey} size="md" />
                  <WingBlank size="md" />
                  <Text type="h5">{option.label}</Text>
                </Flex>
                {option?.right ?? (
                  <Icon name={'right'} color={colors.darkGrey} size="xxs" />
                )}
              </Flex>
              <WhiteSpace size="lg" />
            </Fragment>
          ))}
          {profileMenu?.length - 1 !== i && (
            <>
              <Separator />
              <WhiteSpace size="lg" />
            </>
          )}
        </View>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({});
