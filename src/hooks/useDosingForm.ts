// src/hooks/useDosingForm.ts

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useFormState } from './useFormState';
import { usePresetSelection } from './usePresetSelection';
import { addDose, removeDose, updateDose } from '../utils/doseUtils';
import { encodeState, decodeState } from '../utils/urlStateUtils';
import { calculateConcentration } from '../utils/calculateConcentration';
import presets from '../config/presets';

export const useDosingForm = () => {
  const router = useRouter();
  const [concentrationData, setConcentrationData] = useState<number[]>([]);
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);

  const { selectedPreset, handlePresetChange, getSelectedPreset, updateCustomPresetData } = usePresetSelection(presets);

  const { formData, updateFormData } = useFormState({
    selectedPreset: presets[0]!.id,
    tMax: presets[0]!.tMax,
    halfLife: presets[0]!.halfLife,
    startingTime: 1,
    doses: [100],
    times: [0],
  });

  const calculateConcentrationLocally = useCallback(() => {
    const { halfLife, tMax, doses, times, startingTime } = formData;
    const concentration = calculateConcentration(halfLife, tMax, doses, times, startingTime);
    setConcentrationData(concentration);
  }, [formData]);

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
  }, [selectedPreset, getSelectedPreset, updateFormData, calculateConcentrationLocally, initialStateLoaded]);

  useEffect(() => {
    if (router.isReady && !initialStateLoaded) {
      const { query } = router;
      if (query.state && typeof query.state === 'string') {
        const decodedState = decodeState(query.state);
        updateFormData(decodedState);
        handlePresetChange(decodedState.selectedPreset);
        if (decodedState.selectedPreset === 'custom') {
          updateCustomPresetData({
            halfLife: decodedState.halfLife,
            tMax: decodedState.tMax,
          });
        }
        calculateConcentrationLocally();
      }
      setInitialStateLoaded(true);
    }
  }, [router.isReady, router.query, updateFormData, handlePresetChange, updateCustomPresetData, calculateConcentrationLocally]);

  useEffect(() => {
    if (initialStateLoaded) {
      const encodedState = encodeState(formData);
      router.push(`?state=${encodedState}`, undefined, { shallow: true });
    }
  }, [formData, router, initialStateLoaded]);

  const handlePresetChangeAndUpdate = useCallback((presetId: string) => {
    handlePresetChange(presetId);
    const newPresetData = presets.find(preset => preset.id === presetId);
    if (newPresetData) {
      updateFormData({
        tMax: newPresetData.tMax,
        halfLife: newPresetData.halfLife,
        selectedPreset: selectedPreset,
      });
      calculateConcentrationLocally();
    }
  }, [handlePresetChange, updateFormData, calculateConcentrationLocally]);

  const handleDoseChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = parseInt(RegExp(/\d+/).exec(name)?.[0] ?? '0', 10) - 1;
    updateFormData(updateDose(formData.doses, formData.times, index, parseFloat(value), 'dose'));
  }, [formData.doses, formData.times, updateFormData]);

  const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const index = parseInt(RegExp(/\d+/).exec(name)?.[0] ?? '0', 10) - 1;
    updateFormData(updateDose(formData.doses, formData.times, index, parseFloat(value), 'time'));
  }, [formData.doses, formData.times, updateFormData]);

  const handleAddDose = useCallback(() => {
    updateFormData(addDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleRemoveDose = useCallback(() => {
    updateFormData(removeDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleStartingTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes(':')) {
      // Input is in HH:MM format
      const parts = value.split(':');
      const hours = parseInt(parts[0] ?? '', 10);
      const minutes = parseInt(parts[1] ?? '', 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const totalMinutes = hours * 60 + minutes;
        updateFormData({ startingTime: totalMinutes });
      } else {
        updateFormData({ startingTime: -1 }); // Invalid input
      }
    } else {
      // Input is already in minutes
      const startingTime = parseInt(value, 10);
      if (!isNaN(startingTime)) {
        updateFormData({ startingTime });
      } else {
        updateFormData({ startingTime: -1 }); // Invalid input
      }
    }
  }, [updateFormData]);

  const handleHalfLifeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newHalfLife = parseFloat(e.target.value);
    if (selectedPreset === 'custom') {
      updateCustomPresetData({ halfLife: newHalfLife });
    }
    updateFormData({ halfLife: newHalfLife });
  }, [selectedPreset, updateCustomPresetData, updateFormData]);

  const handleTMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTMax = parseFloat(e.target.value);
    if (selectedPreset === 'custom') {
      updateCustomPresetData({ tMax: newTMax });
    }
    updateFormData({ tMax: newTMax });
  }, [selectedPreset, updateCustomPresetData, updateFormData]);

  return {
    presets,
    selectedPreset,
    handlePresetChange: handlePresetChangeAndUpdate,
    getSelectedPreset,
    formData,
    updateFormData,
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