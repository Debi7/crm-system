import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Изменено с Switch на Routes

import Header from './components/Header';
import HomePage from './pages/HomePage';
import IssuePage from './pages/IssuesPage';
import DesignerPage from './pages/DesignerPage';
import TopDesigners from './components/TopDesigners';
import StatusPieChart from './components/StatusPieChart';
import FinanceChart from './components/FinanceChart';

// import styled from '@emotion/styled';
import styles from './styles.module.css';
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
        <Router>
          <nav className={styles.nav__wrapper}>
            {/* Создание ссылок для навигации */}
            <Link to="/" className={styles.nav__link}>Home</Link>
            <Link to="/issues" className={styles.nav__link}>Issue</Link>
            <Link to="/designer" className={styles.nav__link}>Designer</Link>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/issues" element={<IssuePage />} />
              <Route path="/designer" element={<DesignerPage />} />
            </Routes>
            <TopDesigners />
            <StatusPieChart issues={[]} />
            <FinanceChart issues={[]} />
          </main>
        </Router>
      </div>
    </ChakraProvider>
  );
};

export default App;
