// src/components/DoseInput.tsx

import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../theme/theme";
import DoseField from "./DoseField";
import StartingTimeField from "./StartingTimeField";
import { FormHeader, FormSection } from "./styledComponents";
import TimeField from "./TimeField";

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
        <form
          id="dosingForm"
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
        >
          <div id="doses" className="space-y-4">
            {Array.from({ length: doseCount }, (_, index) => (
              <div className="flex flex-col gap-4 md:flex-row" key={index}>
                <DoseField
                  index={index}
                  dose={doses[index] ?? 0}
                  onDoseChange={onDoseChange}
                />
                {index === 0 ? (
                  <StartingTimeField
                    onStartingTimeChange={onStartingTimeChange}
                  />
                ) : (
                  <TimeField
                    index={index}
                    time={times[index]}
                    onTimeChange={onTimeChange}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div>
              <IconButton
                onClick={onAddDose}
                color="primary"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  marginRight: "8px",
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={onRemoveDose}
                color="secondary"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "12px 24px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
