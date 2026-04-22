import styles from '@/components/controls/Pill/Pill.module.scss';
import React from 'react';

export interface PillProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  title: string;
  icon?: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'overlay';
}

export interface PillDotIconProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children' | 'color'
> {
  color?: string;
  size?: number | string;
}

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export const PillDotIcon: React.FC<PillDotIconProps> = ({
  color = '#fa8673',
  size = 10,
  className,
  style,
  ...spanProps
}) => {
  return (
    <span
      {...spanProps}
      className={classNames(styles.dotIcon, className)}
      style={{
        ...style,
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
};

export const Pill: React.FC<PillProps> = ({
  title,
  icon,
  className,
  variant = 'neutral',
  ...spanProps
}) => {
  return (
    <span
      {...spanProps}
      className={classNames(
        styles.pill,
        variant === 'accent' ? styles.accent : undefined,
        variant === 'overlay' ? styles.overlay : undefined,
        className,
      )}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.title}>{title}</span>
    </span>
  );
};
