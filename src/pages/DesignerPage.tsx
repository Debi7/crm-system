import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, DesignersState } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Heading, Text, Image, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';


const DesignerPage: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { designers, status, error } = useSelector<RootState, DesignersState>(
    (state) => state.designers
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDesigners({ status: 'New', key: 'your_project_key', ordering: '-email', page: 1, limit: 16 }));
    }
  }, [dispatch, status]);

  return (
    <Box>
      <Heading as="h1" size="lg">{t('designer.title')}</Heading>
      {status === 'loading' && <Text>{t('designer.loading_designers')}</Text>}
      {status === 'succeeded' && (
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>{t('avatar')}</Th>
                <Th>{t('name')}</Th>
                <Th>{t('email')}</Th>
                <Th>{t('completed_tasks')}</Th>
                <Th>{t('tasks_in_progress')}</Th>
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
      )}
      {status === 'failed' && <Text>{t('designer.error_loading_designers', { error })}</Text>}
    </Box>
  );
};

export default DesignerPage;
