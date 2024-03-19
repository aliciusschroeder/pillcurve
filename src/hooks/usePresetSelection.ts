// src/hooks/usePresetSelection.ts
import { useState } from 'react';
import { PresetOption } from '../types';

// This hook manages the selected preset and provides functions to handle preset changes and retrieve the currently selected preset

export const usePresetSelection = (presets: PresetOption[]) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(presets[0]?.id || '');

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
  };

  const getSelectedPreset = () => {
    return presets.find((preset) => preset.id === selectedPreset);
  };

  return { selectedPreset, handlePresetChange, getSelectedPreset };
};