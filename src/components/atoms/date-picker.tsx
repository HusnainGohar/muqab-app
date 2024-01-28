import { Flex, Icon, View, WhiteSpace } from '@ant-design/react-native';
import RNDatePicker, {
  DatePickerProps as RNDatePickerProps,
} from 'react-native-date-picker';
import { useState } from 'react';
import { Text } from './text';
import { StyleSheet } from 'react-native';
import { colors, wp } from '../../utils/constants';
import dayjs from 'dayjs';

export interface DatePickerProps extends RNDatePickerProps {
  errorMessage?: string;
  placeholder?: string;
  onChange?: (date: Date) => void;
}

export const DatePicker = ({
  errorMessage = '',
  placeholder = 'YYYY-MM-DD',
  title,
  date,
  onChange,
  ...props
}: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  let value: any = dayjs(date);
  value = value.isValid() ? value : dayjs();
  value = value.toDate();

  return (
    <View>
      {!!title && (
        <>
          <Text type="h5">{title}</Text>
          <WhiteSpace />
        </>
      )}
      <Flex
        justify="between"
        onPress={() => setIsVisible(true)}
        style={[
          styles.general,
          { borderColor: colors[!errorMessage ? 'black' : 'red'] },
        ]}>
        <Text color={!!date ? colors.black : colors.darkGrey}>
          {!!date ? dayjs(value).format('MMM DD, YYYY') : placeholder}
        </Text>
        <Icon name="calendar" color={colors.darkGrey} />
      </Flex>
      <WhiteSpace size="xs" />
      <Text style={styles.errorMessage} type="caption">
        {errorMessage}
      </Text>
      <RNDatePicker
        open={isVisible}
        date={value}
        modal
        onCancel={() => setIsVisible(false)}
        onConfirm={newDate => {
          setIsVisible(false);
          onChange?.(newDate);
        }}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  general: {
    height: 50,
    width: wp('90%'),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp('5%'),
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
  },
});
