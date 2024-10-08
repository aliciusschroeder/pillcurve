// src/components/PresetSelector.tsx

import { MenuItem, TextField } from "@mui/material";
import React from "react";
import theme from "../theme/theme";
import { PresetOption } from "../types";
import { FormHeader, FormSection } from "./styledComponents";

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

  return (
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
      <div className="mt-2 grid grid-cols-2 gap-2">
        <TextField
          label="Half-Life"
          type="number"
          value={selectedPresetData?.halfLife ?? ""}
          onChange={onHalfLifeChange}
          disabled={selectedPreset !== "custom"}
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
          value={selectedPresetData?.tMax ?? ""}
          onChange={onTMaxChange}
          disabled={selectedPreset !== "custom"}
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
  );
};

export default PresetSelector;
