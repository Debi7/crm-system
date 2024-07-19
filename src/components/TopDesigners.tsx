import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDesigners, Designer, Task } from '../features/designers/designersSlice';
import { RootState, AppDispatch } from '../store';

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
  const dispatch = useDispatch<AppDispatch>();
  const designers = useSelector((state: RootState) => state.designers.designers); // Используем тип Designer здесь
  const status = useSelector((state: RootState) => state.designers.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDesigners({ limit: 16 }));
    }
  }, [dispatch, status]);

  const sortedDesigners = designers
    .map((designer) => {
      const medianTime = calculateMedianTime(designer.tasks || []);
      return { ...designer, medianTime };
    })
    .sort((a, b) => (a.medianTime || 0) - (b.medianTime || 0))
    .slice(0, 10);

  return (
    <div>
      <h2>Топ 10 дизайнеров</h2>
      {status === 'loading' && <p>Loading designers...</p>}
      {status === 'failed' && <p>Error loading designers.</p>}
      {status === 'succeeded' && (
        <ul>
          {sortedDesigners.map((designer: Designer) => (
            <li key={designer.id}>
              <img src={designer.avatar} alt={`${designer.name}'s avatar`} />
              <div>Name: {designer.name}</div>
              <div>Email: {designer.email}</div>
              <div>Tasks Completed: {designer.tasksCompleted}</div>
              <div>Median Time Spent: {designer.medianTime} hours</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopDesigners;
