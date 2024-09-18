// src/hooks/useStartingTimeInput.ts

import moment from "moment";
import { useCallback, useEffect, useState } from "react";

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

  const handleStartingTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStartingTimeInput(value);

      const time = moment(value, "HH:mm");
      if (time.isValid()) {
        const totalMinutes = time.hours() * 60 + time.minutes();
        updateFormData({ startingTime: totalMinutes });
      }
    },
    [updateFormData]
  );


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
