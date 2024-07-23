import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ColorData = {
  name: string;
  percentage: number;
};

interface ColorChartProps {
  colors: ColorData[];
}

const ColorChart: React.FC<ColorChartProps> = ({ colors }) => {
  // Prepara os dados para o gráfico
  const data = colors.map(color => ({
    name: color.name,
    value: color.percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColorChart;
