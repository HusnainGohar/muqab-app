import { FC } from 'react';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Button, Controller } from '../atoms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../../utils/schemas';
import { FieldDetails } from '../../utils/types';
interface FormProps {
  fields: FieldDetails[];
  onSubmit: (params: FormSchema) => void;
  validationSchema: any;
  defaultValues: FormSchema;
  isLoading?: boolean;
  submitButtonLabel?: string;
}

export const Form: FC<FormProps> = ({
  fields,
  onSubmit,
  defaultValues,
  validationSchema,
  isLoading = false,
  submitButtonLabel = 'Continue',
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });
  return (
    <Flex direction="column">
      {fields.map(item => (
        <Flex key={item.name}>
          <Controller
            control={control}
            errorMessage={errors?.[item?.name]?.message}
            {...item}
          />
          <WhiteSpace />
        </Flex>
      ))}
      <Button
        type="primary"
        isLoading={isLoading}
        onPress={handleSubmit(onSubmit)}
        title={submitButtonLabel}
      />
    </Flex>
  );
};
