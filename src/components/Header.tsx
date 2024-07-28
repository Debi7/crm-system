import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

import styles from '../styles.module.css'

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
  theme: string;
  setTheme: (theme: string) => void;
  weekNumber: number;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, theme, setTheme, weekNumber }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    setLocale(lng);
    i18n.changeLanguage(lng);
  };


  return (
    <header className={styles.header__wrapper}>
      <span className={styles.header__text}>Текущий номер рабочей недели: {weekNumber}</span>
      <div className={styles.button__wrapper}>
        <StyledButton onClick={() => changeLanguage(locale === 'RU' ? 'EN' : 'RU')}>
          {locale === 'RU' ? 'en' : 'ru'}
        </StyledButton>
        <StyledButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'dark' : 'light'}
        </StyledButton>
      </div>
    </header>
  );
};

export default Header;
