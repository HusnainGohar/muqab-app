import { StyleSheet, Platform } from 'react-native';
import { colors } from '../constants';

export const generalStyles = StyleSheet.create({
  shadowContainer: {
    // Platform-specific styles
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
