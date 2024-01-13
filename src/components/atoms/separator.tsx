import { View } from '@ant-design/react-native';
import { colors } from '../../utils/constants';
import { ColorValue } from 'react-native';

export interface SeparatorProps {
  size?: number;
  width?: any;
  color?: ColorValue;
}

export const Separator = ({
  size = 1,
  width = '100%',
  color = colors.grey,
}: SeparatorProps) => (
  <View style={{ height: size, width, backgroundColor: color }} />
);
