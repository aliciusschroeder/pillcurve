// src/components/DoseInput.tsx

import React from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
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
          <section className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Dosierung</h2>
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
                          className: 'text-white bg-gray-700',
                          endAdornment: <span>mg</span>,
                        }}
                        InputLabelProps={{
                          className: 'text-gray-400',
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
                            className: 'text-white bg-gray-700',
                          }}
                          InputLabelProps={{
                            className: 'text-gray-400',
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
                            className: 'text-white bg-gray-700',
                            endAdornment: <span>min</span>,
                          }}
                          InputLabelProps={{
                            className: 'text-gray-400',
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6">
                <div>
                  <IconButton onClick={onAddDose} color="primary">
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={onRemoveDose} color="secondary">
                    <RemoveIcon />
                  </IconButton>
                </div>
                <Button variant="contained" color="primary" onClick={onCalculateClick}>
                  Berechnen
                </Button>
              </div>
            </form>
          </section>
        </ThemeProvider>
      );    
};

export default DoseInput;