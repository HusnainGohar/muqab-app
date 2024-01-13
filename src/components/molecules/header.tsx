import { FC, ReactNode } from 'react';
import { Logo } from '../../assets/svg';
import { Flex, Icon } from '@ant-design/react-native';
import { Text } from '../atoms';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface HeaderProps {
  title: string;
  hasBack?: boolean;
  left?: ReactNode;
  onPressLeft?: () => void;
  right?: ReactNode;
  onPressRight?: () => void;
}

export const Header: FC<HeaderProps> = ({
  title,
  hasBack = false,
  left,
  onPressLeft = () => {},
  right,
  onPressRight = () => {},
}) => {
  const { canGoBack, goBack } = useNavigation();
  const { top } = useSafeAreaInsets();
  return (
    <Flex
      justify="between"
      style={{
        paddingVertical: !!title ? 15 : 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        marginTop: top,
      }}>
      <TouchableOpacity
        onPress={!!hasBack ? (canGoBack() ? goBack : () => {}) : onPressLeft}>
        {!!hasBack ? <Icon name="left" /> : left}
      </TouchableOpacity>
      {!!title ? (
        <Text type="h2">{title}</Text>
      ) : (
        <Logo height={25} width={130} />
      )}
      <TouchableOpacity onPress={onPressRight}>{right}</TouchableOpacity>
    </Flex>
  );
};
