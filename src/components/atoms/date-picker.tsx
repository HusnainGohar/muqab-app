import {
  DatePicker as AntDatePicker,
  Flex,
  Icon,
  View,
  WhiteSpace,
} from '@ant-design/react-native';
import { DatePickerProps as AntDatePickerProps } from '@ant-design/react-native/lib/date-picker';
import { useState } from 'react';
import { Text } from './text';
import { StyleSheet } from 'react-native';
import { colors, wp } from '../../utils/constants';

export interface DatePickerProps extends AntDatePickerProps {
  errorMessage?: string;
  placeholder?: string;
}

export const DatePicker = ({
  errorMessage = '',
  placeholder = 'YYYY-MM-DD',
  title,
  value,
  onChange,
  ...props
}: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false);

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
        style={styles.general}>
        <Text color={!!value ? colors.black : colors.darkGrey}>
          {!!value ? value?.toDateString() : placeholder}
        </Text>
        <Icon name="calendar" color={colors.darkGrey} />
      </Flex>
      <WhiteSpace size="xs" />
      <Text style={styles.errorMessage} type="caption">
        {errorMessage}
      </Text>
      <AntDatePicker
        visible={isVisible}
        value={value}
        onChange={onChange}
        onOk={() => setIsVisible(false)}
        onDismiss={() => setIsVisible(false)}
        okText={
          <Text type="h6" color={colors.primary}>
            Done
          </Text>
        }
        dismissText={
          <Text type="h6" color={colors.darkGrey}>
            Cancel
          </Text>
        }
        title={!!title ? <Text type="h5">{title}</Text> : null}
        locale={{
          DatePickerLocale: {
            year: '',
            day: '',
            month: '',
            hour: '',
            minute: '',
            am: '',
            pm: '',
          },
          okText: 'Done',
          dismissText: 'Cancel',
          extra: '',
        }}
        styles={{}}
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
    borderColor: colors.black,
    paddingHorizontal: wp('5%'),
  },
  errorMessage: {
    color: colors.red,
    fontSize: 12,
  },
});
