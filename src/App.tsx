import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import IssuePage from './pages/IssuesPage';
import DesignerPage from './pages/DesignerPage';
import extendedTheme from './styles/themes';

const App: React.FC = () => {
  const [locale, setLocale] = useState('RU');
  const [theme, setTheme] = useState('light');
  const [weekNumber, setWeekNumber] = useState(0);

  useEffect(() => {
    const calculateWeekNumber = () => {
      const now = new Date();
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      const numberOfDays = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.floor((numberOfDays + 11) / 7) + 1;
      setWeekNumber(weekNumber);
    };

    calculateWeekNumber();
  }, []);

  return (
    <ChakraProvider theme={extendedTheme}>
      <div className={`App ${theme}`}>
        <Header
          locale={locale}
          setLocale={setLocale}
          theme={theme}
          setTheme={setTheme}
          weekNumber={weekNumber}
        />
        <main>
          <HomePage />
          <IssuePage />
          <DesignerPage />
        </main>
      </div>
    </ChakraProvider>
  );
};

export default App;
