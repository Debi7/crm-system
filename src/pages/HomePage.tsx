import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/comments/commentsSlice';
import { RootState, AppDispatch } from '../store';
import LastComments from '../components/LastComments';
import { Box, Text } from '@chakra-ui/react';

import styles from '../styles.module.css';


const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.comments);
  const status = useSelector((state: RootState) => state.comments.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  return (
    <Box className={styles.home__wrapper}>
      {/* <Heading as="h1" size="lg">{t('home.title')}</Heading> */}
      {status === 'loading' && <Text>{t('home.loading')}</Text>}
      {/* {status === 'succeeded' && ( */}
      <>
        <LastComments comments={comments} />
      </>
      {/* )} */}
      {status === 'failed' && <Text>{t('home.error_loading_comments')}</Text>}
    </Box>
  );
};

export default HomePage;
