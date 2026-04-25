import styles from '@/components/controls/Button/Button.module.scss';
import Link from 'next/link';
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

const isInternalHref = (href: string) => href.startsWith('/');

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

    const commonProps = {
      ...anchorProps,
      className: classNames(
        styles.button,
        size === 'small' ? styles.small : undefined,
        className,
      ),
      'aria-label': props['aria-label'] ?? text,
    };

    if (isInternalHref(href)) {
      return (
        <Link {...commonProps} href={href}>
          {renderButtonContent(text, icon)}
        </Link>
      );
    }

    return (
      <a {...commonProps} href={href}>
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
