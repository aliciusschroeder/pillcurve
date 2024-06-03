// ./src/components/TimeField.tsx

import React from 'react';
import { TextField } from '@mui/material';
import theme from '../theme/theme';

interface TimeFieldProps {
  index: number;
  time: number;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeField: React.FC<TimeFieldProps> = ({ index, time, onTimeChange }) => (
  <div className="md:w-1/2">
    <TextField
      label={`Zeit ${index + 1}`}
      type="number"
      name={`time${index + 1}`}
      value={time || ''}
      onChange={onTimeChange}
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        style: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        },
        endAdornment: <span>min</span>,
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.text.secondary,
        },
      }}
    />
  </div>
);

export default TimeField;