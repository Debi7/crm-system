import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, Designer, Task } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';
import styles from '../styles.module.css';

interface DesignerWithMedianTime extends Designer {
  medianTime?: number;
  date_finished?: string | null;
}

const calculateMedian = (times: number[]): number => {
  if (times.length === 0) return 0;
  times.sort((a, b) => a - b);
  const mid = Math.floor(times.length / 2);
  return times.length % 2 !== 0 ? times[mid] : (times[mid - 1] + times[mid]) / 2;
};

const calculateMedianTime = (tasks: Task[] = []): number => {
  const times = tasks.map(task => task.timeSpent);
  return calculateMedian(times);
};

const TopDesigners: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const designers = useSelector((state: RootState) => state.designers.designers);
  const status = useSelector((state: RootState) => state.designers.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDesigners({ limit: 16 }));
    }
  }, [dispatch, status]);

  const sortedDesignersWithMedian: DesignerWithMedianTime[] = designers
    .map((designer: Designer) => {
      const tasks: Task[] = designer.issues.map(issue => {
        const startDate = issue.date_started_by_designer ? new Date(issue.date_started_by_designer).getTime() : null;
        const finishDate = issue.date_finished ? new Date(issue.date_finished).getTime() : null;
        const timeSpent = startDate && finishDate ? (finishDate - startDate) / 3600000 : 0;
        return { timeSpent };
      });

      const medianTime = calculateMedianTime(tasks);
      const latestIssue = designer.issues.length > 0 ? designer.issues[designer.issues.length - 1] : null;
      const dateFinished = latestIssue ? latestIssue.date_finished : null;

      return {
        ...designer,
        medianTime,
        date_finished: dateFinished
      };
    })
    .sort((a, b) => (a.medianTime || 0) - (b.medianTime || 0))
    .slice(0, 10);

  return (
    <>
      <h2 className={styles.topDesigners__heading}>{t('topDesigners.title')}</h2>
      <div className={styles.topDesigners__wrapper}>
        {status === 'loading' && <p>Loading designers...</p>}
        {status === 'succeeded' && (
          <ul>
            {sortedDesignersWithMedian.map((designer: DesignerWithMedianTime) => {
              console.log('Designer Username:', designer.username);
              return (
                <li key={designer.username}>
                  <img src={designer.avatar} alt={`${designer.username}'s avatar`} />
                  <div>Name: {designer.username}</div>
                  <div>Email: {designer.email}</div>
                  <div>Latest Issue Finished Date: {designer.date_finished || 'N/A'}</div>
                  <div>Median Time Spent: {designer.medianTime ? `${designer.medianTime} hours` : 'N/A'}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default TopDesigners;
