'use client';

import styles from '@/components/controls/Dropdown/DropdownInput/DropdownInput.module.scss';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';

export type DropdownInputOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export interface DropdownInputProps {
  label?: string;
  placeholder: string;
  options: DropdownInputOption[];
  value?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: React.ReactNode;
  startAdornment?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  onChange?: (value: string, option: DropdownInputOption) => void;
  onBlur?: () => void;
}

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

const menuTransition: Transition = {
  duration: 0.16,
  ease: 'easeInOut',
};

const menuExitTransition: Transition = {
  duration: 0.12,
  ease: 'easeInOut',
};

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    scale: 0.98,
    transition: menuExitTransition,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: menuTransition,
  },
};

const iconVariants: Variants = {
  closed: {
    rotate: 0,
    transition: menuTransition,
  },
  open: {
    rotate: 180,
    transition: menuTransition,
  },
};

export const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  placeholder,
  options,
  value,
  defaultValue = '',
  fullWidth,
  disabled,
  error,
  startAdornment,
  className,
  triggerClassName,
  menuClassName,
  onChange,
  onBlur,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const menuId = useId();
  const errorId = error ? `${triggerId}-error` : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );
  const triggerLabel = selectedOption?.label ?? placeholder;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onBlur]);

  const handleOptionSelect = (option: DropdownInputOption) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }

    onChange?.(option.value, option);
    setIsOpen(false);
    onBlur?.();
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames(
        styles.wrapper,
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {label && (
        <span className={styles.label} id={`${triggerId}-label`}>
          {label}
        </span>
      )}
      <button
        id={triggerId}
        className={classNames(
          styles.trigger,
          fullWidth && styles.fullWidth,
          isOpen && styles.triggerOpen,
          Boolean(error) && styles.hasError,
          triggerClassName,
        )}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-labelledby={label ? `${triggerId}-label ${triggerId}` : undefined}
        aria-describedby={errorId}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
      >
        {startAdornment && (
          <span className={styles.adornment} aria-hidden="true">
            {startAdornment}
          </span>
        )}
        <span
          className={classNames(
            styles.triggerText,
            !selectedOption && styles.placeholderText,
          )}
        >
          {triggerLabel}
        </span>
        <motion.span
          className={styles.chevron}
          variants={iconVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          aria-hidden="true"
        >
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={menuId}
            className={classNames(styles.menu, menuClassName)}
            role="listbox"
            aria-labelledby={label ? `${triggerId}-label` : undefined}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <li key={option.value} role="none">
                  <button
                    className={classNames(
                      styles.option,
                      isSelected && styles.optionSelected,
                    )}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option.icon && (
                      <span className={styles.optionIcon} aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                    <span className={styles.optionLabel}>{option.label}</span>
                    {isSelected && <Check className={styles.checkIcon} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <div className={styles.errorMessage} id={errorId}>
          {error}
        </div>
      )}
    </div>
  );
};
