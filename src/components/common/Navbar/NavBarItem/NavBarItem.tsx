import { Dropdown, type DropdownItem } from '@/components/common/Dropdown';
import styles from '@/components/common/Navbar/NavBarItem/NavBarItem.module.scss';
import React from 'react';

interface NavBarItemProps {
  title: string;
  redirectTo?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export const NavBarItem: React.FC<NavBarItemProps> = (
  props: NavBarItemProps,
) => {
  const { title, redirectTo, hasDropdown = false, dropdownItems = [] } = props;

  if (hasDropdown) {
    return (
      <Dropdown
        label={title}
        items={dropdownItems}
        triggerClassName={styles.navBarItem}
        iconClassName={styles.dropdownIcon}
      />
    );
  }

  return (
    <a className={styles.navBarItem} href={redirectTo}>
      <span>{title}</span>
    </a>
  );
};
