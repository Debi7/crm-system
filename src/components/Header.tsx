import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@chakra-ui/react';

interface HeaderProps {
  locale: string;
  setLocale: (locale: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  weekNumber: number;
}

const Header: React.FC<HeaderProps> = ({ locale, setLocale, theme, setTheme, weekNumber }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    setLocale(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <Button onClick={() => changeLanguage(locale === 'RU' ? 'EN' : 'RU')}>{t('header.languageSwitch')} {locale}</Button>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{t('header.toggleTheme')} {theme}</Button>
      <span>Текущий номер рабочей недели: {weekNumber}</span>
    </header>
  );
};

export default Header;
