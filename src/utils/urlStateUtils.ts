import { FormData } from '../types';

interface UrlState extends FormData {
  selectedPreset: string;
}

export const encodeState = (state: UrlState): string => {
  return btoa(JSON.stringify(state));
};

export const decodeState = (encodedState: string): UrlState => {
  return JSON.parse(atob(encodedState));
};