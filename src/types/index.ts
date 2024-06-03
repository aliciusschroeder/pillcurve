// src/types/index.ts

export interface IntakePoint {
  time: number;
  dose: number;
}

export interface PresetOption {
  id: string;
  name: string;
  halfLife: number;
  tMax: number;
}

export interface FormData {
  tMax: number;
  halfLife: number;
  startingTime: number;
  doses: number[];
  times: number[];
}