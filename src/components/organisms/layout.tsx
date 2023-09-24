import { FC, ReactNode } from 'react';
import { Header } from '../molecules';
import { StyleSheet } from 'react-native';
import { hp, navbarHeight, statusBarHeight, wp } from '../../utils/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from '@ant-design/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface AuthLayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<AuthLayoutProps> = ({ title = '', children }) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <>
      <Header title={title} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + navbarHeight }}>
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
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('10%'),
  },
});
