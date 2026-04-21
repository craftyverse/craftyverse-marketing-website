import { Button } from '@/components/common/Button';
import type { DropdownItem } from '@/components/common/Dropdown';
import styles from '@/components/common/Navbar/Navbar.module.scss';
import { NavBarItem } from '@/components/common/Navbar/NavBarItem/NavBarItem';
import { Logo } from '@/illustrations/Logo';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface NavItem {
  title: string;
  redirectTo?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Programs',
    redirectTo: '/home',
  },
  {
    title: 'Solutions',
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'For Students',
        redirectTo: '/solutions/schools',
      },
      {
        title: 'For Teachers',
        redirectTo: '/solutions/creators',
      },
      {
        title: 'For Parents',
        redirectTo: '/solutions/teams',
      },
      {
        title: 'For Schools',
        redirectTo: '/solutions/schools',
      },
    ],
  },
  {
    title: 'About',
    redirectTo: '/about',
  },
  {
    title: 'Contact',
    redirectTo: '/contact',
  },
];

export const NavBar: React.FC = () => {
  return (
    <header className={styles.navBarContainer}>
      <div className={styles.navBarContent}>
        <Logo className={styles.logo} />
        <nav className={styles.navItems} aria-label="Primary navigation">
          <ul className={styles.navItemList} role="list">
            {navItems.map((navItem) => (
              <li key={navItem.title}>
                <NavBarItem {...navItem} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Button
        text="Join Waitlist"
        icon={<ArrowRight />}
        href="/waitlist"
        size="small"
      />
    </header>
  );
};
