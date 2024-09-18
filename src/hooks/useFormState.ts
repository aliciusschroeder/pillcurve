// src/hooks/useFormState.ts
import { useState } from "react";
import { FormData } from "../types";

// This hook manages the form state and provides a way to update the form data using the updateFormData function

export const useFormState = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prevState) => ({ ...prevState, ...updates }));
  };

  return { formData, updateFormData };
};
