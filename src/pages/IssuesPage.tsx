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
          <Heading as="h2" size="md">{t('issues.title')}</Heading>
          {status === 'loading' && <Text>{t('issues.loading_issues')}</Text>}
          <UnorderedList styleType="none" spacing={3}>
            {issues.length > 0 ? (
              issues.map((issue) => (
                <ListItem key={issue.id} mb="4">
                  <Heading as="h3" size="md">{issue.summary}</Heading>
                  <Text>{t('issues.project', { project: issue.project })}</Text>
                  <Text>{t('issues.received_from_client', { profit: issue.received_from_client })}</Text>
                  <Text>{t('issues.send_to_project_manager', { managerExpenses: issue.send_to_project_manager })}</Text>
                  <Text>{t('issues.send_to_account_manager', { accountExpenses: issue.send_to_account_manager })}</Text>
                  <Text>{t('issues.send_to_designer', { designerExpenses: issue.send_to_designer })}</Text>
                  <Text>{t('issues.date_started_by_designer', { startDate: issue.date_started_by_designer || 'N/A' })}</Text>
                  <Text>{t('issues.date_finished_by_designer', { finishDate: issue.date_finished_by_designer || 'N/A' })}</Text>
                  <Text>{t('issues.date_finished', { finishedDate: issue.date_finished || 'N/A' })}</Text>
                </ListItem>
              ))
            ) : (
              <ListItem mb="4">
                <Heading as="h3" size="md">{t('issues.no_issues_available')}</Heading>
              </ListItem>
            )}
          </UnorderedList>
          {status === 'failed' && <Text>{t('issues.error_loading_issues', { error })}</Text>}
        </Box>
        <Box width="30%">
          <StatusPieChart issues={issues} />
        </Box>
        <Box width="35%">
          <FinanceChart issues={issues} />
        </Box>
      </Box>
    </div>
  );
};

export default IssuesPage;
