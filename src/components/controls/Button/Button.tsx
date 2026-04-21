import styles from '@/components/controls/Button/Button.module.scss';
import React from 'react';

interface ButtonBaseProps {
  text: string;
  icon?: React.ReactNode;
  size?: 'default' | 'small';
  className?: string;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: never;
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

const renderButtonContent = (text: string, icon?: React.ReactNode) => (
  <>
    <span className={styles.text}>{text}</span>
    {icon && (
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    )}
  </>
);

const isAnchorButton = (props: ButtonProps): props is ButtonAsAnchorProps =>
  typeof props.href === 'string';

export const Button: React.FC<ButtonProps> = (props) => {
  if (isAnchorButton(props)) {
    const {
      text,
      icon,
      size = 'default',
      className,
      href,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={href}
        className={classNames(
          styles.button,
          size === 'small' ? styles.small : undefined,
          className,
        )}
        aria-label={props['aria-label'] ?? text}
      >
        {renderButtonContent(text, icon)}
      </a>
    );
  }

  const { text, icon, size = 'default', className, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={classNames(
        styles.button,
        size === 'small' ? styles.small : undefined,
        className,
      )}
      type={buttonProps.type ?? 'button'}
    >
      {renderButtonContent(text, icon)}
    </button>
  );
};
