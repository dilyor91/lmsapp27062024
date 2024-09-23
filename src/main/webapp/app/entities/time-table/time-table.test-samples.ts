import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 14983,
};

export const sampleWithPartialData: ITimeTable = {
  id: 15155,
  pairNumber: 28031,
  actialDate: dayjs('2024-09-22T13:58'),
};

export const sampleWithFullData: ITimeTable = {
  id: 5314,
  weekNumber: 27308,
  weekDayNumber: 31156,
  pairNumber: 13490,
  actialDate: dayjs('2024-09-22T16:11'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
