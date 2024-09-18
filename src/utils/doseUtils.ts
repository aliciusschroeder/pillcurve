// src/utils/doseUtils.ts

export const addDose = (doses: number[], times: number[]) => {
  return {
    doses: [...doses, 0],
    times: [...times, 0],
  };
};

export const removeDose = (doses: number[], times: number[]) => {
  if (doses.length > 1) {
    return {
      doses: doses.slice(0, -1),
      times: times.slice(0, -1),
    };
  }
  return { doses, times };
};

export const updateDose = (
  doses: number[],
  times: number[],
  index: number,
  value: number,
  field: "dose" | "time"
) => {
  const updatedArray = field === "dose" ? [...doses] : [...times];
  updatedArray[index] = value;
  return field === "dose" ? { doses: updatedArray } : { times: updatedArray };
};
