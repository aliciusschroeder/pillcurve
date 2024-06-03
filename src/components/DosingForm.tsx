// src/components/DosingForm.tsx

import React from 'react';
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
        calculateConcentrationLocally,
        handleHalfLifeChange,
        handleTMaxChange,
    } = useDosingForm();

    const handleCalculateClick = () => {
        calculateConcentrationLocally();
    };



    return (
        <>
            <div className="flex-grow">
                <ChartDisplay
                    concentrationData={concentrationData}
                    startingTime={formData.startingTime}
                    times={formData.times}
                    doses={formData.doses}
                />
            </div>
            <aside className="md:w-96 bg-gray-800 p-6 overflow-auto max-h-[calc(100vh-60px)]">
                <h1 className="text-4xl font-bold text-center mb-6">PillCurve</h1>
                <PresetSelector
                    presets={presets}
                    selectedPreset={selectedPreset}
                    onSelectedPresetChange={handlePresetChange}
                    getSelectedPreset={getSelectedPreset}
                    onHalfLifeChange={handleHalfLifeChange}
                    onTMaxChange={handleTMaxChange}
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