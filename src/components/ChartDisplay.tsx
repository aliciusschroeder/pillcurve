//src/components/ChartDisplay.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

interface ChartDisplayProps {
  concentrationData: number[];
  startingTime: number;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ concentrationData, startingTime }) => {
  const data = concentrationData.map((concentration, index) => ({
    time: index,
    concentration,
  }));

  const formatXAxis = (tickItem: number) => {
    const time = moment().startOf('day').add(startingTime, 'minutes').add(tickItem, 'minutes');
    const roundedMinutes = Math.round(time.minutes() / 30) * 30;
    const roundedTime = time.clone().minute(roundedMinutes);
    return startingTime === 0 ? roundedTime.format('H:mm') : roundedTime.format('HH:mm');
  };

  return (
    <section className="p-6 flex items-center justify-center flex-grow">
      <div className="bg-gray-800 rounded-3xl shadow-2xl transform transition-all scale-95 hover:scale-100 flex-grow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              interval={29}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip labelFormatter={formatXAxis} />
            <Line type="monotone" dataKey="concentration" stroke="#8884d8" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ChartDisplay;