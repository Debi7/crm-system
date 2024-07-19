// src/components/StatusPieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box, Heading } from '@chakra-ui/react';
import { Issue } from '../features/issues/issuesSlice';

interface StatusPieChartProps {
  issues: Issue[];
}

const StatusPieChart: React.FC<StatusPieChartProps> = ({ issues }) => {
  const statusCounts = issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <Box mb="8">
      <Heading as="h2" size="lg" mb="4">Статусы задач</Heading>
      <Pie data={data} />
    </Box>
  );
};

export default StatusPieChart;
