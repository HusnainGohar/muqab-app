import { Popover as AntPopover } from '@ant-design/react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/constants';
import { PopoverProps } from '../../utils/types';
import { Text } from '../atoms';

export const Popover = ({
  trigger,
  triggerStyle,
  options,
  renderItem,
  onPickerOptionPress,
  children,
}: PopoverProps) => {
  return (
    <AntPopover
      triggerStyle={triggerStyle}
      placement="auto"
      useNativeDriver
      renderOverlayComponent={(nodes: any, onClose) => (
        <>
          {nodes?.map((node: any, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                onClose();
                onPickerOptionPress?.(options[i]);
              }}>
              {node}
            </TouchableOpacity>
          ))}
        </>
      )}
      overlay={options.map(
        (option, i) =>
          renderItem?.({ item: options[i], index: i }) ?? (
            <Text
              key={i}
              type="h4"
              style={{
                padding: 10,
                borderBottomWidth: options.length === i + 1 ? 0 : 1 / 2,
                borderColor: colors.grey,
              }}>
              {option.label}
            </Text>
          ),
      )}>
      {trigger || children}
    </AntPopover>
  );
};

const styles = StyleSheet.create({});
