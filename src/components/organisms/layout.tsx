import { FC, ReactNode, useEffect } from 'react';
import { Header } from '../molecules';
import { StyleSheet, View } from 'react-native';
import { colors, hp, wp } from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast, WhiteSpace } from '@ant-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../atoms';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
interface LayoutProps {
  title?: string;
  subTitle?: string;
  description?: string;
  isScrollable?: boolean;
  hasBack?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  rightHeader?: ReactNode;
  onPressRightHeader?: () => void;
  leftHeader?: ReactNode;
  onPressLeftHeader?: () => void;
}

export const Layout: FC<LayoutProps> = ({
  title = '',
  subTitle = '',
  description = '',
  isScrollable = true,
  isLoading = false,
  hasBack = false,
  rightHeader,
  onPressRightHeader,
  leftHeader,
  onPressLeftHeader,
  children,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { getState } = useNavigation();
  const isTabScreen = getState().type === 'tab';
  const tabBarHeight = isTabScreen ? useBottomTabBarHeight() : bottom + top;

  const screenHeight = hp('92%');

  useEffect(() => {
    let key;
    if (isLoading) {
      key = Toast.loading('Loading...');
    } else {
      if (!!key) Toast.remove(key);
    }
  }, [isLoading]);

  const Content = () => (
    <View
      style={[
        styles.container,
        {
          minHeight: screenHeight,
          paddingBottom: tabBarHeight,
        },
      ]}>
      <View>
        {!!subTitle && (
          <Text type="h3" color={colors.primary}>
            {subTitle}
          </Text>
        )}
        {!!description && (
          <>
            <WhiteSpace size="lg" />
            <Text type="h5">{description}</Text>
            <WhiteSpace size="lg" />
          </>
        )}
      </View>
      {children}
    </View>
  );

  return (
    <View>
      <Header
        title={title}
        hasBack={hasBack}
        left={leftHeader}
        onPressLeft={onPressLeftHeader}
        right={rightHeader}
        onPressRight={onPressRightHeader}
      />
      {!isScrollable ? (
        <Content />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: screenHeight, paddingBottom: tabBarHeight }}>
          <Content />
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
  },
});
