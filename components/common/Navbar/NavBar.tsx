import styles from '@/components/common/Navbar/Navbar.module.scss';
import React from 'react';

export const NavBar: React.FC = () => {
  return (
    <div className={styles.navBarContainer}>
      <div>Craftyverse</div>
    </div>
  );
};
