import { FC, ReactNode } from 'react';
import {
  Button as AntButton,
  Flex,
  Icon,
  View,
} from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { Text, TextTypeProp } from './text';
import { colors, wp } from '../../utils/constants';
import { IconNames } from '@ant-design/react-native/lib/icon';
import { ButtonProps as AntButtonProps } from '@ant-design/react-native/lib/button';
import { CustomWidth } from '../../utils/types';
interface ButtonProps extends AntButtonProps {
  width?: CustomWidth;
  style?: any;
  textStyle?: any;
  textType?: TextTypeProp;
  title?: ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: IconNames | JSX.Element;
  leftIcon?: IconNames | JSX.Element;
  rightIcon?: IconNames | JSX.Element;
  iconSize?: number | 'xs' | 'sm' | 'lg' | 'md' | 'xxs';
  iconColor?: string;
  type?: 'primary' | 'warning' | 'ghost';
  variant?: 'primary' | 'warning' | 'ghost' | 'success';
}

export const Button: FC<ButtonProps> = ({
  style = {},
  textStyle = {},
  textType = 'h4',
  title = '',
  onPress,
  isLoading,
  disabled,
  icon,
  leftIcon,
  rightIcon,
  iconColor,
  iconSize = 24,
  type = 'primary',
  variant = 'primary',
  width = 'auto',
  ...props
}) => {
  const iconColorValue = iconColor
    ? iconColor
    : variant === 'ghost'
    ? colors.primary
    : variant === 'warning'
    ? colors.black
    : colors.white;
  const buttonWidth =
    width === 'auto'
      ? 'auto'
      : width === 'full'
      ? wp('80%')
      : width === 'half'
      ? wp('50%')
      : width.includes('%')
      ? wp(width)
      : width;
  return (
    <AntButton
      type={type}
      loading={isLoading}
      disabled={isLoading || disabled}
      onPress={onPress}
      style={[{ width: buttonWidth }, styles[variant], style]}
      activeStyle={[{ width: buttonWidth }, styles[variant], style]}
      activeOpacity={0.5}
      {...props}>
      {icon ? (
        <View>
          {typeof icon === 'string' ? (
            <Icon size={iconSize} color={iconColorValue} name={icon} />
          ) : (
            icon
          )}
        </View>
      ) : (
        <Flex
          style={{ width: '100%' }}
          direction="row"
          justify="between"
          align="center">
          <View>
            {typeof leftIcon === 'string' ? (
              <Icon size={iconSize} color={iconColorValue} name={leftIcon} />
            ) : (
              leftIcon
            )}
          </View>
          <Text
            type={textType}
            style={[styles.generalText, styles[`${variant}Text`], textStyle]}>
            {title}
          </Text>
          <View>
            {typeof rightIcon === 'string' ? (
              <Icon size={iconSize} color={iconColorValue} name={rightIcon} />
            ) : (
              rightIcon
            )}
          </View>
        </Flex>
      )}
    </AntButton>
  );
};

const styles = StyleSheet.create({
  generalText: {
    color: colors.white,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  warning: {
    backgroundColor: colors.warning,
    borderColor: colors.warning,
  },
  success: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  primaryText: {
    color: colors.white,
  },
  ghost: {
    borderColor: colors.darkGrey,
    backgroundColor: colors.transparet,
  },
  ghostText: {
    color: colors.black,
  },
  warningText: {
    color: colors.black,
  },
  successText: {
    color: colors.white,
  },
});
