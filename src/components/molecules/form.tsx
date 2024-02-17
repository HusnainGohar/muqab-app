import { FC } from 'react';
import { Flex, View, WhiteSpace } from '@ant-design/react-native';
import { Button, Controller, Text } from '../atoms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../../utils/schemas';
import { FieldDetails, SectionDetails } from '../../utils/types';
import { colors } from '../../utils/constants';
interface FormProps {
  fields?: FieldDetails[];
  sections?: SectionDetails[];
  onSubmit: (params: FormSchema) => void;
  validationSchema?: any;
  defaultValues: FormSchema;
  values?: FormSchema;
  isLoading?: boolean;
  submitButtonLabel?: string;
  errors?: any;
}

export const Form: FC<FormProps> = ({
  fields,
  onSubmit,
  defaultValues,
  values,
  validationSchema,
  isLoading = false,
  submitButtonLabel = 'Continue',
  errors: apiErrors,
  sections,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<FormSchema>({
    resolver: !!validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues,
    values,
  });

  const errors = { ...(validationErrors ?? {}), ...(apiErrors ?? {}) };

  const Fields = ({ fields }: { fields: FieldDetails[] }) => {
    return (
      <View>
        {Array.isArray(fields) ? (
          fields.map(item => (
            <Flex key={item.name}>
              <Controller
                control={control}
                errorMessage={errors?.[item?.name]?.message}
                {...item}
              />
              <WhiteSpace />
            </Flex>
          ))
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <Flex direction="column" style={{ flex: 1 }}>
      {Array.isArray(sections) && sections.length > 0 ? (
        <>
          {sections.map(section => (
            <View key={section.id}>
              <Text type="h3" color={colors.primary}>
                {section.title}
              </Text>
              {!!section?.description && (
                <Text type="h5" color={colors.darkGrey}>
                  {section.description}
                </Text>
              )}
              <Fields fields={section.fields ?? []} />
            </View>
          ))}
        </>
      ) : (
        <Fields fields={fields ?? []} />
      )}
      <Flex
        style={{
          alignItems: 'flex-end',
          flex: 2 / 3,
        }}>
        <Button
          type="primary"
          width="full"
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
          title={submitButtonLabel}
        />
      </Flex>
    </Flex>
  );
};
