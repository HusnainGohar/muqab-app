import { Flex, Switch as AntSwitch, View } from '@ant-design/react-native';
import { colors, wp } from '../../utils/constants';
import { SwitchProps as AntSwitchProps } from '@ant-design/react-native/lib/switch/Switch';
import { Text } from './text';

export interface SwitchProps extends AntSwitchProps {
  label?: string;
  subLablel?: string;
  color?: string;
}

export const Switch = ({
  label = '',
  subLablel = '',
  color = colors.primary,
  ...props
}: SwitchProps) => (
  <Flex justify="between" align="center" style={{ width: wp('90%') }}>
    <View>
      <Text type="h3">{label}</Text>
      <Text type="h6" color={colors.darkGrey}>
        {subLablel}
      </Text>
    </View>
    <AntSwitch color={color} {...props} />
  </Flex>
);
