// src/components/ChartDisplay.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

interface ChartDisplayProps {
  doses: number[];
  times: number[];
  startingTime: number;
  halfLife: number;
  tMax: number;
  onCalculate: () => void;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ doses, times, startingTime, halfLife, tMax, onCalculate }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [concentration, setConcentration] = useState<number[]>([]);

  useEffect(() => {
    const fetchConcentration = async () => {
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ doses, times, startingTime, halfLife, tMax }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConcentration(data.concentration);
      } catch (error) {
        console.error('There was an error fetching concentration:', error);
      }
    };

    fetchConcentration();
  }, [doses, times, startingTime, halfLife, tMax]);

  useEffect(() => {
    Chart.register(...registerables);
    Chart.register(annotationPlugin);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const labels = Array.from({ length: 720 }, (_, i) => i); // 0 to 719

        const chartConfig: ChartConfiguration<ChartType, number[], number> = {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Aktuell wirksame Dosis (mg)',
              data: concentration,
              borderColor: 'blue',
              tension: 0.1,
              borderWidth: 2,
              fill: false
            }]
          },
          options: {
            scales: {
              y: {
                min: Math.round(Math.min(...concentration) * 0.25),
                max: Math.round(Math.max(...concentration) * 1.2)
              }
            }
          }
        };

        chartInstance.current = new Chart(ctx, chartConfig);
      }
    }
  }, [concentration]);

  return (
    <section className="flex-grow p-6 flex items-center justify-center">
      <div className="bg-gray-800 rounded-3xl shadow-2xl transform transition-all scale-100 hover:scale-105">
        <canvas ref={chartRef} className="min-w-full md:min-h-[500px] md:min-w-[500px]"></canvas>
      </div>
    </section>
  );
};

export default ChartDisplay;