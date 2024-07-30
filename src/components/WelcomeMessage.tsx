import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Heading } from '@chakra-ui/react';
import styles from '../styles.module.css';


const WelcomeMessage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box className={styles.welcomeText}>
      <Heading as="h1" size="lg">{t('welcome')}</Heading>
    </Box>
  );
};

export default WelcomeMessage;
