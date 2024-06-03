// ./components/ChartCore.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { IntakePoint } from '../types';

interface ChartCoreProps {
  data: { time: number; concentration: number }[];
  intakePoints: IntakePoint[];
  formatXAxis: (tickItem: number) => string;
  formatIntakeLabel: (intakePoint: IntakePoint) => string;
  concentrationData: number[];
}

const ChartCore: React.FC<ChartCoreProps> = ({ data, intakePoints, formatXAxis, formatIntakeLabel, concentrationData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatXAxis} interval={29} tick={{ fontSize: 12 }} />
        <YAxis domain={['auto', (dataMax: number) => dataMax * 1.01]} />
        <Tooltip labelFormatter={formatXAxis} formatter={(value: number) => [Math.round(value), 'Concentration']} contentStyle={{ backgroundColor: '#2D3748', borderRadius: '4px', border: 'none' }} labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }} />
        <Line type="monotone" dataKey="concentration" stroke="#8884d8" strokeWidth={2} dot={false} isAnimationActive={false} />
        {intakePoints.map((intakePoint, index) => (
          <ReferenceDot key={`intake-${index}`} x={intakePoint.time} y={concentrationData[intakePoint.time] || 0} r={6} fill="#63B3ED" stroke="#FFFFFF" strokeWidth={2}>
            <Label value={formatIntakeLabel(intakePoint)} position="top" fill="#FFFFFF" fontSize={12} />
          </ReferenceDot>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartCore;