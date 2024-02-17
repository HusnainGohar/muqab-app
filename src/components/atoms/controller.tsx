import { FC } from 'react';
import { Control, Controller as FormController } from 'react-hook-form';
import { InputField } from './input-field';
import { colors } from '../../utils/constants';
import { Switch } from './switch';
import { View, WhiteSpace } from '@ant-design/react-native';
import { FieldTypeOptions, Option } from '../../utils/types';
import { InputModeOptions } from 'react-native';
import { DatePicker } from './date-picker';
import { Radio } from './radio';
import dayjs from 'dayjs';
import { FIELD_TYPE } from '../../utils/enums';

interface ControllerProps {
  name: string;
  control: Control<any>;
  type?: FieldTypeOptions;
  inputMode?: InputModeOptions;
  placeholder?: string;
  label?: string;
  subText?: string;
  isOTP?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  options?: Option[];
}

export const Controller: FC<ControllerProps> = ({
  control,
  name,
  type,
  options = [],
  errorMessage,
  ...props
}) => {
  return (
    <FormController
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        switch (type) {
          case FIELD_TYPE.SWITCH:
            return (
              <View>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Switch
                  checked={value}
                  onChange={onChange}
                  color={colors.primary}
                  label={props.label}
                  //@ts-ignore
                  subLablel={props.subText}
                />
              </View>
            );
          case FIELD_TYPE.RADIO:
            return (
              <Radio
                label={props.label}
                options={options}
                value={value}
                onChange={onChange}
                errorMessage={errorMessage}
              />
            );
          case FIELD_TYPE.DATE:
          case FIELD_TYPE.DATE_TIME:
          case FIELD_TYPE.TIME:
            const isDateTime = type === FIELD_TYPE.DATE_TIME;
            const isTime = type === FIELD_TYPE.TIME;
            return (
              <DatePicker
                mode={type}
                title={props.label}
                date={value}
                onChange={date => {
                  onChange(dayjs(date).toDate());
                }}
                errorMessage={errorMessage}
              />
            );
          default:
            return (
              <InputField
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                //@ts-ignore
                type={type}
                errorMessage={errorMessage}
                {...props}
              />
            );
        }
      }}
      name={name}
    />
  );
};
