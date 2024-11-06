import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 16213,
};

export const sampleWithPartialData: ITimeTable = {
  id: 12590,
  weekNumber: 11342,
  pairNumber: 11401,
};

export const sampleWithFullData: ITimeTable = {
  id: 1309,
  weekNumber: 1941,
  weekDayNumber: 22284,
  pairNumber: 26223,
  actialDate: dayjs('2024-09-22T19:16'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
