// src/components/StartingTimeField.tsx

import { TextField } from "@mui/material";
import React from "react";
import theme from "../theme/theme";

interface StartingTimeFieldProps {
  startingTime: string;
  onStartingTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StartingTimeField: React.FC<StartingTimeFieldProps> = ({
  startingTime,
  onStartingTimeChange,
}) => (
  <div className="md:w-1/2">
    <TextField
      label="Beginn"
      type="time"
      name="starting_time_picker"
      value={startingTime}
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
