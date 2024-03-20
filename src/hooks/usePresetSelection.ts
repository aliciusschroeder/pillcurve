// src/hooks/usePresetSelection.ts
import { useState } from 'react';
import { PresetOption } from '../types';

export const usePresetSelection = (presets: PresetOption[]) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(presets[0]?.id || '');
  const [customPresetData, setCustomPresetData] = useState<PresetOption>({
    id: 'custom',
    name: 'Custom',
    halfLife: 0,
    tMax: 0,
  });

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
  };

  const getSelectedPreset = () => {
    if (selectedPreset === 'custom') {
      return customPresetData;
    }
    return presets.find((preset) => preset.id === selectedPreset);
  };

  const updateCustomPresetData = (updates: Partial<PresetOption>) => {
    setCustomPresetData((prevData) => ({ ...prevData, ...updates }));
  };

  return { selectedPreset, handlePresetChange, getSelectedPreset, updateCustomPresetData };
};