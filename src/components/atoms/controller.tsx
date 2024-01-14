import { FC } from 'react';
import { Control, Controller as FormController } from 'react-hook-form';
import { InputField, InputFieldProps } from './input-field';
import { colors } from '../../utils/constants';
import { Switch } from './switch';
import { View, WhiteSpace } from '@ant-design/react-native';

interface ControllerProps extends InputFieldProps {
  name: string;
  control: Control<any>;
}

export const Controller: FC<ControllerProps> = ({
  control,
  name,
  type,
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
