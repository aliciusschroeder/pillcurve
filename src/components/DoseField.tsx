// ./src/components/DoseField.tsx

import React from 'react';
import { TextField } from '@mui/material';
import theme from '../theme/theme';

interface DoseFieldProps {
  index: number;
  dose: number;
  onDoseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DoseField: React.FC<DoseFieldProps> = ({ index, dose, onDoseChange }) => (
  <div className="md:w-1/2">
    <TextField
      label={`Dosis ${index + 1}`}
      type="number"
      name={`dose${index + 1}`}
      value={dose || ''}
      onChange={onDoseChange}
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        style: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
        endAdornment: <span>mg</span>,
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.text.secondary,
        },
      }}
    />
  </div>
);

export default DoseField;