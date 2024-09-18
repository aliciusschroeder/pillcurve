//src/components/ChartDisplay.tsx
import React from "react";
import { IntakePoint } from "../types";
import { formatIntakeLabel, formatXAxis } from "../utils/formatters";
import ChartContainer from "./ChartContainer";
import ChartCore from "./ChartCore";

interface ChartDisplayProps {
  concentrationData: number[];
  startingTime: number;
  times: number[];
  doses: number[];
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  concentrationData,
  startingTime,
  times,
  doses,
}) => {
  const data = concentrationData.map((concentration, index) => ({
    time: index,
    concentration,
  }));

  const intakePoints: IntakePoint[] = times.map((time, index) => ({
    time,
    dose: doses[index] || 0,
  }));

  const formatXAxisWithStartingTime = (tickItem: number) =>
    formatXAxis(tickItem, startingTime);
  const formatIntakeLabelWithStartingTime = (intakePoint: IntakePoint) =>
    formatIntakeLabel(intakePoint, startingTime);

  return (
    <ChartContainer>
      <ChartCore
        data={data}
        intakePoints={intakePoints}
        formatXAxis={formatXAxisWithStartingTime}
        formatIntakeLabel={formatIntakeLabelWithStartingTime}
        concentrationData={concentrationData}
        startingTime={startingTime}
      />
    </ChartContainer>
  );
};

export default ChartDisplay;
