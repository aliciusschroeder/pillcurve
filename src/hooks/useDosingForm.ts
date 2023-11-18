// src/hooks/useDosingForm.ts

import { useState } from 'react';
import { PresetOption, FormData } from '../types';

export const useDosingForm = () => {
    const presets: PresetOption[] = [
        { id: '1', name: 'Aspirin', halfLife: 7.5, tMax: 1.5 },
        { id: '2', name: 'Wirkstoff B', halfLife: 5, tMax: 2 },
    ];

    const [selectedPreset, setSelectedPreset] = useState<string>('1');
    const [formData, setFormData] = useState<FormData>({
        tMax: presets[0]!.tMax,
        halfLife: presets[0]!.halfLife,
        startingTime: 1,
        doses: [100],
        times: [0]
    });

    const addDose = () => {
        setFormData({
            ...formData,
            doses: [...formData.doses, 0],
            times: [...formData.times, 0]
        });
    };

    const removeDose = () => {
        if (formData.doses.length > 1) {
            setFormData({
                ...formData,
                doses: formData.doses.slice(0, -1),
                times: formData.times.slice(0, -1)
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const index = parseInt(name.match(/\d+/)?.[0] ?? '0', 10) - 1;

        if (name.startsWith('dose')) {
            const updatedDoses = [...formData.doses];
            updatedDoses[index] = parseFloat(value);
            setFormData({ ...formData, doses: updatedDoses });
        } else if (name.startsWith('time')) {
            const updatedTimes = [...formData.times];
            updatedTimes[index] = parseFloat(value);
            setFormData({ ...formData, times: updatedTimes });
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        if (time) {
            const timeParts = time.split(':');
            if (timeParts.length === 2) {
                const hours = parseInt(timeParts[0]!, 10);
                const minutes = parseInt(timeParts[1]!, 10);
                const totalMinutes = hours * 60 + minutes;
                setFormData({ ...formData, startingTime: totalMinutes });
            }
        }
    };

    const [chartData, setChartData] = useState<number[]>([]);

    const submitForm = async () => {
        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setChartData(data.concentration);
        } catch (error) {
            console.error('There was an error submitting the form:', error);
        }
    };

    return {
        presets,
        selectedPreset,
        setSelectedPreset,
        formData,
        setFormData,
        addDose,
        removeDose,
        handleChange,
        handleTimeChange,
        chartData,
        submitForm,
    };
};