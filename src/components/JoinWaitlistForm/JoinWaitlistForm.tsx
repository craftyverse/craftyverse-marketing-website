'use client';

import styles from '@/components/JoinWaitlistForm/JoinWaitlistForm.module.scss';
import { Button } from '@/components/controls/Button';
import { DropdownFormInput } from '@/components/controls/Dropdown';
import { Form } from '@/components/controls/Form';
import { Input } from '@/components/controls/Input';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

export type JoinWaitlistFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
};

export type JoinWaitlistFormProps = {
  onSubmit?: SubmitHandler<JoinWaitlistFormValues>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userTypeOptions = [
  { label: 'Student', value: 'student' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Parent', value: 'parent' },
  { label: 'School admin', value: 'school-admin' },
];

export const JoinWaitlistForm: React.FC<JoinWaitlistFormProps> = ({
  onSubmit,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const methods = useForm<JoinWaitlistFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
    },
    mode: 'onBlur',
  });

  const {
    control,
    formState: { isSubmitting },
  } = methods;

  const handleSubmit: SubmitHandler<JoinWaitlistFormValues> = async (
    values,
  ) => {
    try {
      setSubmitError(null);
      setHasSubmitted(false);

      if (onSubmit) {
        await onSubmit(values);
      } else {
        const response = await fetch('/api/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Submission failed');
        }
      }

      setHasSubmitted(true);
      methods.reset();
    } catch {
      setSubmitError(
        'Could not join the waitlist right now. Please try again shortly.',
      );
    }
  };

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      className={styles.form}
      disabled={isSubmitting}
    >
      <div className={styles.nameFields}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: 'First name is required' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              fullWidth
              type="text"
              label="First name"
              placeholder="Your first name"
              autoComplete="given-name"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: 'Last name is required' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              fullWidth
              type="text"
              label="Last name"
              placeholder="Your last name"
              autoComplete="family-name"
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: emailPattern,
            message: 'Enter a valid email address',
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            fullWidth
            type="email"
            label="Email"
            placeholder="Your email"
            autoComplete="email"
            error={fieldState.error?.message}
          />
        )}
      />
      <DropdownFormInput
        fullWidth
        name="userType"
        label="I am a"
        placeholder="Select one"
        options={userTypeOptions}
        rules={{ required: 'Please select your user type' }}
      />
      <Button
        className={styles.submitButton}
        type="submit"
        text={isSubmitting ? 'Joining...' : 'Join Waitlist'}
        icon={<ArrowRight />}
        disabled={isSubmitting}
      />
      {submitError && <p className={styles.errorMessage}>{submitError}</p>}
      {hasSubmitted && (
        <p className={styles.successMessage}>
          You are on the waitlist. We will be in touch soon.
        </p>
      )}
    </Form>
  );
};
