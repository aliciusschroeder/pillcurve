// src/hooks/useUrlState.ts

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormData } from "../types";
import { decodeState, encodeState } from "../utils/urlStateUtils";

export const useUrlState = (
  formData: FormData,
  updateFormData: (updates: Partial<FormData>) => void,
  handlePresetChange: (presetId: string) => void,
  updateCustomPresetData: (updates: Partial<FormData>) => void,
  calculateConcentration: () => void
) => {
  const router = useRouter();
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);

  // Initialen Zustand aus der URL laden
  useEffect(() => {
    if (router.isReady && !initialStateLoaded) {
      if (router.query.state && typeof router.query.state === "string") {
        const decodedState = decodeState(router.query.state);
        updateFormData(decodedState);
        handlePresetChange(decodedState.selectedPreset);
        if (decodedState.selectedPreset === "custom") {
          updateCustomPresetData({
            halfLife: decodedState.halfLife,
            tMax: decodedState.tMax,
          });
        }
        calculateConcentration();
      }
      setInitialStateLoaded(true);
    }
  }, [
    router.isReady,
    router.query,
    router.query.state,
    updateFormData,
    handlePresetChange,
    updateCustomPresetData,
    calculateConcentration,
    initialStateLoaded,
  ]);

  // URL aktualisieren, wenn sich das Formular ändert
  useEffect(() => {
    if (initialStateLoaded) {
      const encodedState = encodeState(formData);
      router.push(`?state=${encodedState}`, undefined, { shallow: true });
    }
  }, [formData, router, initialStateLoaded]);

  return { initialStateLoaded };
};
