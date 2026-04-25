import React from 'react';
import styles from '@/components/elements/FeatureCard/FeatureCard.module.scss';

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export interface FeatureCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  ...divProps
}) => {
  return (
    <article {...divProps} className={classNames(styles.card, className)}>
      <span className={styles.iconWrap} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
};
