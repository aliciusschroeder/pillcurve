// src/components/DosingForm.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import PresetSelector from './PresetSelector';
import DoseInput from './DoseInput';
import ChartDisplay from './ChartDisplay';
import { PresetOption } from '../types';
import { useDosingForm } from '../hooks/useDosingForm';
import Footer from './Footer';

const DosingForm: React.FC = () => {
    const {
        presets,
        selectedPreset,
        handlePresetChange,
        getSelectedPreset,
        formData,
        handleDoseChange,
        handleTimeChange,
        handleAddDose,
        handleRemoveDose,
        handleStartingTimeChange,
        submitForm,
    } = useDosingForm();

    const [calculateTrigger, setCalculateTrigger] = useState(false);

    const handleCalculate = () => {
        setCalculateTrigger(!calculateTrigger);
    };


    return (
        <>
            <ChartDisplay
                doses={formData.doses}
                times={formData.times}
                startingTime={formData.startingTime}
                halfLife={formData.halfLife}
                tMax={formData.tMax}
                onCalculate={handleCalculate}
            />
            <aside className="md:w-96 bg-gray-800 p-6">
                <h1 className="text-4xl font-bold text-center mb-6">PillCurve</h1>
                <PresetSelector
                    presets={presets}
                    selectedPreset={selectedPreset}
                    onSelectedPresetChange={handlePresetChange}
                    getSelectedPreset={getSelectedPreset}
                />
                <DoseInput
                    doseCount={formData.doses.length}
                    doses={formData.doses}
                    times={formData.times}
                    onDoseChange={handleDoseChange}
                    onTimeChange={handleTimeChange}
                    onAddDose={handleAddDose}
                    onRemoveDose={handleRemoveDose}
                    onStartingTimeChange={handleStartingTimeChange}
                    onSubmit={submitForm}
                />
            </aside>
        </>
    );
};

export default DosingForm;