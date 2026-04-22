import styles from '@/components/elements/Card/Card.module.scss';
import { Button } from '@/components/controls/Button';
import { Pill } from '@/components/controls/Pill';
import React from 'react';
import { MoveRight } from 'lucide-react';

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export interface CardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  icon: React.ReactNode;
  iconColor?: string;
  title: string;
  description: string | string[];
  tags?: string[];
  ctaText: string;
  ctaHref?: string;
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Card: React.FC<CardProps> = ({
  icon,
  iconColor,
  title,
  description,
  tags,
  ctaText,
  ctaHref,
  onCtaClick,
  className,
  style,
  ...divProps
}) => {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <div
      {...divProps}
      className={classNames(styles.card, className)}
      style={style}
    >
      <span
        className={styles.iconWrap}
        aria-hidden="true"
        style={iconColor ? { backgroundColor: iconColor } : undefined}
      >
        {icon}
      </span>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.description}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Pill variant="accent" key={tag} title={tag} />
          ))}
        </div>
      )}

      <div className={styles.cta}>
        {ctaHref ? (
          <Button
            text={ctaText}
            href={ctaHref}
            icon={<MoveRight />}
            size="small"
          />
        ) : (
          <Button text={ctaText} icon={<MoveRight />} onClick={onCtaClick} />
        )}
      </div>
    </div>
  );
};
