import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
import WelcomeMessage from '../components/WelcomeMessage';

import styled from '@emotion/styled';
import styles from '../styles.module.css';

const StyledButton = styled(Button)`
  width: 50px;
  background-color: brown;
  border-radius: 5px;
  cursor: pointer;
  color: white;
`;

interface HeaderProps {
  locale: string;
  setLocale: (locale: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  weekNumber: number;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, isDarkMode, setIsDarkMode, weekNumber }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    setLocale(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <WelcomeMessage />
      <header className={styles.header__wrapper}>
        <span className={styles.header__text}>{t('current_week_number', { weekNumber })}</span>
        <div className={styles.button__wrapper}>
          <StyledButton onClick={() => changeLanguage(locale === 'ru' ? 'en' : 'ru')}>
            {locale === 'ru' ? 'en' : 'ru'}
          </StyledButton>
          <StyledButton onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? 'Light' : 'Dark'}
          </StyledButton>
        </div>
      </header>
    </>

  );
};

export default Header;
