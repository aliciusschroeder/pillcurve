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

  /**
   * Higher-order function that returns an event handler for input changes in dose or time fields.
   *
   * This function generalizes the handling of input changes for doses and times.
   * It parses the input value, validates it, extracts the index from the input name,
   * and updates the form data accordingly.
   *
   * @param {"dose" | "time"} type - The type of input field ("dose" or "time").
   * @returns {function} An event handler for the specified input type.
   */
  const handleInputChange = useCallback(
    (type: "dose" | "time") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const parsedValue = parseFloat(value);
      // Ignore invalid or negative values for dose
      if (isNaN(parsedValue) || (type === "dose" && parsedValue < 0)) {
        return;
      }
      // Extract the index from the input field's name (e.g., 'dose1' or 'time1' -> index 0)
      const indexMatch = /\d+/.exec(name);
      const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : -1;
      if (index >= 0) {
        updateFormData(
          updateDose(formData.doses, formData.times, index, parsedValue, type)
        );
      } else {
        console.error(`Invalid index for ${type} change`);
      }
    },
    [formData.doses, formData.times, updateFormData]
  );

  const handleDoseChange = handleInputChange("dose");
  const handleTimeChange = handleInputChange("time");


  /**
   * Adds a new dose and time field to the form.
   */
  const handleAddDose = useCallback(() => {
    updateFormData(addDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleRemoveDose = useCallback(() => {
    updateFormData(removeDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  /**
   * Higher-order function that returns an event handler for changes in preset values (half-life or tMax).
   *
   * This function generalizes the handling of changes for half-life and tMax inputs.
   * It switches to the custom preset if a predefined preset is selected,
   * updates the custom preset data and form data with the new value.
   *
   * @param {"halfLife" | "tMax"} key - The key in the form data to update.
   * @returns {function} An event handler for the specified preset value.
   */
  const handlePresetValueChange = useCallback(
    (key: "halfLife" | "tMax") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      // Switch to custom preset if a predefined preset is selected
      if (selectedPreset !== "custom") {
        handlePresetChange("custom");
      }
      // Update custom preset data and form data
      updateCustomPresetData({ [key]: newValue });
      updateFormData({ [key]: newValue });
    },
    [selectedPreset, handlePresetChange, updateCustomPresetData, updateFormData]
  );

  const handleHalfLifeChange = handlePresetValueChange("halfLife");
  const handleTMaxChange = handlePresetValueChange("tMax");

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
