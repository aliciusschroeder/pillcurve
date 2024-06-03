// ./components/ChartContainer.tsx
import React from 'react';

interface ChartContainerProps {
  children: React.ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return (
    <section className="p-6 flex items-center justify-center flex-grow">
      <div className="bg-gray-800 rounded-3xl shadow-2xl flex-grow pr-8 py-8">
        {children}
      </div>
    </section>
  );
};

export default ChartContainer;