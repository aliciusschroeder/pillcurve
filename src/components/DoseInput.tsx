// src/components/DoseInput.tsx

import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { FormSection, FormHeader } from './styledComponents';
import theme from '../theme/theme';


interface DoseInputProps {
  doseCount: number;
  doses: number[];
  times: number[];
  onDoseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDose: () => void;
  onRemoveDose: () => void;
  onStartingTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculateClick: () => void;
}

const DoseInput: React.FC<DoseInputProps> = ({
  doseCount,
  doses,
  times,
  onDoseChange,
  onTimeChange,
  onAddDose,
  onRemoveDose,
  onStartingTimeChange,
  onCalculateClick,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormSection>
        <FormHeader>Dosierung</FormHeader>
        <form id="dosingForm" onSubmit={e => e.preventDefault()} className="space-y-4">
          <div id="doses" className="space-y-4">
            {Array.from({ length: doseCount }, (_, index) => (
              <div className="flex flex-col md:flex-row gap-4" key={index}>
                <div className="md:w-1/2">
                  <TextField
                    label={`Dosis ${index + 1}`}
                    type="number"
                    name={`dose${index + 1}`}
                    value={doses[index] || ''}
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
                {index === 0 ? (
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
                ) : (
                  <div className="md:w-1/2">
                    <TextField
                      label={`Zeit ${index + 1}`}
                      type="number"
                      name={`time${index + 1}`}
                      value={times[index] || ''}
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
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <div>
              <IconButton
                onClick={onAddDose}
                color="primary"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', marginRight: '8px' }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={onRemoveDose}
                color="secondary"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <RemoveIcon />
              </IconButton>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={onCalculateClick}
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                borderRadius: '8px',
                padding: '12px 24px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              Berechnen
            </Button>
          </div>
        </form>
      </FormSection>
    </ThemeProvider>
  );
};

export default DoseInput;