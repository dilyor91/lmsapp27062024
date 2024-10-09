import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 43,
};

export const sampleWithPartialData: ITimeTable = {
  id: 8882,
  weekDayNumber: 3532,
};

export const sampleWithFullData: ITimeTable = {
  id: 10688,
  weekNumber: 12384,
  weekDayNumber: 27936,
  pairNumber: 24344,
  actialDate: dayjs('2024-09-23T05:05'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
