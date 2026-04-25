'use client';

import styles from '@/components/controls/Dropdown/Dropdown.module.scss';
import {
  ChevronDown,
  Palette,
  School,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useId, useRef, useState } from 'react';

export type DropdownItemIcon = 'palette' | 'school' | 'users';

export interface DropdownItem {
  title: string;
  redirectTo: string;
  icon?: DropdownItemIcon;
  isDanger?: boolean;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
  triggerClassName?: string;
  iconClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
}

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

const dropdownItemIcons: Record<DropdownItemIcon, LucideIcon> = {
  palette: Palette,
  school: School,
  users: Users,
};

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

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  className,
  triggerClassName,
  iconClassName,
  menuClassName,
  menuItemClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={classNames(styles.dropdown, className)}>
      <button
        className={classNames(styles.trigger, triggerClassName)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{label}</span>
        <ChevronDown
          className={classNames(
            styles.icon,
            isOpen && styles.iconOpen,
            iconClassName,
          )}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={menuId}
            className={classNames(styles.menu, menuClassName)}
            role="menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {items.map((item) => {
              const ItemIcon = item.icon ? dropdownItemIcons[item.icon] : null;
              const itemKey = `${item.title}-${item.redirectTo}`;

              return (
                <li key={itemKey} role="none">
                  <Link
                    className={classNames(
                      styles.menuItem,
                      item.isDanger && styles.menuItemDanger,
                      menuItemClassName,
                    )}
                    href={item.redirectTo}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                  >
                    {ItemIcon && (
                      <ItemIcon
                        className={styles.menuItemIcon}
                        aria-hidden="true"
                      />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
