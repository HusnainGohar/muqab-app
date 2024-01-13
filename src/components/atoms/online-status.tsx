import { View } from '@ant-design/react-native';
import { colors } from '../../utils/constants';
import { OnlineStatus as OnlineStatusType } from '../../utils/types';

interface OnlineStatusProps {
  status: OnlineStatusType;
}

export const OnlineStatus = ({ status = 'online' }: OnlineStatusProps) => {
  let color = colors.grey;
  switch (status) {
    case 'online':
      color = colors.success;
      break;
    case 'offline':
      color = colors.grey;
      break;
    case 'away':
      color = colors.warning;
      break;
    case 'busy':
      color = colors.red;
      break;
    default:
      color = colors.grey;
  }
  return (
    <View
      style={{
        height: 15,
        width: 15,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: color,
        backgroundColor: `${color}90`,
        position: 'absolute',
        right: 10,
        top: 10,
      }}
    />
  );
};
