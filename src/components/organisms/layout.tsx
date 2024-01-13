import { FC, ReactNode } from 'react';
import { Header } from '../molecules';
import { StyleSheet } from 'react-native';
import { hp, navbarHeight, statusBarHeight, wp } from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from '@ant-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface LayoutProps {
  title?: string;
  isScrollable?: boolean;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({
  title = '',
  isScrollable = false,
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
      {children}
    </View>
  );

  return (
    <>
      <Header title={title} />
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
