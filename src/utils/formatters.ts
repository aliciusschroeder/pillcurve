// ./utils/formatters.ts

import moment from "moment";
import { IntakePoint } from "../types";

export const formatXAxis = (
  tickItem: number,
  startingTime: number
): string => {
  const time = moment()
    .startOf("day")
    .add(startingTime + tickItem, "minutes");
  return time.format("HH:mm");
};

export const formatIntakeLabel = (
  intakePoint: IntakePoint,
  startingTime: number
): string => {
  const { time, dose } = intakePoint;
  if (dose === 0) {
    return "";
  }
  return `${dose} mg at ${moment()
    .startOf("day")
    .add(startingTime + time, "minutes")
    .format("HH:mm")}`;
};
