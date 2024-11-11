import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 20317,
};

export const sampleWithPartialData: ITimeTable = {
  id: 12648,
  weekNumber: 11366,
  actialDate: dayjs('2024-09-22T09:23'),
};

export const sampleWithFullData: ITimeTable = {
  id: 9813,
  weekNumber: 23466,
  weekDayNumber: 18641,
  pairNumber: 29029,
  actialDate: dayjs('2024-09-22T21:27'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
