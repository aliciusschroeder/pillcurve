//src/components/ChartDisplay.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import moment from 'moment';

interface ChartDisplayProps {
  concentrationData: number[];
  startingTime: number;
  times: number[];
  doses: number[];
}

interface IntakePoint {
  time: number;
  dose: number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ concentrationData, startingTime, times, doses }) => {
  const data = concentrationData.map((concentration, index) => ({
    time: index,
    concentration,
  }));

  const intakePoints: IntakePoint[] = times.map((time, index) => ({
    time,
    dose: doses[index] || 0,
  }));

  const formatIntakeLabel = (intakePoint: IntakePoint): string => {
    const { time, dose } = intakePoint;
    if (dose === 0) {
      return '';
    }
    return startingTime === 1 || startingTime === -1
      ? `${dose} mg after ${time} min`
      : `${dose} mg at ${getTime(time)}`;
  };

  const getTime = (tickItem: number): string => {
    const time = moment().startOf('day').add(startingTime, 'minutes').add(tickItem, 'minutes');
    return time.format('HH:mm');
  }

  const formatXAxis = (tickItem: number): string => {
    const time = moment().startOf('day').add(startingTime, 'minutes').add(tickItem, 'minutes');
    const roundedMinutes = Math.round(time.minutes() / 30) * 30;
    const roundedTime = time.clone().minute(roundedMinutes);
    return startingTime === 0 ? roundedTime.format('H:mm') : roundedTime.format('HH:mm');
  };

  return (
    <section className="p-6 flex items-center justify-center flex-grow">
      <div className="bg-gray-800 rounded-3xl shadow-2xl transform transition-all scale-95 hover:scale-100 flex-grow pr-8 py-8">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              interval={29}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={['auto', (dataMax: number) => (dataMax * 1.01)]} />
            <Tooltip
              labelFormatter={formatXAxis}
              formatter={(value: number) => [Math.round(value), 'Concentration']}
              contentStyle={{ backgroundColor: '#2D3748', borderRadius: '4px', border: 'none' }}
              labelStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
            />
            <Line type="monotone" dataKey="concentration" stroke="#8884d8" strokeWidth={2} dot={false} isAnimationActive={false} />
            {intakePoints.map((intakePoint, index) => (
              <ReferenceDot
                key={`intake-${index}`}
                x={intakePoint.time}
                y={concentrationData[intakePoint.time] || 0}
                r={6}
                fill="#63B3ED"
                stroke="#FFFFFF"
                strokeWidth={2}>
                <Label value={formatIntakeLabel(intakePoint)} position="top" fill="#FFFFFF" fontSize={12} />
              </ReferenceDot>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ChartDisplay;
