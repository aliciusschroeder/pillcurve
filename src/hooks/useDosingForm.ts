// src/hooks/useDosingForm.ts

import { useCallback, useEffect } from "react";
import presets from "../config/presets";
import { addDose, removeDose, updateDose } from "../utils/doseUtils";
import { useConcentrationData } from "./useConcentrationData";
import { useFormState } from "./useFormState";
import { usePresetSelection } from "./usePresetSelection";
import { useStartingTimeInput } from "./useStartingTimeInput";
import { useUrlState } from "./useUrlState";

export const useDosingForm = () => {
  const { formData, updateFormData } = useFormState({
    selectedPreset: presets[0]!.id,
    tMax: presets[0]!.tMax,
    halfLife: presets[0]!.halfLife,
    startingTime: 1,
    doses: [100],
    times: [0],
  });

  const {
    selectedPreset,
    handlePresetChange,
    getSelectedPreset,
    updateCustomPresetData,
  } = usePresetSelection(presets);

  const { concentrationData, calculateConcentrationLocally } =
    useConcentrationData(formData);

  const { initialStateLoaded } = useUrlState(
    formData,
    updateFormData,
    handlePresetChange,
    updateCustomPresetData,
    calculateConcentrationLocally
  );

  const { startingTimeInput, handleStartingTimeChange } = useStartingTimeInput(
    formData.startingTime,
    updateFormData
  );

  useEffect(() => {
    const selectedPresetData = getSelectedPreset();
    if (selectedPresetData && initialStateLoaded) {
      updateFormData({
        tMax: selectedPresetData.tMax,
        halfLife: selectedPresetData.halfLife,
        selectedPreset: selectedPreset,
      });
      calculateConcentrationLocally();
    }
  }, [
    selectedPreset,
    getSelectedPreset,
    updateFormData,
    calculateConcentrationLocally,
    initialStateLoaded,
  ]);

  const handlePresetChangeAndUpdate = useCallback(
    (presetId: string) => {
      handlePresetChange(presetId);
      const newPresetData = presets.find((preset) => preset.id === presetId);
      if (newPresetData) {
        updateFormData({
          tMax: newPresetData.tMax,
          halfLife: newPresetData.halfLife,
          selectedPreset: presetId,
        });
        calculateConcentrationLocally();
      }
    },
    [handlePresetChange, updateFormData, calculateConcentrationLocally]
  );

  const handleDoseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const doseValue = parseFloat(value);
      if (isNaN(doseValue) || doseValue < 0) {
        return;
      }
      const indexMatch = /\d+/.exec(name);
      const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : -1;
      if (index >= 0) {
        updateFormData(
          updateDose(
            formData.doses,
            formData.times,
            index,
            doseValue,
            "dose"
          )
        );
      } else {
        console.error("Invalid index for dose change");
      }
    },
    [formData.doses, formData.times, updateFormData]
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const indexMatch = /\d+/.exec(name);
      const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : -1;
      if (index >= 0) {
        updateFormData(
          updateDose(
            formData.doses,
            formData.times,
            index,
            parseFloat(value),
            "time"
          )
        );
      } else {
        console.error("Invalid index for time change");
      }
    },
    [formData.doses, formData.times, updateFormData]
  );

  const handleAddDose = useCallback(() => {
    updateFormData(addDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleRemoveDose = useCallback(() => {
    updateFormData(removeDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleHalfLifeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHalfLife = parseFloat(e.target.value);
      if (selectedPreset !== "custom") {
        handlePresetChange("custom");
      }
      updateCustomPresetData({ halfLife: newHalfLife });
      updateFormData({ halfLife: newHalfLife });
    },
    [selectedPreset, handlePresetChange, updateCustomPresetData, updateFormData]
  );

  const handleTMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTMax = parseFloat(e.target.value);
      if (selectedPreset !== "custom") {
        handlePresetChange("custom");
      }
      updateCustomPresetData({ tMax: newTMax });
      updateFormData({ tMax: newTMax });
    },
    [selectedPreset, handlePresetChange, updateCustomPresetData, updateFormData]
  );

  return {
    // Data
    presets,
    selectedPreset,
    formData,
    concentrationData,
    startingTimeInput,

    // Event-Handler
    handleStartingTimeChange,
    handleDoseChange,
    handleTimeChange,
    handleAddDose,
    handleRemoveDose,
    handlePresetChange: handlePresetChangeAndUpdate,
    handleHalfLifeChange,
    handleTMaxChange,

    // Utilities
    getSelectedPreset,
    calculateConcentrationLocally,
  };
};
