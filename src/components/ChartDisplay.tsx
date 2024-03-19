// src/components/ChartDisplay.tsx

import React, { useRef, useEffect } from 'react';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { FormData } from '../types';

interface ChartDisplayProps {
    formData: FormData;
    chartData: number[];
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ formData, chartData}) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

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
                            data: chartData,
                            borderColor: 'blue',
                            tension: 0.1,
                            borderWidth: 2,
                            fill: false
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                min: Math.round(Math.min(...chartData) * 0.25),
                                max: Math.round(Math.max(...chartData) * 1.2)
                            }
                        }
                    }
                };
                chartInstance.current = new Chart(ctx, chartConfig);
            }
        }
    }, [chartData]);

    return (
        <section className="flex-grow p-6 flex items-center justify-center">
            <div className="bg-gray-800 rounded-3xl shadow-2xl transform transition-all scale-100 hover:scale-105">
                <canvas ref={chartRef} className="min-w-full md:min-h-[500px] md:min-w-[500px]"></canvas>
            </div>
        </section>
    );
};

export default ChartDisplay;