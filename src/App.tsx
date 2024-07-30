import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { lightTheme, darkTheme } from './styles/themes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import IssuePage from './pages/IssuesPage';
import DesignerPage from './pages/DesignerPage';
import TopDesigners from './components/TopDesigners';
import StatusPieChart from './components/StatusPieChart';
import FinanceChart from './components/FinanceChart';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [locale, setLocale] = useState('RU');
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <ChakraProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div className={`App ${isDarkMode}`}>
        <Header
          locale={locale}
          setLocale={setLocale}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          weekNumber={weekNumber}
        />
        <Router>
          <Navigation />
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
