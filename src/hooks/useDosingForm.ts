// ./src/hooks/useDosingForm.ts

import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import presets from "../config/presets";
import { calculateConcentration } from "../utils/calculateConcentration";
import { addDose, removeDose, updateDose } from "../utils/doseUtils";
import { decodeState, encodeState } from "../utils/urlStateUtils";
import { useFormState } from "./useFormState";
import { usePresetSelection } from "./usePresetSelection";

export const useDosingForm = () => {
  const router = useRouter();
  const [concentrationData, setConcentrationData] = useState<number[]>([]);
  const [initialStateLoaded, setInitialStateLoaded] = useState(false);
  const { formData, updateFormData } = useFormState({
    selectedPreset: presets[0]!.id,
    tMax: presets[0]!.tMax,
    halfLife: presets[0]!.halfLife,
    startingTime: 1,
    doses: [100],
    times: [0],
  });
  const [startingTimeInput, setStartingTimeInput] = useState<string>(() => {
    const initialStartingTime =
      formData.startingTime >= 0
        ? moment()
          .startOf("day")
          .add(formData.startingTime, "minutes")
          .format("HH:mm")
        : "";
    return initialStartingTime;
  });


  const {
    selectedPreset,
    handlePresetChange,
    getSelectedPreset,
    updateCustomPresetData,
  } = usePresetSelection(presets);

  const calculateConcentrationLocally = useCallback(() => {
    const { halfLife, tMax, doses, times, startingTime } = formData;
    const concentration = calculateConcentration(halfLife, tMax, doses, times);
    setConcentrationData(concentration);
  }, [formData]);

  // Update startingTimeInput when formData.startingTime changes
  useEffect(() => {
    if (formData.startingTime >= 0) {
      const formattedTime = moment()
        .startOf("day")
        .add(formData.startingTime, "minutes")
        .format("HH:mm");
      setStartingTimeInput(formattedTime);
    }
  }, [formData.startingTime]);

  // Update form data when selected preset changes
  useEffect(() => {
    const selectedPresetData = getSelectedPreset();
    if (selectedPresetData && initialStateLoaded) {
      updateFormData({
        tMax: selectedPresetData.tMax,
        halfLife: selectedPresetData.halfLife,
        selectedPreset: selectedPreset,
      });
      calculateConcentrationLocally();
    }
  }, [
    selectedPreset,
    getSelectedPreset,
    updateFormData,
    calculateConcentrationLocally,
    initialStateLoaded,
  ]);

  // Load initial state from URL query parameters
  useEffect(() => {
    if (router.isReady && !initialStateLoaded) {
      const { query } = router;
      if (query.state && typeof query.state === "string") {
        const decodedState = decodeState(query.state);
        updateFormData(decodedState);
        handlePresetChange(decodedState.selectedPreset);
        if (decodedState.selectedPreset === "custom") {
          updateCustomPresetData({
            halfLife: decodedState.halfLife,
            tMax: decodedState.tMax,
          });
        }
        calculateConcentrationLocally();
      }
      setInitialStateLoaded(true);
    }
  }, [
    router.isReady,
    router.query,
    updateFormData,
    handlePresetChange,
    updateCustomPresetData,
    calculateConcentrationLocally,
    initialStateLoaded,
  ]);

  // Update URL when form data changes
  useEffect(() => {
    if (initialStateLoaded) {
      const encodedState = encodeState(formData);
      router.push(`?state=${encodedState}`, undefined, { shallow: true });
    }
  }, [formData, router.push, initialStateLoaded]);

  const handlePresetChangeAndUpdate = useCallback(
    (presetId: string) => {
      handlePresetChange(presetId);
      const newPresetData = presets.find((preset) => preset.id === presetId);
      if (newPresetData) {
        updateFormData({
          tMax: newPresetData.tMax,
          halfLife: newPresetData.halfLife,
          selectedPreset: presetId,
        });
        calculateConcentrationLocally();
      }
    },
    [handlePresetChange, updateFormData, calculateConcentrationLocally, presets]
  );

  const handleDoseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const doseValue = parseFloat(value);
      if (isNaN(doseValue) || doseValue < 0) {
        return;
      }
      const indexMatch = /\d+/.exec(name);
      const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : -1;
      if (index >= 0) {
        updateFormData(
          updateDose(
            formData.doses,
            formData.times,
            index,
            doseValue,
            "dose"
          )
        );
      } else {
        console.error("Invalid index for dose change");
      }
    },
    [formData.doses, formData.times, updateFormData]
  );

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const indexMatch = /\d+/.exec(name);
      const index = indexMatch ? parseInt(indexMatch[0], 10) - 1 : -1;
      if (index >= 0) {
        updateFormData(
          updateDose(
            formData.doses,
            formData.times,
            index,
            parseFloat(value),
            "time"
          )
        );
      } else {
        console.error("Invalid index for time change");
      }
    },
    [formData.doses, formData.times, updateFormData]
  );

  const handleAddDose = useCallback(() => {
    updateFormData(addDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleRemoveDose = useCallback(() => {
    updateFormData(removeDose(formData.doses, formData.times));
  }, [formData.doses, formData.times, updateFormData]);

  const handleStartingTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Do not update formData.startingTime if input is invalid
    },
    [updateFormData]
  );


  const handleHalfLifeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHalfLife = parseFloat(e.target.value);
      if (selectedPreset !== "custom") {
        handlePresetChange("custom");
      }
      updateCustomPresetData({ halfLife: newHalfLife });
      updateFormData({ halfLife: newHalfLife });
    },
    [selectedPreset, handlePresetChange, updateCustomPresetData, updateFormData]
  );

  const handleTMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTMax = parseFloat(e.target.value);
      if (selectedPreset !== "custom") {
        handlePresetChange("custom");
      }
      updateCustomPresetData({ tMax: newTMax });
      updateFormData({ tMax: newTMax });
    },
    [selectedPreset, handlePresetChange, updateCustomPresetData, updateFormData]
  );

  return {
    // Data
    presets,
    selectedPreset,
    formData,
    concentrationData,
    startingTimeInput,

    // Input Handlers
    handleStartingTimeChange,
    handleDoseChange,
    handleTimeChange,
    handleAddDose,
    handleRemoveDose,
    handlePresetChange: handlePresetChangeAndUpdate,
    handleHalfLifeChange,
    handleTMaxChange,

    // Utilities
    getSelectedPreset,
    // updateFormData,
    calculateConcentrationLocally,
  };
};
