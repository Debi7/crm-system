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
      dispatch(fetchDesigners({}));
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

        <UnorderedList styleType="none" spacing={2} className={styles.designers__item}>
          {designers.map((designer) => (
            <div className={styles.item}>
              <ListItem key={designer.username}>
                <div className={styles.img__text}>
                  <div className={styles.img}>
                    <img src={designer.avatar} alt={designer.username} width={80} height={80} />
                  </div>
                  <div className={styles.text}>
                    <Heading as="h3">{designer.username}</Heading>
                    <Text>Email: {designer.email}</Text>
                  </div>
                </div>

                <div className={styles.designer__issues}>
                  <UnorderedList styleType="none">
                    {designer.issues.map(issue => (
                      <ListItem key={issue.id}>
                        <Text className={styles.status__issues}>
                          <a>Issue: {issue.key}, Status: {issue.status}</a>
                        </Text>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </div>
              </ListItem>
            </div>
          ))}
        </UnorderedList>
      ) : (
        <Text>No designers available.</Text>
      )
      }
    </Box >
  );
};

export default DesignerPage;
