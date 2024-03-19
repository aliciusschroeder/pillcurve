// src/utils/api.ts
import { FormData } from '../types';

export const calculateConcentration = async (formData: FormData) => {
  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.concentration;
  } catch (error) {
    console.error('There was an error submitting the form:', error);
    throw error;
  }
};