import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, DesignersState } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Text, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
import styles from '../styles.module.css';


const DesignerPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { designers, status, error } = useSelector<RootState, DesignersState>(
    (state) => state.designers
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDesigners({ key: 'your_project_key' }));
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log("Designers:", designers);
    console.log("Status:", status);
    console.log("Error:", error);
  }, [designers, status, error]);

  return (
    <Box className={styles.designerPage__wrapper}>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      {status === 'succeeded' && designers.length > 0 ? (
        <UnorderedList>
          {designers.map((designer) => (
            <ListItem key={designer.username}>
              <Heading as="h3">{designer.username}</Heading>
              <Text>Email: {designer.email}</Text>
              <Text>Avatar: <img src={designer.avatar} alt={designer.username} /></Text>
              <UnorderedList>
                {designer.issues.map(issue => (
                  <ListItem key={issue.id}>
                    <Text>Issue Key: {issue.key}, Status: {issue.status}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text>No designers available.</Text>
      )}
    </Box>
  );
};

export default DesignerPage;
