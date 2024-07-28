// файл отвечает за рендеринг линейной диаграммы
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Heading } from '@chakra-ui/react';
import { Issue } from '../features/issues/issuesSlice';

import styles from '../styles.module.css'

interface FinanceChartProps {
  issues: Issue[];
}

const FinanceChart: React.FC<FinanceChartProps> = ({ issues }) => {
  const getMonthlyData = (issues: Issue[], month: number) => {
    return issues.filter(issue => new Date(issue.updatedAt).getMonth() === month)
      .reduce((acc, issue) => {
        acc.profit += issue.received_from_client || 0;
        acc.expenses += issue.send_to_project_manage || 0;
        acc.balance = acc.profit - acc.expenses;
        return acc;
      }, { month: month + 1, profit: 0, expenses: 0, balance: 0 });
  };

  const previousMonthData = getMonthlyData(issues, new Date().getMonth() - 1);
  const currentMonthData = getMonthlyData(issues, new Date().getMonth());

  const data = [previousMonthData, currentMonthData];

  return (
    <div className={styles.financeChart__wrapper}>
      <Box mb="8">
        <Heading as="h2" size="lg" mb="4">Финансы</Heading>
        <ResponsiveContainer width="50%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#8884d8" name="Прибыль" />
            <Bar dataKey="expenses" fill="#82ca9d" name="Расходы" />
            <Bar dataKey="balance" fill="#ff7300" name="Баланс" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
};

export default FinanceChart;
