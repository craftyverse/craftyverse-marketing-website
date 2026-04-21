'use client';

import {
  DropdownInput,
  type DropdownInputOption,
  type DropdownInputProps,
} from '@/components/controls/Dropdown/DropdownInput';
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

export interface DropdownFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<DropdownInputProps, 'error' | 'onBlur' | 'value'> {
  name: TName;
  rules?: RegisterOptions<TFieldValues, TName>;
}

export const DropdownFormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  rules,
  onChange,
  ...inputProps
}: DropdownFormInputProps<TFieldValues, TName>) => {
  const { control } = useFormContext<TFieldValues>();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <DropdownInput
          {...inputProps}
          value={typeof field.value === 'string' ? field.value : ''}
          error={fieldState.error?.message}
          onBlur={field.onBlur}
          onChange={(value: string, option: DropdownInputOption) => {
            field.onChange(value);
            onChange?.(value, option);
          }}
        />
      )}
    />
  );
};
