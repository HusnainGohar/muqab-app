import { FC } from 'react';
import { Control, Controller as FormController } from 'react-hook-form';
import { InputField, InputFieldProps } from './input-field';

interface ControllerProps extends InputFieldProps {
  name: string;
  control: Control<any>;
}

export const Controller: FC<ControllerProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <FormController
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <InputField
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          {...props}
        />
      )}
      name={name}
    />
  );
};
