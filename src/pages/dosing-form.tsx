// pages/dosing-form.tsx

import Head from "next/head";
import React, { useState } from 'react';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { FaPlus, FaMinus } from 'react-icons/fa';



Chart.register(...registerables);
Chart.register(annotationPlugin);

import { useRef, useEffect } from 'react';


const DosingForm = () => {

    type PresetOption = {
        id: string;
        name: string;
        halfLife: number;
        tMax: number;
    };

    const presets: PresetOption[] = [
        { id: '1', name: 'Aspirin', halfLife: 7.5, tMax: 1.5 },
        { id: '2', name: 'Wirkstoff B', halfLife: 5, tMax: 2 },
        // Weitere Presets ...
        // Dynamisch geladene Presets können hier oder durch einen API-Aufruf hinzugefügt werden
    ];

    const [selectedPreset, setSelectedPreset] = useState<string>('1');

    const [chart, setChart] = useState<Chart | null>(null);
    const [doseCount, setDoseCount] = useState(1);
    const [formData, setFormData] = useState<{
        tMax: number;
        halfLife: Number;
        startingTime: number;
        doses: number[];
        times: number[];
    }>({
        tMax: presets[0]!.tMax,
        halfLife: presets[0]!.halfLife,
        startingTime: 1,
        doses: [100],
        times: [0]
    });


    const addDose = () => {
        setDoseCount(doseCount + 1);
        setFormData({
            ...formData,
            doses: [...formData.doses, 0],
            times: [...formData.times, 0]
        });
    };

    const removeDose = () => {
        if (doseCount > 1)
            setDoseCount(doseCount - 1);
        setFormData({
            ...formData,
            doses: [...formData.doses, 0],
            times: [...formData.times, 0]
        });
    };

    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const presetId = event.target.value;
        const preset = presets.find(p => p.id === presetId);

        // Werte des ausgewählten Presets setzen
        if (preset) {
            setFormData({
                ...formData,
                halfLife: preset.halfLife,
                tMax: preset.tMax
            })
        }

        setSelectedPreset(presetId);
    };

    const handleHalfLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            halfLife: parseInt(e.target.value)
        })
        setSelectedPreset('custom');
    };

    const handleTMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            tMax: parseInt(e.target.value)
        })
        setSelectedPreset('custom');
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        if (time) {
            const timeParts = time.split(':');
            if (timeParts.length === 2 && timeParts[0] !== undefined
                && timeParts[1] !== undefined) {
                const hours = parseInt(timeParts[0], 10);
                const minutes = parseInt(timeParts[1], 10);
                if (!isNaN(hours) && hours >= 0 && hours < 24
                    && !isNaN(minutes) && minutes >= 0 && minutes < 60) {
                    const totalMinutes = hours * 60 + minutes;
                    setFormData({ ...formData, startingTime: totalMinutes });
                }
            }
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const index = parseInt(name.match(/\d+/)?.[0] ?? '0') - 1;

        if (name.startsWith('dose')) {
            const updatedDoses = [...formData.doses];
            updatedDoses[index] = parseFloat(value);
            setFormData({ ...formData, doses: updatedDoses });
        } else if (name.startsWith('time')) {
            const updatedTimes = [...formData.times];
            updatedTimes[index] = parseFloat(value);
            setFormData({ ...formData, times: updatedTimes });
        } else {
            setFormData({ ...formData, [name]: parseFloat(value) });
        }
    };

    const chartRef = useRef<HTMLCanvasElement>(null);

    const submitForm = async () => {
        const response = await fetch('/api/calculate', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx && Array.isArray(data.concentration)) { // Ensure ctx is not null and data is an array

                if (chart) {
                    chart.destroy();
                }

                const chartConfig: ChartConfiguration<ChartType, number[], number> = {
                    type: 'line',
                    data: {
                        labels: Array.from({ length: 720 }, (_, i) => i), // 0 to 719
                        datasets: [{
                            label: 'Aktuell wirksame Dosis (mg)',
                            data: data.concentration,
                            borderColor: 'blue',
                            borderWidth: 2,
                            fill: false
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                min: 25, // Minimum y-axis value
                                max: Math.max(...data.concentration) * 1.2 // Adjust based on your data
                            }
                        },
                        plugins: {
                            annotation: {
                                annotations: formData.times.map((time, index) => ({
                                    type: 'line',
                                    yMin: formData.doses[index],
                                    yMax: formData.doses[index],
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    label: {
                                        content: `${time}\n${formData.doses[index]} mg`,
                                        enabled: true,
                                        position: 'start'
                                    }
                                }))
                            }
                        }
                    }
                }

                const newChart = new Chart(ctx, chartConfig);
                setChart(newChart);
            } else {
                console.log("Fehler");
            }
        }
    };


    return (
        <>
            <Head>
                <title>PillCurve</title>
                <meta name="description" content="Handy tool to calculate remaining pill effects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 flex overflow-auto flex-col md:flex-row bg-gray-900 text-gray-100">
                    <section className="flex-grow p-6 flex items-center justify-center">
                    
                        <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 hover:scale-105">
                            <canvas ref={chartRef} className="min-w-full md:min-h-[500px] md:min-w-[500px]"></canvas>
                        </div>
                    </section>
                    <aside className="md:w-96 bg-gray-800 p-6">
                    <h1 className="text-4xl font-bold text-center mb-6 center">PillCurve</h1>
                        <section className="rounded-xl border border-gray-700 p-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Presets</h2>
                            <form className="mb-8">
                                <div className="mb-4">
                                    <label htmlFor="presetSelector" className="block text-sm font-medium">Wirkstoff Preset:</label>
                                    <select
                                        id="presetSelector"
                                        value={selectedPreset}
                                        onChange={handlePresetChange}
                                        className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                                    >
                                        {presets.map(preset => (
                                            <option key={preset.id} value={preset.id}>
                                                {preset.name}
                                            </option>
                                        ))}
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="mb-4 md:mb-0 md:w-1/2">
                                        <label htmlFor="halfLife" className="block text-sm font-medium">HWZ (Halbwertszeit):</label>
                                        <input
                                            id="halfLife"
                                            type="number"
                                            value={formData.halfLife.toString()}
                                            onChange={handleHalfLifeChange}
                                            className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                                        />
                                    </div>
                                    <div className="md:w-1/2">
                                        <label htmlFor="tMax" className="block text-sm font-medium">t_Max:</label>
                                        <input
                                            id="tMax"
                                            type="number"
                                            value={formData.tMax.toString()}
                                            onChange={handleTMaxChange}
                                            className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                                        />
                                    </div>
                                </div>
                            </form>
                        </section>
                        <section className="rounded-xl border border-gray-700 p-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">Dosierung</h2>
                            <form id="dosingForm" method="post" onSubmit={e => e.preventDefault()} className="space-y-4">
                                <div id="doses" className="max-h-80 overflow-auto">
                                    {Array.from({ length: doseCount }, (_, index) => (
                                        <div className="flex flex-col md:flex-row gap-4 mb-2" key={index}>
                                            <div className="md:w-1/2">
                                                <label className="block text-sm font-medium">Dosis {index + 1} (mg):</label>
                                                <input
                                                    name={`dose${index + 1}`}
                                                    type="number"
                                                    className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                                    onChange={handleChange}
                                                    defaultValue="100"
                                                />
                                            </div>
                                            {index === 0 ?
                                                <div className="md:w-1/2">
                                                    <label className="block text-sm font-medium md:w-1/2">Beginn:</label>
                                                    <input
                                                        name="starting_time_picker"
                                                        type="time"
                                                        className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                                        onChange={handleTimeChange}
                                                    />
                                                </div>
                                                :
                                                <div className="md:w-1/2">
                                                    <label className="block text-sm font-medium">Zeit {index + 1} (Min):</label>
                                                    <input
                                                        name={`time${index + 1}`}
                                                        type="number"
                                                        className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        type="button"
                                        onClick={addDose}
                                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        <FaPlus className="mr-2" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeDose}
                                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"

                                    >
                                        <FaMinus className="mr-2" />
                                    </button>
                                    <input
                                        type="submit"
                                        value="Calculate"
                                        onClick={submitForm}
                                        className="cursor-pointer px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    />
                                </div>
                            </form>
                        </section>
                    </aside>
                </main>
                <footer className="bg-gray-700 text-gray-100 p-4 border-t border-gray-600">
    <div className="flex flex-col items-center justify-center">
        <label>Copyright 2023 by Alicius Schröder</label>
        {/* Add other elements like Contribution Link and Language Switch here, style them similarly */}
    </div>
</footer>



            </div>
        </>
    );
};

export default DosingForm;
