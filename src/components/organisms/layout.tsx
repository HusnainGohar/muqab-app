import { FC, ReactNode } from 'react';
import { Header } from '../molecules';
import { StyleSheet } from 'react-native';
import {
  colors,
  hp,
  navbarHeight,
  statusBarHeight,
  wp,
} from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, WhiteSpace } from '@ant-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../atoms';
interface LayoutProps {
  title?: string;
  subTitle?: string;
  description?: string;
  isScrollable?: boolean;
  hasBack?: boolean;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  title = '',
  subTitle = '',
  description = '',
  isScrollable = false,
  hasBack = false,
  children,
}) => {
  const { top, bottom } = useSafeAreaInsets();

  const Content = () => (
    <View
      style={[
        styles.container,
        {
          minHeight: hp('95%') + statusBarHeight,
          paddingTop: top,
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
    <>
      <Header title={title} hasBack={hasBack} />
      {isScrollable ? (
        <Content />
      ) : (
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottom + navbarHeight,
          }}>
          <Content />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('5%'),
  },
});
