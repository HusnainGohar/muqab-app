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
  ...props
}) => {
  return (
    <FormController
      control={control}
      render={({ field: { onChange, onBlur, value } }) => {
        switch (type) {
          case 'switch':
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
          case 'radio':
            return (
              <Radio
                label={props.label}
                options={options}
                value={value}
                onChange={onChange}
              />
            );
          case 'date':
            return (
              <DatePicker
                mode="date"
                title={props.label}
                value={value}
                onChange={onChange}
              />
            );
          default:
            return (
              <InputField
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                {...props}
              />
            );
        }
      }}
      name={name}
    />
  );
};
