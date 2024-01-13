import { Text as AntText } from '@ant-design/react-native';
import { colors, fonts } from '../../utils/constants';
import {
  StyleSheet,
  TextProps as AntTextProps,
  ColorValue,
} from 'react-native';
import { ReactNode } from 'react';

export type TextTypeProp =
  | 'regular'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'caption'
  | 'link'
  | undefined;
export interface TextProps extends AntTextProps {
  children?: ReactNode;
  type?: TextTypeProp;
  color?: ColorValue;
  style?: any;
}

export const Text: React.FC<TextProps> = ({
  style = {},
  type = 'regular',
  children = '',
  color = colors.black,
  ...props
}) => {
  return (
    <AntText
      style={[styles.general, styles[type], { color }, style]}
      {...props}>
      {children}
    </AntText>
  );
};

const styles = StyleSheet.create({
  general: {
    color: colors.black,
    textAlign: 'justify',
  },
  regular: {
    fontSize: 12,
    fontFamily: fonts.quicksand.regular,
  },
  h1: {
    fontSize: 32,
    fontFamily: fonts.quicksand.bold,
  },
  h2: {
    fontSize: 24,
    fontFamily: fonts.quicksand.bold,
  },
  h3: {
    fontSize: 18,
    fontFamily: fonts.quicksand.bold,
  },
  h4: {
    fontSize: 16,
    fontFamily: fonts.quicksand.bold,
  },
  h5: {
    fontSize: 14,
    fontFamily: fonts.quicksand.bold,
  },
  h6: {
    fontSize: 12,
    fontFamily: fonts.quicksand.bold,
  },
  caption: {
    fontFamily: fonts.quicksand.regular,
    color: colors.darkGrey,
    fontSize: 10,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
