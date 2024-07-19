import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '../features/issues/issuesSlice';
import { RootState, AppDispatch } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Issue } from '../features/issues/issuesSlice';

const TasksPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const issues = useSelector((state: RootState) => state.issues.issues);
  const status = useSelector((state: RootState) => state.issues.status);
  const [weeks, setWeeks] = useState(8);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIssues({ status: 'Done' }));
    }
  }, [dispatch, status]);

  const calculateWeekNumber = (date: Date): number => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date.getTime() - startOfYear.getTime() - 11 * 60 * 60 * 1000) / (24 * 60 * 60 * 1000));
    return Math.floor((numberOfDays + 11) / 7) + 1;
  };

  const getWeeklyData = (issues: Issue[]) => {
    const weeksData = Array.from({ length: weeks }, (_, i) => ({
      week: `Week ${i + 1}`,
      profit: 0,
      expenses: 0,
      balance: 0,
    }));

    issues.forEach((issue) => {
      const weekNumber = calculateWeekNumber(new Date(issue.updatedAt));
      if (weekNumber <= weeks) {
        const weekData = weeksData[weekNumber - 1];
        weekData.profit += issue.received_from_client || 0;
        weekData.expenses += issue.send_to_project_manage || 0;
        weekData.balance = weekData.profit - weekData.expenses;
      }
    });

    return weeksData;
  };

  const weeklyData = getWeeklyData(issues);

  return (
    <div>
      <h1>Tasks Page</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <>
          <div>
            <label htmlFor="weeksInput">Number of weeks to display: </label>
            <input
              id="weeksInput"
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              min="1"
              max="52"
            />
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
              <Line type="monotone" dataKey="expenses" stroke="#8884d8" />
              <Line type="monotone" dataKey="balance" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
      {status === 'failed' && <p>Error loading tasks.</p>}
    </div>
  );
};

export default TasksPage;
