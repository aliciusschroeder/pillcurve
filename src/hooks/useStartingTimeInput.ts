// src/hooks/useStartingTimeInput.ts

import moment from "moment";
import { useEffect, useState } from "react";

export const useStartingTimeInput = (
  startingTime: number,
  updateFormData: (updates: Partial<{ startingTime: number }>) => void
) => {
  const [startingTimeInput, setStartingTimeInput] = useState<string>(() => {
    const initialStartingTime =
      startingTime >= 0
        ? moment()
            .startOf("day")
            .add(startingTime, "minutes")
            .format("HH:mm")
        : "";
    return initialStartingTime;
  });

  const handleStartingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartingTimeInput(value);

    const [hoursStr, minutesStr] = value.split(":");
    const hours = parseInt(hoursStr ?? "", 10);
    const minutes = parseInt(minutesStr ?? "", 10);
    if (
      !isNaN(hours) &&
      !isNaN(minutes) &&
      hours >= 0 &&
      hours < 24 &&
      minutes >= 0 &&
      minutes < 60
    ) {
      const totalMinutes = hours * 60 + minutes;
      updateFormData({ startingTime: totalMinutes });
    }
  };

  // Aktualisiere die Eingabe, wenn sich die Startzeit ändert
  useEffect(() => {
    if (startingTime >= 0) {
      const formattedTime = moment()
        .startOf("day")
        .add(startingTime, "minutes")
        .format("HH:mm");
      setStartingTimeInput(formattedTime);
    }
  }, [startingTime]);

  return { startingTimeInput, handleStartingTimeChange };
};
