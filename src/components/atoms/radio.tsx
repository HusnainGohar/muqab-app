import {
  Radio as AntRadio,
  Flex,
  View,
  WhiteSpace,
} from '@ant-design/react-native';
import { colors, wp } from '../../utils/constants';
import { Text } from './text';
import { StyleSheet } from 'react-native';
import { Option } from '../../utils/types';

export interface RadioProps {
  label?: string;
  errorMessage?: string;
  options?: Option[];
  value: string;
  onChange: () => void;
}
export const Radio = ({
  label,
  errorMessage,
  options = [],
  value,
  onChange,
}: RadioProps) => {
  return (
    <View>
      {!!label && (
        <>
          <Text type="h5">{label}</Text>
          <WhiteSpace />
        </>
      )}
      <AntRadio.Group value={value} onChange={onChange}>
        <Flex justify="between" align="center" style={{ width: wp('90%') }}>
          {options?.map(option => (
            <AntRadio key={option.value} value={option?.value}>
              <Text type="h6">{option?.label}</Text>
            </AntRadio>
          ))}
        </Flex>
      </AntRadio.Group>
      <WhiteSpace size="xs" />
      <Text style={styles.errorMessage} type="caption">
        {errorMessage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.red,
    fontSize: 12,
  },
});
