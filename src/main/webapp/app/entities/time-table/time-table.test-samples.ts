import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 10861,
};

export const sampleWithPartialData: ITimeTable = {
  id: 29910,
  weekNumber: 15900,
};

export const sampleWithFullData: ITimeTable = {
  id: 2898,
  weekNumber: 32386,
  weekDayNumber: 13318,
  pairNumber: 15837,
  actialDate: dayjs('2024-09-22T18:16'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
