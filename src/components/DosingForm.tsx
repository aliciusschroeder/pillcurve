// src/components/DosingForm.tsx

import React, { useCallback } from "react";
import { useDosingForm } from "../hooks/useDosingForm";
import ChartDisplay from "./ChartDisplay";
import DoseInput from "./DoseInput";
import PresetSelector from "./PresetSelector";


const DosingForm: React.FC = () => {
  const {
    presets,
    selectedPreset,
    formData,
    concentrationData,
    startingTimeInput,

    handleStartingTimeChange,
    handleDoseChange,
    handleTimeChange,
    handleAddDose,
    handleRemoveDose,
    handlePresetChange,
    handleHalfLifeChange,
    handleTMaxChange,

    getSelectedPreset,
    calculateConcentrationLocally,
    
    
  } = useDosingForm();

  const handleCalculateClick = useCallback(() => {
    calculateConcentrationLocally();
  }, [calculateConcentrationLocally]);

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
      <aside className="max-h-[calc(100vh-60px)] overflow-auto bg-gray-800 p-6 md:w-96">
        <h1 className="mb-6 text-center text-4xl font-bold">PillCurve</h1>
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
          startingTime={startingTimeInput}
          onStartingTimeChange={handleStartingTimeChange}
          onDoseChange={handleDoseChange}
          onTimeChange={handleTimeChange}
          onAddDose={handleAddDose}
          onRemoveDose={handleRemoveDose}
          onCalculateClick={handleCalculateClick}
        />
      </aside>
    </>
  );
};

export default React.memo(DosingForm);
