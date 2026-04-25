import React from 'react';
import Image from 'next/image';
import { Pill, PillDotIcon } from '@/components/controls/Pill';
import styles from '@/components/elements/ImageContentSection/ImageContentSection.module.scss';
import { CircleCheck } from 'lucide-react';

const classNames = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(' ');

export interface ImageContentSectionProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'title'
> {
  badgeTitle: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: string;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  layout?: 'image-left' | 'image-right';
}

export const ImageContentSection: React.FC<ImageContentSectionProps> = ({
  badgeTitle,
  badgeIcon,
  title,
  description,
  points,
  imageSrc,
  imageAlt,
  layout = 'image-left',
  className,
  ...sectionProps
}) => {
  return (
    <section
      {...sectionProps}
      className={classNames(
        styles.section,
        layout === 'image-right' ? styles.imageRight : undefined,
        className,
      )}
    >
      <div className={styles.imageWrap}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <Pill
          variant="accent"
          title={badgeTitle}
          icon={badgeIcon ?? <PillDotIcon color="#fa8673" />}
        />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <ul className={styles.list}>
          {points.map((point) => (
            <li key={point} className={styles.listItem}>
              <CircleCheck className={styles.listIcon} aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
