// src/components/ChartContainer.tsx

import React from "react";

interface ChartContainerProps {
  children: React.ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return (
    <section className="flex flex-grow items-center justify-center p-6">
      <div className="flex-grow rounded-3xl bg-gray-800 py-8 pr-8 shadow-2xl">
        {children}
      </div>
    </section>
  );
};

export default ChartContainer;
