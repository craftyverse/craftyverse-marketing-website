'use client';

import { Button } from '@/components/controls/Button';
import type { DropdownItem } from '@/components/controls/Dropdown';
import styles from '@/components/controls/Navbar/Navbar.module.scss';
import { NavBarItem } from '@/components/controls/Navbar/NavBarItem/NavBarItem';
import { Logo } from '@/illustrations/Logo';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface NavItem {
  title: string;
  redirectTo?: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Programs',
    redirectTo: '/',
  },
  {
    title: 'Solutions',
    hasDropdown: true,
    dropdownItems: [
      {
        title: 'For Students',
        redirectTo: '/students',
      },
      // {
      //   title: 'For Teachers',
      //   redirectTo: '/solutions/creators',
      // },
      // {
      //   title: 'For Parents',
      //   redirectTo: '/solutions/teams',
      // },
      // {
      //   title: 'For Schools',
      //   redirectTo: '/solutions/schools',
      // },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuId = 'mobile-navigation-menu';

  const mobileLinks = useMemo(
    () =>
      navItems.flatMap((item) => {
        if (item.hasDropdown && item.dropdownItems?.length) {
          return item.dropdownItems.map((dropdownItem) => ({
            title: dropdownItem.title,
            redirectTo: dropdownItem.redirectTo,
          }));
        }

        return [{ title: item.title, redirectTo: item.redirectTo }];
      }),
    [],
  );

  return (
    <header className={styles.navBarContainer}>
      <div className={styles.navBarTopRow}>
        <div className={styles.navBarContent}>
          <Link
            href="/"
            aria-label="Go to home page"
            className={styles.logoLink}
          >
            <Logo className={styles.logo} />
          </Link>
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
        <div className={styles.desktopCta}>
          <Button
            text="Join Waitlist"
            icon={<ArrowRight />}
            href="#"
            size="small"
          />
        </div>
        <button
          className={styles.mobileMenuButton}
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div
        id={mobileMenuId}
        className={`${styles.mobileMenuPanel} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <nav aria-label="Mobile primary navigation">
          <ul className={styles.mobileNavItemList}>
            {mobileLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.redirectTo ?? '/'}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button
          text="Join Waitlist"
          icon={<ArrowRight />}
          href="#join-waitlist-form"
          size="small"
          className={styles.mobileMenuCta}
        />
      </div>
    </header>
  );
};
