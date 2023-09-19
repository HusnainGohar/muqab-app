import { FC } from 'react';
import {
  Button as AntButton,
  Flex,
  Icon,
  View,
} from '@ant-design/react-native';
import { StyleSheet } from 'react-native';
import { Text } from './text';
import { colors, wp } from '../../utils/constants';
import { IconNames } from '@ant-design/react-native/lib/icon';
import { ButtonProps as AntButtonProps } from '@ant-design/react-native/lib/button';
interface ButtonProps extends AntButtonProps {
  style?: any;
  textStyle?: any;
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  icon?: IconNames | JSX.Element;
  leftIcon?: IconNames | JSX.Element;
  rightIcon?: IconNames | JSX.Element;
  iconSize?: number | 'xs' | 'sm' | 'lg' | 'md' | 'xxs';
  iconColor?: string;
  type?: 'primary' | 'warning' | 'ghost';
}

export const Button: FC<ButtonProps> = ({
  style = {},
  textStyle = {},
  title = '',
  onPress,
  isLoading,
  icon,
  leftIcon,
  rightIcon,
  iconColor,
  iconSize = 24,
  type = 'primary',
}) => {
  const iconColorValue = iconColor
    ? iconColor
    : type === 'ghost'
    ? colors.primary
    : colors.white;
  return (
    <AntButton
      type={type}
      loading={isLoading}
      onPress={onPress}
      style={[styles.general, styles[type], style]}
      activeStyle={[styles.general, styles[type], style]}
      activeOpacity={0.5}>
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
            type="h4"
            style={[styles.generalText, styles[`${type}Text`], textStyle]}>
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
  general: {
    width: wp('80%'),
  },
  generalText: {
    color: colors.white,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
  warning: {},
  warningText: {},
});
