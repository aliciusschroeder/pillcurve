// src/components/DosingForm.tsx

import React, { useState } from 'react';
import PresetSelector from './PresetSelector';
import DoseInput from './DoseInput';
import ChartDisplay from './ChartDisplay';
import { useDosingForm } from '../hooks/useDosingForm';

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
        concentrationData,
        setConcentrationData,
        calculateConcentrationLocally,
    } = useDosingForm();

    const handleCalculateClick = () => {
        calculateConcentrationLocally();
      };
    


    return (
        <>
            <ChartDisplay
                doses={formData.doses}
                times={formData.times}
                startingTime={formData.startingTime}
                halfLife={formData.halfLife}
                tMax={formData.tMax}
                concentrationData={concentrationData}
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
                    onCalculateClick={handleCalculateClick}
                />
            </aside>
        </>
    );
};

export default DosingForm;