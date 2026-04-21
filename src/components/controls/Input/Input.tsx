'use client';

import styles from '@/components/controls/Input/Input.module.scss';
import {
  CircleAlert,
  Eye,
  EyeOff,
  Search,
  X,
  type LucideIcon,
} from 'lucide-react';
import React, {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type Ref,
} from 'react';

type InputType = 'text' | 'password' | 'search' | 'email';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'children'
  | 'defaultValue'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'type'
  | 'value'
> {
  fullWidth?: boolean;
  type: InputType;
  label?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: React.ReactNode;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onClear?: () => void;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: () => void;
  wrapperClassName?: string;
  containerClassName?: string;
  inputClassName?: string;
}

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

const setRefs = <T,>(value: T, ...refs: Array<Ref<T> | undefined>) => {
  refs.forEach((ref) => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(value);
      return;
    }

    ref.current = value;
  });
};

const IconButton = ({
  label,
  icon: Icon,
  onMouseDown,
  onClick,
}: {
  label: string;
  icon: LucideIcon;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    type="button"
    className={styles.iconButton}
    aria-label={label}
    onMouseDown={onMouseDown}
    onClick={onClick}
  >
    <Icon aria-hidden="true" />
  </button>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      label,
      startAdornment,
      endAdornment,
      fullWidth,
      placeholder,
      value,
      defaultValue = '',
      onClear,
      onChange,
      onBlur,
      onFocus,
      error,
      id,
      wrapperClassName,
      containerClassName,
      inputClassName,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : internalValue;
    const resolvedType =
      type === 'password' && isPasswordVisible ? 'text' : type;

    const assignInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        setRefs(node, forwardedRef);
      },
      [forwardedRef],
    );

    const handleClearMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onClear?.();
      onChange?.('');

      if (!isControlled) {
        setInternalValue('');
      }

      inputRef.current?.focus();
    };

    const getStartAdornment = () => {
      if (startAdornment) {
        return startAdornment;
      }

      if (type === 'search') {
        return <Search className={styles.adornmentIcon} aria-hidden="true" />;
      }

      return null;
    };

    const getEndAdornment = () => {
      if (endAdornment) {
        return endAdornment;
      }

      if (type === 'password') {
        return (
          <IconButton
            label={isPasswordVisible ? 'Hide password' : 'Show password'}
            icon={isPasswordVisible ? EyeOff : Eye}
            onClick={() => setIsPasswordVisible((current) => !current)}
          />
        );
      }

      if (isActive && inputValue.trim().length > 0) {
        return (
          <IconButton
            label="Clear input"
            icon={X}
            onMouseDown={handleClearMouseDown}
            onClick={handleClear}
          />
        );
      }

      return null;
    };

    return (
      <div
        className={classNames(
          styles.wrapper,
          fullWidth && styles.fullWidth,
          wrapperClassName,
        )}
      >
        {label && (
          <span className={styles.label} id={`${inputId}-label`}>
            {label}
          </span>
        )}
        <label
          className={classNames(
            styles.container,
            fullWidth && styles.fullWidth,
            Boolean(error) && styles.hasError,
            containerClassName,
          )}
          htmlFor={inputId}
        >
          {getStartAdornment()}
          <input
            {...inputProps}
            ref={assignInputRef}
            id={inputId}
            className={inputClassName}
            type={resolvedType}
            value={inputValue}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            aria-labelledby={label ? `${inputId}-label` : undefined}
            aria-describedby={errorId}
            onChange={(event) => {
              const nextValue = event.target.value;

              if (!isControlled) {
                setInternalValue(nextValue);
              }

              onChange?.(nextValue);
            }}
            onBlur={(event) => {
              setIsActive(false);
              onBlur?.(event.target.value);
            }}
            onFocus={() => {
              setIsActive(true);
              onFocus?.();
            }}
          />
          {getEndAdornment()}
        </label>
        {error && (
          <div className={styles.errorMessage} id={errorId}>
            <CircleAlert aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
