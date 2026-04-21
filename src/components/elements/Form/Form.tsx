'use client';

import styles from '@/components/elements/Form/Form.module.scss';
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import type { FormHTMLAttributes, KeyboardEvent, ReactNode } from 'react';

export type FormProps<T extends FieldValues> = {
  formBody?: ReactNode;
  children?: ReactNode;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
  methods: UseFormReturn<T>;
  disabled?: boolean;
  canSubmit?: () => boolean;
  onEnter?: (event: KeyboardEvent<HTMLFormElement>) => void;
  disableAfterSubmit?: boolean;
} & Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>;

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

type FormSubmitEvent = Parameters<
  NonNullable<FormHTMLAttributes<HTMLFormElement>['onSubmit']>
>[0];

export const Form = <T extends FieldValues>({
  formBody,
  children,
  onSubmit,
  onError,
  methods,
  disabled = false,
  canSubmit,
  onEnter,
  disableAfterSubmit = false,
  className,
  ...formProps
}: FormProps<T>) => {
  const shouldDisable =
    disabled || (disableAfterSubmit && methods.formState.isSubmitSuccessful);

  const handleFormSubmit = (event: FormSubmitEvent) => {
    if (canSubmit && !canSubmit()) {
      event.preventDefault();
      return;
    }

    if (onSubmit) {
      methods.handleSubmit(onSubmit, onError)(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && onEnter) {
      onEnter(event);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        {...formProps}
        className={classNames(styles.form, className)}
        onSubmit={handleFormSubmit}
        onKeyDown={handleKeyDown}
      >
        <fieldset disabled={shouldDisable}>
          {formBody}
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
