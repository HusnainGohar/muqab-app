import { Dimensions, StatusBar } from 'react-native';

export { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export const statusNavHeight = Dimensions.get('screen').height - Dimensions.get('window').height
export const statusBarHeight = StatusBar.currentHeight ?? 0;
export const navbarHeight = statusNavHeight - (StatusBar.currentHeight ?? 0);