// ./utils/formatters.ts
import moment from 'moment';
import { IntakePoint } from '../types';

export const formatXAxis = (tickItem: number, startingTime: number): string => {
  const time = moment().startOf('day').add(startingTime, 'minutes').add(tickItem, 'minutes');
  const roundedMinutes = Math.round(time.minutes() / 30) * 30;
  const roundedTime = time.clone().minute(roundedMinutes);
  return startingTime === 0 ? roundedTime.format('H:mm') : roundedTime.format('HH:mm');
};

export const formatIntakeLabel = (intakePoint: IntakePoint, startingTime: number): string => {
  const { time, dose } = intakePoint;
  if (dose === 0) {
    return '';
  }
  return startingTime === 1 || startingTime === -1
    ? `${dose} mg after ${time} min`
    : `${dose} mg at ${moment().startOf('day').add(startingTime, 'minutes').add(time, 'minutes').format('HH:mm')}`;
};