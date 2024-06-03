// ./src/components/StartingTimeField.tsx

import React from 'react';
import { TextField } from '@mui/material';
import theme from '../theme/theme';

interface StartingTimeFieldProps {
  onStartingTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartingTimeField: React.FC<StartingTimeFieldProps> = ({ onStartingTimeChange }) => (
  <div className="md:w-1/2">
    <TextField
      label="Beginn"
      type="time"
      name="starting_time_picker"
      onChange={onStartingTimeChange}
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
    />
  </div>
);

export default StartingTimeField;