import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../features/comments/commentsSlice';
import { RootState, AppDispatch } from '../store';
import LastComments from '../components/LastComments';
import TopDesigners from '../components/TopDesigners';
import { Box, Text, Heading } from '@chakra-ui/react';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector((state: RootState) => state.comments.comments);
  const status = useSelector((state: RootState) => state.comments.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments());
    }
  }, [dispatch, status]);

  return (
    <Box>
      <Heading as="h1" size="lg">Home</Heading>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'succeeded' && (
        <>
          <LastComments comments={comments} />
          <TopDesigners />
        </>
      )}
      {status === 'failed' && <Text>Error loading comments.</Text>}
    </Box>
  );
};

export default HomePage;
