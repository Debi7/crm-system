import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, DesignersState } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Text, Image, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const DesignerPage: React.FC = () => {
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
      <Text fontSize="xl" fontWeight="bold" mb="4">Designer Page</Text>
      {status === 'loading' && <Text>Loading designers...</Text>}
      {status === 'succeeded' && (
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Avatar</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Completed Tasks</Th>
                <Th>Tasks In Progress</Th>
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
      {status === 'failed' && <Text>Error loading designers: {error}</Text>}
    </Box>
  );
};

export default DesignerPage;
