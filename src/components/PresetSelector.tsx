// src/components/PresetSelector.tsx

import React from 'react';
import { PresetOption, FormData } from '../types';
import styles from './Common.module.css';


interface PresetSelectorProps {
    presets: PresetOption[];
    selectedPreset: string;
    onSelectedPresetChange: (presetId: string) => void;
    getSelectedPreset: () => PresetOption | undefined;
  }

const PresetSelector: React.FC<PresetSelectorProps> = ({
    presets,
    selectedPreset,
    onSelectedPresetChange,
    getSelectedPreset
}) => {
    const selectedPresetData = getSelectedPreset();

    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedPresetChange(event.target.value);
      };

    return (
        <section className={styles.formSection}>
            <h2 className={styles.formHeader}>Presets</h2>
            <div className="mb-4">
                <label htmlFor="presetSelector" className={styles.formLabel}>Wirkstoff Preset:</label>
                <select
                    id="presetSelector"
                    value={selectedPreset}
                    onChange={handlePresetChange}
                    className={styles.inputField}
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
                    <label htmlFor="halfLife" className={styles.formLabel}>Half-Life:</label>
                    <input
                        id="halfLife"
                        type="number"
                        value={selectedPresetData?.halfLife ?? ''}
                        className={styles.inputField}
                        disabled={selectedPreset !== 'custom'}
                    />
                </div>
                <div className="md:w-1/2">
                    <label htmlFor="tMax" className={styles.formLabel}>t_Max:</label>
                    <input
                        id="tMax"
                        type="number"
                        value={selectedPresetData?.tMax ?? ''}
                        className={styles.inputField}
                        disabled={selectedPreset !== 'custom'}
                    />
                </div>
            </div>
        </section>
    );
};

export default PresetSelector;