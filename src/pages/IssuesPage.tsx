import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues, IssuesState } from '../features/issues/issuesSlice';
import { RootState, AppDispatch } from '../store';
import { Box, Text, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
import FinanceChart from '../components/FinanceChart';
import StatusPieChart from '../components/StatusPieChart';

import styles from '../styles.module.css';

const IssuesPage: React.FC = () => {
  const { t } = useTranslation();

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
    <div className={styles.issuesPage__wrapper}>
      <Box className={styles.chart__wrapper} display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column" width="30%" height="400px" justifyContent="space-between">
          <Heading as="h2" size="md">Статусы задач</Heading>
          {status === 'loading' && <Text>{t('issues.loading_issues')}</Text>}
          <UnorderedList styleType="none" spacing={3}>
            {issues.length > 0 ? (
              issues.map((issue) => (
                <ListItem key={issue.id} mb="4">
                  <Heading as="h3" size="md">{issue.title}</Heading>
                  <Text>{issue.description}</Text>
                  <Text>{t('issues.status', { status: issue.status })}</Text>
                  <Text>{t('issues.assigned_to', { assignedTo: issue.assignedTo })}</Text>
                  <Text>{t('issues.created_at', { createdAt: issue.createdAt })}</Text>
                  <Text>{t('issues.updated_at', { updatedAt: issue.updatedAt })}</Text>
                </ListItem>
              ))
            ) : (
              <ListItem mb="4">
                <Heading as="h3" size="md">{t('issues.no_issues_available')}</Heading>
                <Text>{t('issues.status', { status: 'N/A' })}</Text>
                <Text>{t('issues.assigned_to', { assignedTo: 'N/A' })}</Text>
                <Text>{t('issues.created_at', { createdAt: 'N/A' })}</Text>
                <Text>{t('issues.updated_at', { updatedAt: 'N/A' })}</Text>
              </ListItem>
            )}
          </UnorderedList>
          {status === 'failed' && <Text>{t('issues.error_loading_issues', { error })}</Text>}
        </Box>
        <Box width="30%"> {/* Изменено */}
          <StatusPieChart issues={issues} />
        </Box>
        <Box width="35%"> {/* Изменено */}
          <FinanceChart issues={issues} />
        </Box>
      </Box>
    </div>
  );
};

export default IssuesPage;
