// src/components/PresetSelector.tsx

import React from 'react';
import { PresetOption } from '../types';
import { TextField, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import styles from './Common.module.css';
import theme from '../theme/theme';


interface PresetSelectorProps {
    presets: PresetOption[];
    selectedPreset: string;
    onSelectedPresetChange: (presetId: string) => void;
    onHalfLifeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getSelectedPreset: () => PresetOption | undefined;
}

const PresetSelector: React.FC<PresetSelectorProps> = ({
    presets,
    selectedPreset,
    onSelectedPresetChange,
    onHalfLifeChange,
    onTMaxChange,
    getSelectedPreset,
}) => {
    const selectedPresetData = getSelectedPreset();

    const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectedPresetChange(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
          <section className={styles.formSection}>
            <h2 className={styles.formHeader}>Presets</h2>
            <div className="mb-4">
              <TextField
                select
                label="Wirkstoff Preset"
                value={selectedPreset}
                onChange={(e) => onSelectedPresetChange(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              >
                {presets.map((preset) => (
                  <MenuItem key={preset.id} value={preset.id}>
                    {preset.name}
                  </MenuItem>
                ))}
                <MenuItem value="custom">Custom</MenuItem>
              </TextField>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextField
                  label="Half-Life"
                  type="number"
                  value={selectedPresetData?.halfLife ?? ''}
                  onChange={onHalfLifeChange}
                  disabled={selectedPreset !== 'custom'}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <span>h</span>,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="t_Max"
                  type="number"
                  value={selectedPresetData?.tMax ?? ''}
                  onChange={onTMaxChange}
                  disabled={selectedPreset !== 'custom'}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: <span>h</span>
                        }}
                />
              </div>
            </div>
          </section>
        </ThemeProvider>
      );
    };
    


export default PresetSelector;