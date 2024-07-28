import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues, IssuesState } from '../features/issues/issuesSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Text, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
import FinanceChart from '../components/FinanceChart';
import StatusPieChart from '../components/StatusPieChart';


const IssuesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { issues, status, error } = useSelector<RootState, IssuesState>(
    (state) => state.issues
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIssues({ key: 'your_project_key' }));
    }
  }, [dispatch, status]);

  useEffect(() => {
    console.log("Issues:", issues);
    console.log("Status:", status);
    console.log("Error:", error);
  }, [issues, status, error]);

  return (
    <Box>
      <Heading as="h1" size="lg">Issue</Heading>
      {status === 'loading' && <Text>Loading issues...</Text>}
      {status === 'succeeded' && (
        <>
          <FinanceChart issues={issues} />
          <StatusPieChart issues={issues} />
          <UnorderedList>
            {issues.map((issue) => (
              <ListItem key={issue.id} mb="4">
                <Heading as="h3" size="md">{issue.title}</Heading>
                <Text>{issue.description}</Text>
                <Text>Status: {issue.status}</Text>
                <Text>Assigned to: {issue.assignedTo}</Text>
                <Text>Created at: {issue.createdAt}</Text>
                <Text>Updated at: {issue.updatedAt}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      {status === 'failed' && <Text>Error loading issues: {error}</Text>}
    </Box>
  );
};

export default IssuesPage;
