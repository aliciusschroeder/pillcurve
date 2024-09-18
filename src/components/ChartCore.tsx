// src/components/ChartCore.tsx

import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IntakePoint } from "../types";

interface ChartCoreProps {
  data: { time: number; concentration: number }[]; // The chart data with time and concentration values
  intakePoints: IntakePoint[]; // Points where the user took an intake, showing on the chart
  formatXAxis: (tickItem: number) => string; // Function to format the X-axis ticks (time)
  formatIntakeLabel: (intakePoint: IntakePoint) => string; // Function to format labels for intake points
  concentrationData: number[]; // Array of concentration values for the intake points
  startingTime: number; // The initial time from which the chart should start
}

/**
 * ChartCore component renders the main chart with custom X-axis ticks,
 * intake points, and concentration data.
 *
 * @param {ChartCoreProps} props - The props for the component.
 * @returns {React.ReactElement} - The LineChart with the given data.
 */
const ChartCore: React.FC<ChartCoreProps> = ({
  data,
  intakePoints,
  formatXAxis,
  formatIntakeLabel,
  concentrationData,
  startingTime,
}) => {
  // Calculate the minimum and maximum time values from the data
  const minTime = data[0]?.time ?? 0; // Default to 0 if data is unavailable
  const maxTime = data[data.length - 1]?.time ?? 0; // Default to 0 if data is unavailable

  // Generate an array of ticks for the X-axis at every 30 minutes
  const ticks: number[] = [];
  const startTime = startingTime + minTime; // Adjusting the starting time
  const endTime = startingTime + maxTime; // Adjusting the ending time
  const tickInterval = 30; // Tick interval in minutes (every 30 minutes)

  // Calculate the first tick time, rounding to the nearest 30 minutes
  let tickTime = Math.ceil(startTime / tickInterval) * tickInterval;

  // Loop through and generate tick values until the end time
  while (tickTime <= endTime) {
    ticks.push(tickTime - startingTime); // Store ticks relative to the starting time
    tickTime += tickInterval; // Increment by the tick interval
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* LineChart component from recharts to display the graph */}
      <LineChart data={data}>
        {/* Display grid lines on the chart */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* XAxis displays the time ticks, formatted using the provided function */}
        <XAxis
          dataKey="time"
          tickFormatter={formatXAxis}
          ticks={ticks} // Custom ticks at 30-minute intervals
          tick={{ fontSize: 12 }} // Customize tick label font size
        />

        {/* YAxis automatically adjusts to fit the range of data */}
        <YAxis domain={["auto", (dataMax: number) => dataMax * 1.01]} />

        {/* Tooltip provides details when hovering over data points */}
        <Tooltip
          labelFormatter={formatXAxis} // Format the label (time) in the tooltip
          formatter={(value: number) => [Math.round(value), "Concentration"]} // Round the value displayed
          contentStyle={{
            backgroundColor: "#2D3748", // Custom background color for the tooltip
            borderRadius: "4px", // Rounded corners for the tooltip
            border: "none", // Remove border
          }}
          labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }} // Custom label style
        />

        {/* Line component displays the main concentration data as a line chart */}
        <Line
          type="monotone" // Ensure a smooth, monotonic curve
          dataKey="concentration" // Use the "concentration" field from data
          stroke="#8884d8" // Set the color of the line
          strokeWidth={2} // Set line width
          dot={false} // Disable dots on the line
          isAnimationActive={false} // Disable animation for performance
        />

        {/* Map through intakePoints and display them on the chart as reference dots */}
        {intakePoints.map((intakePoint, index) => (
          <ReferenceDot
            key={`intake-${index}`} // Unique key for each intake point
            x={intakePoint.time} // X position for the intake point (time)
            y={concentrationData[intakePoint.time] ?? 0} // Y position for the intake point (concentration)
            r={6} // Radius of the dot
            fill="#63B3ED" // Fill color of the dot
            stroke="#FFFFFF" // Border color for the dot
            strokeWidth={2} // Border width for the dot
          >
            {/* Label for the intake point */}
            <Label
              value={formatIntakeLabel(intakePoint)} // Use the provided function to format the intake label
              position="top" // Position the label above the dot
              fill="#FFFFFF" // Label color
              fontSize={12} // Font size for the label
            />
          </ReferenceDot>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartCore;
