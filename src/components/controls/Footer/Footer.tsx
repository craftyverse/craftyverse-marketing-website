import React from 'react';
import { Logo } from '@/illustrations/Logo';
import styles from './Footer.module.scss';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'For Students', href: '/solutions/students' },
      { label: 'For Parents', href: '/solutions/parents' },
      { label: 'For Schools', href: '/solutions/schools' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Security', href: '/security' },
    ],
  },
];

// const socialLinks = [
//   { icon: <Twitter size={18} />, href: 'https://twitter.com/craftyverse', label: 'Twitter' },
//   { icon: <Linkedin size={18} />, href: 'https://linkedin.com/company/craftyverse', label: 'LinkedIn' },
//   { icon: <Github size={18} />, href: 'https://github.com/craftyverse', label: 'GitHub' },
// ];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo className={styles.logo} />
            <p className={styles.tagline}>
              The learning operating system designed to connect and empower the
              entire educational ecosystem.
            </p>
          </div>
          <nav className={styles.columns} aria-label="Footer navigation">
            {footerLinks.map((col) => (
              <div key={col.heading} className={styles.column}>
                <span className={styles.columnHeading}>{col.heading}</span>
                <ul className={styles.linkList}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 Craftyverse Inc. All rights reserved.
          </p>
          {/* <div className={styles.social}>
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className={styles.socialLink}>
                {s.icon}
              </a>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};
