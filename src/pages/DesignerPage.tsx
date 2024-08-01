import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, DesignersState } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Heading, Text, Image, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import TopDesigners from '../components/TopDesigners';
import styles from '../styles.module.css';


const DesignerPage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { designers, status } = useSelector<RootState, DesignersState>(
    (state) => state.designers
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDesigners({ status: 'New', key: 'your_project_key', ordering: '-email', page: 1, limit: 16 }));
    }
  }, [dispatch, status]);

  return (
    <Box className={styles.designer__wrapper}>
      <TopDesigners />
      {status === 'loading' && <Text>{t('designer.loading_designers')}</Text>}
      {/* {status === 'succeeded' && ( */}
      <Box overflowX="auto">

        <Table variant="striped" colorScheme="teal" className={styles.tableDesigner__wrapper}>
          <Thead>
            <Tr>
              <Th>{t('tableDesigners.avatar')}</Th>
              <Th>{t('tableDesigners.name')}</Th>
              <Th>{t('tableDesigners.email')}</Th>
              <Th>{t('tableDesigners.completed_tasks')}</Th>
              <Th>{t('tableDesigners.tasks_in_progress')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {designers.map((designer) => (
              <Tr key={designer.id}>
                <Td><Image src={designer.avatar} alt="avatar" boxSize="50px" borderRadius="full" /></Td>
                <Td>{designer.name}</Td>
                <Td>{designer.email}</Td>
                <Td>{designer.tasksCompleted}</Td>
                <Td>{designer.tasksInProgress}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {/* )} */}
      {status === 'failed' && <Text>{t('designer.error_loading_designers')}</Text>}
    </Box>
  );
};

export default DesignerPage;
