import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from '../styles.module.css';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav__wrapper}>
      <Link to="/" className={styles.nav__link}>{t('nav.home')}</Link>
      <Link to="/designer" className={styles.nav__link}>{t('nav.designer')}</Link>
      <Link to="/issues" className={styles.nav__link}>{t('nav.issues')}</Link>
    </nav>
  );
};

export default Navigation;
