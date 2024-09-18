// src/hooks/useConcentrationData.ts

import { useCallback, useState } from "react";
import { FormData } from "../types";
import { calculateConcentration } from "../utils/calculateConcentration";

export const useConcentrationData = (formData: FormData) => {
  const [concentrationData, setConcentrationData] = useState<number[]>([]);

  const calculateConcentrationLocally = useCallback(() => {
    const { halfLife, tMax, doses, times } = formData;
    const concentration = calculateConcentration(halfLife, tMax, doses, times);
    setConcentrationData(concentration);
  }, [formData]);

  return { concentrationData, calculateConcentrationLocally };
};
