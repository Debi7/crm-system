// отвечает за рендеринг круговой диаграммы
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { Box, Heading, Text } from '@chakra-ui/react';
import { Box, Text, UnorderedList, ListItem, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';


import { Issue } from '../features/issues/issuesSlice';

import styles from '../styles.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusPieChartProps {
  issues: Issue[];
}

const StatusPieChart: React.FC<StatusPieChartProps> = ({ issues }) => {
  const { t } = useTranslation();

  let data;
  if (issues.length === 0) {
    data = {
      labels: ['No Data'],
      datasets: [
        {
          data: [1],
          backgroundColor: ['#d3d3d3'],
          hoverBackgroundColor: ['#d3d3d3'],
        },
      ],
    };
  } else {
    const statusCounts = issues.reduce((acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    data = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  console.log("Rendering StatusPieChart with data:", data);

  return (
    <Box className={styles.statusPieChart__wrapper}>
      <Box width="100%" height="375px">
        <Pie data={data} />
      </Box>
      {issues.length === 0 && <Text>No issues to display</Text>}
    </Box>
  );
};

export default StatusPieChart;
