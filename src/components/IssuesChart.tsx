import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { week: 'Week 1', profit: 4000, expense: 2400, balance: 1600 },
  { week: 'Week 2', profit: 3000, expense: 1398, balance: 1602 },
  // more data...
];

const IssuesChart: React.FC = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="profit" stroke="#8884d8" />
      <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
      <Line type="monotone" dataKey="balance" stroke="#ff7300" />
    </LineChart>
  );
};

export default IssuesChart;
