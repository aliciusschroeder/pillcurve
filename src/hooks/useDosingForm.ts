// src/hooks/useDosingForm.ts

import { useFormState } from './useFormState';
import { usePresetSelection } from './usePresetSelection';
import { addDose, removeDose, updateDose } from '../utils/doseUtils';
import { useState, useEffect, useCallback } from 'react';
import { calculateConcentration } from '../utils/calculateConcentration';
import { PresetOption } from '../types';

export const useDosingForm = () => {
  const presets: PresetOption[] = [
    { id: '1', name: 'Aspirin', halfLife: 7.5, tMax: 1.5 },
    { id: '2', name: 'Wirkstoff B', halfLife: 5, tMax: 2 },
  ];

  const { selectedPreset, handlePresetChange, getSelectedPreset, updateCustomPresetData } = usePresetSelection(presets);
  const { formData, updateFormData } = useFormState({
    tMax: presets[0]!.tMax,
    halfLife: presets[0]!.halfLife,
    startingTime: 1,
    doses: [100],
    times: [0],
  });

  const memoizedGetSelectedPreset = useCallback(getSelectedPreset, []);
  const memoizedUpdateFormData = useCallback(updateFormData, []);

  useEffect(() => {
    const selectedPresetData = memoizedGetSelectedPreset();
    if (selectedPresetData) {
      memoizedUpdateFormData({
        tMax: selectedPresetData.tMax,
        halfLife: selectedPresetData.halfLife,
      });
    }
  }, [selectedPreset, memoizedGetSelectedPreset, memoizedUpdateFormData]);

  const [concentrationData, setConcentrationData] = useState<number[]>([]);

  const calculateConcentrationLocally = () => {
    const { halfLife, tMax, doses, times, startingTime } = formData;
    const concentration = calculateConcentration(halfLife, tMax, doses, times, startingTime);
    setConcentrationData(concentration);
  };

  const handleDoseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = parseInt(name.match(/\d+/)?.[0] ?? '0', 10) - 1;
    updateFormData(updateDose(formData.doses, formData.times, index, parseFloat(value), 'dose'));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = parseInt(name.match(/\d+/)?.[0] ?? '0', 10) - 1;
    updateFormData(updateDose(formData.doses, formData.times, index, parseFloat(value), 'time'));
  };

  const handleAddDose = () => {
    updateFormData(addDose(formData.doses, formData.times));
  };

  const handleRemoveDose = () => {
    updateFormData(removeDose(formData.doses, formData.times));
  };

  const handleStartingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    if (time) {
      const timeParts = time.split(':');
      if (timeParts.length === 2) {
        const hours = parseInt(timeParts[0]!, 10);
        const minutes = parseInt(timeParts[1]!, 10);
        const totalMinutes = hours * 60 + minutes;
        updateFormData({ startingTime: totalMinutes });
      }
    } else {
      updateFormData({ startingTime: -1 });
    }
  };

  const handleHalfLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHalfLife = parseFloat(e.target.value);
    if (selectedPreset === 'custom') {
      updateCustomPresetData({ halfLife: newHalfLife });
    }
    updateFormData({ halfLife: newHalfLife });
  };

  const handleTMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTMax = parseFloat(e.target.value);
    if (selectedPreset === 'custom') {
      updateCustomPresetData({ tMax: newTMax });
    }
    updateFormData({ tMax: newTMax });
  };

  return {
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
  };
};