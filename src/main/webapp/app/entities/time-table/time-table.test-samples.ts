import dayjs from 'dayjs/esm';

import { ITimeTable, NewTimeTable } from './time-table.model';

export const sampleWithRequiredData: ITimeTable = {
  id: 27433,
};

export const sampleWithPartialData: ITimeTable = {
  id: 27506,
  weekDayNumber: 18389,
};

export const sampleWithFullData: ITimeTable = {
  id: 18540,
  weekNumber: 16190,
  weekDayNumber: 4354,
  pairNumber: 30107,
  actialDate: dayjs('2024-09-22T08:07'),
};

export const sampleWithNewData: NewTimeTable = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
