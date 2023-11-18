// src/components/PresetSelector.tsx

import React from 'react';
import { PresetOption, FormData } from '../types';

interface PresetSelectorProps {
    presets: PresetOption[];
    selectedPreset: string;
    setSelectedPreset: React.Dispatch<React.SetStateAction<string>>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
    presets,
    selectedPreset,
    setSelectedPreset,
    formData,
    setFormData
}) => {
    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const presetId = event.target.value;
        const preset = presets.find(p => p.id === presetId);
        if (preset) {
            setFormData({
                ...formData,
                halfLife: preset.halfLife,
                tMax: preset.tMax
            });
        }
        setSelectedPreset(presetId);
    };

    const handleHalfLifeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            halfLife: parseFloat(event.target.value)
        });
    };

    const handleTMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            tMax: parseFloat(event.target.value)
        });
    };

    return (
        <section className="rounded-xl border border-gray-700 p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Presets</h2>
            <div className="mb-4">
                <label htmlFor="presetSelector" className="block text-sm font-medium">Wirkstoff Preset:</label>
                <select
                    id="presetSelector"
                    value={selectedPreset}
                    onChange={handlePresetChange}
                    className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                >
                    {presets.map(preset => (
                        <option key={preset.id} value={preset.id}>
                            {preset.name}
                        </option>
                    ))}
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="mb-4 md:mb-0 md:w-1/2">
                    <label htmlFor="halfLife" className="block text-sm font-medium">HWZ (Halbwertszeit):</label>
                    <input
                        id="halfLife"
                        type="number"
                        value={formData.halfLife.toString()}
                        onChange={handleHalfLifeChange}
                        className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                        disabled={selectedPreset !== 'custom'}
                    />
                </div>
                <div className="md:w-1/2">
                    <label htmlFor="tMax" className="block text-sm font-medium">t_Max:</label>
                    <input
                        id="tMax"
                        type="number"
                        value={formData.tMax.toString()}
                        onChange={handleTMaxChange}
                        className="mt-1 bg-gray-700 border-none rounded-lg text-lg py-2 pl-3 w-full"
                        disabled={selectedPreset !== 'custom'}
                    />
                </div>
            </div>
        </section>
    );
};

export default PresetSelector;