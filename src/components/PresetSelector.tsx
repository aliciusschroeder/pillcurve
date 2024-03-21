// src/components/PresetSelector.tsx

import React from 'react';
import { PresetOption } from '../types';
import { TextField, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormSection, FormHeader } from './styledComponents';
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
      <FormSection>
        <FormHeader>Presets</FormHeader>
        <div className="mb-4">
          <TextField
            select
            label="Wirkstoff Preset"
            value={selectedPreset}
            onChange={(e) => onSelectedPresetChange(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            InputProps={{
              style: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          >
            {presets.map((preset) => (
              <MenuItem key={preset.id} value={preset.id}>
                {preset.name}
              </MenuItem>
            ))}
            <MenuItem value="custom">Custom</MenuItem>
          </TextField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing(2), marginTop: theme.spacing(2) }}>
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
              style: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
              endAdornment: <span>h</span>,
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          />
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
              style: {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
              endAdornment: <span>h</span>,
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          />
        </div>
      </FormSection>
    </ThemeProvider>
  );
};



export default PresetSelector;